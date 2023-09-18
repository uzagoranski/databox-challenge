import { Inject, Injectable } from '@nestjs/common'
import { firstValueFrom, map } from 'rxjs'
import { RequestDataEntity } from '../../../libs/db/entities/request-data.entity'
import { DbWritingService } from '../../../libs/db/services/db-writing.service'
import { DbListingService } from '../../../libs/db/services/db-listing.service'
import { ListingFiltering } from '../../../libs/db/interfaces/listing-filtering.interface'
import { ListingParamsDto } from '../dtos/listing-params.dto'
import { Metric } from '../../../shared/interfaces/metric.interface'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { DataboxService } from '../../../vendors/databox/services/databox.service'
import { ManageRequestDataMapper } from '../mappers/manage-request-data.mapper'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'
import { ListManageRequestDataResponse } from '../responses/list-manage-request-data.response'
import { DATA_SOURCE_SERVICE, DataSourceService } from '../../../vendors/data-sources/data-source.service.interface'

@Injectable()
export class ManageService {
  constructor(
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
    return Promise.all(this.dataSourceServices.map(async (vendorService) => {
      const vendorMetricsResponse = await vendorService.getMetrics()

      return this.pushMultipleMetrics(vendorMetricsResponse.metrics, vendorMetricsResponse.serviceProvider)
    }))
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
