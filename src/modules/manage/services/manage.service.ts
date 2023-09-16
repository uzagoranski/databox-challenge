import { Injectable } from '@nestjs/common'
import { DataboxService } from '../../../vendors/databox/services/databox.service'
import { DbListingService } from '../../../libs/db/services/db-listing.service'
import { DbFetchingService } from '../../../libs/db/services/db-fetching.service'
import { DbWritingService } from '../../../libs/db/services/db-writing.service'
import { Metric } from '../../../shared/interfaces/metric.interface'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { RequestDataDB } from '../../../libs/db/entities/request-data-db.entity'

@Injectable()
export class ManageService {
  constructor(
    private readonly databoxService: DataboxService,
    private readonly dbListingService: DbListingService,
    private readonly dbFetchingService: DbFetchingService,
    private readonly dbWritingService: DbWritingService,
  ) {}

  /**
   * Pushes metrics to Databox API & creates a new row in DB
   */
  async pushMany(metrics: Metric[], serviceProvider: ServiceProvider): Promise<RequestDataDB> {
    const requestData: Partial<RequestDataDB> = {
      serviceProvider,
      timeOfSending: new Date().toISOString(),
      metricsSent: metrics,
      numberOfKPIsSent: metrics.length,
      successfulRequest: true,
    }

    try {
      await this.databoxService.pushMultipleMetrics(metrics)

      return this.dbWritingService.saveRequestData(requestData)
    } catch (e) {
      requestData.successfulRequest = false
      requestData.errorMessage = e.message

      return this.dbWritingService.saveRequestData(requestData)
    }
  }

  // /**
  //    * Pushes metrics to Databox API & creates a new row in DB
  //    */
  // async getLastPush(): Promise<void> {
  //   const test = await this.databoxService.getLastPush()
  //
  //   // eslint-disable-next-line no-console
  //   console.log(test)
  // }

  // /**
  //  * Return list of tokens from database based on listing (sorting, filtering) parameters
  //  */
  // getMetrics(params: ListingParamsDto): Observable<ListManageTokenResponse> {
  //   const sorting = this.processSortingParam(params.sorting)
  //   const filtering = this.processFilteringParams(params)
  //   const page = params.page && params.page > 0 ? params.page - 1 : 0
  //
  //   return this.dbListingService.getListedTokens(sorting, filtering, params.limit, page).pipe(
  //     map((result) => ({
  //       ...result,
  //       items: result.items.map((token) => ManageTokenMapper.mapTokenDbToManageTokenResponse(token)),
  //       sorting: ManageTokenMapper.mapSortingToManageTokenSortingResponse(params.sorting),
  //       filtering: ManageTokenMapper.mapFilteringToManageTokenFilteringResponse(filtering),
  //     })),
  //   )
  // }
}
