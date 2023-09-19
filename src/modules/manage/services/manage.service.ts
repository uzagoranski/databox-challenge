import { Inject, Injectable, Logger } from '@nestjs/common'
import { firstValueFrom, map } from 'rxjs'
import { setTimeout } from 'timers/promises'
import { ConfigService } from '@nestjs/config'
import { RequestDataEntity } from '../../../libs/db/entities/request-data.entity'
import { DbWritingService } from '../../../libs/db/services/db-writing.service'
import { DbListingService } from '../../../libs/db/services/db-listing.service'
import { ListingFiltering } from '../../../libs/db/interfaces/listing-filtering.interface'
import { ListingParamsDto } from '../dtos/listing-params.dto'
import { Metric } from '../../../shared/interfaces/metric.interface'
import { BatchingHelper } from '../../../shared/utils/helpers/batching.helper'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { DataboxService } from '../../../vendors/databox/services/databox.service'
import { ManageRequestDataMapper } from '../mappers/manage-request-data.mapper'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'
import { ListManageRequestDataResponse } from '../responses/list-manage-request-data.response'
import { DATA_SOURCE_SERVICE, DataSourceService } from '../../../vendors/data-sources/data-source.service.interface'

@Injectable()
export class ManageService {
  constructor(
    private readonly configService: ConfigService,
    private readonly dbWritingService: DbWritingService,
    private readonly dbListingService: DbListingService,
    private readonly databoxService: DataboxService,
    @Inject(DATA_SOURCE_SERVICE) private readonly dataSourceServices: DataSourceService[],
  ) {}

  /**
   * Return list of metrics from database based on listing (filtering) parameters
   */
  async getMetrics(params: ListingParamsDto): Promise<ListManageRequestDataResponse> {
    const filtering = this.processFilteringParams(params)
    const page = params.page && params.page > 0 ? params.page - 1 : 0

    return firstValueFrom(this.dbListingService.getListedRequestData(filtering, params.limit, page).pipe(
      map((result) => ({
        ...result,
        items: result.items.map((requestData) => ManageRequestDataMapper.mapRequestDataDbToManageRequestDataResponse(requestData)),
        filtering: ManageRequestDataMapper.mapFilteringToManageRequestDataFilteringResponse(filtering),
      })),
    ))
  }

  /**
   * Loops through all registered providers/vendors, fetches metrics and pushes them via Databox Push API
   */
  async fetchAndStoreMetricsForAllVendors(): Promise<ManageRequestDataResponse[]> {
    // We'll set up a batching interval to avoid throttling on Databox Push API side
    const batchingInterval = this.configService.get<number>('DATABOX_PUSH_INTERVAL', 5000)
    const numberOfItemsPerBatch = this.configService.get<number>('DATABOX_ITEMS_PER_BATCH', 2)

    // Then, we'll group data sources (services) into batches of 2 services per batch
    const dataSourceBatches = BatchingHelper.getBatches(this.dataSourceServices, numberOfItemsPerBatch)

    const batchedResponses = await Promise.all(dataSourceBatches.map(async (dataSourceBatch) => {
      const responses = await Promise.all(dataSourceBatch.map(async (vendorService) => {
        // If one of the calls fails, we don't want to break entire execution but rather log the error
        try {
          const vendorMetricsResponse = await vendorService.getMetrics()

          // We want to push metrics to Databox Push API and store the response with an indicator of the service provider that was the source of the metrics
          return this.pushMultipleMetrics(vendorMetricsResponse.metrics, vendorMetricsResponse.serviceProvider)
        } catch (e) {
          Logger.error(e)
        }
      }))

      // This is where we'll wait a couple of seconds for Databox API to take a breather
      await setTimeout(batchingInterval)

      // If any of the calls would fail, we'd return null to the clients and that's not something we want, hence we'll filter out falsy values
      return responses.filter((data) => data)
    }))

    // Since we split services into batches, we ended up with a 2D array, meaning we have to flat map it back to 1D array to return data in the expected format
    return batchedResponses.flatMap((item) => item)
  }

  /**
   * Pushes multiple metrics to Databox API & creates a new row in DB based on the request status
   */
  private async pushMultipleMetrics(metrics: Metric[], serviceProvider: ServiceProvider): Promise<ManageRequestDataResponse> {
    // First, we create the partial request data object
    const requestData: Partial<RequestDataEntity> = {
      serviceProvider,
      metricsSent: metrics,
      numberOfKPIsSent: metrics.length,
      successfulRequest: true,
    }

    try {
      // Then, we'll call Databox integration service to push the aforementioned data via Push API
      await this.databoxService.pushMultipleMetrics(metrics)

      // If request is successful, we'll store the data into our database
      return ManageRequestDataMapper.mapRequestDataDbToManageRequestDataResponse(await this.dbWritingService.saveRequestData(requestData))
    } catch (e) {
      // Otherwise, we'll enhance the request data object with error details and mark it as unsuccessful
      requestData.successfulRequest = false
      requestData.errorMessage = e.message

      // And push the enhanced data into our database
      return ManageRequestDataMapper.mapRequestDataDbToManageRequestDataResponse(await this.dbWritingService.saveRequestData(requestData))
    }
  }

  /**
   * Process filtering parameters, requested from metric listing endpoint
   */
  private processFilteringParams(params: ListingParamsDto): ListingFiltering {
    const { id, serviceProvider, numberOfKPIsSent, successfulRequest } = params

    return {
      id,
      serviceProvider,
      numberOfKPIsSent,
      successfulRequest,
    }
  }
}
