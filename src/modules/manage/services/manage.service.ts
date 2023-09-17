import { Injectable } from '@nestjs/common'
import { DataboxService } from '../../../vendors/databox/services/databox.service'
import { DbWritingService } from '../../../libs/db/services/db-writing.service'
import { Metric } from '../../../shared/interfaces/metric.interface'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { RequestDataDB } from '../../../libs/db/entities/request-data-db.entity'
import { CoinCapChain } from '../../../vendors/coincap/enums/coincap-chain.enum'
import { CoinCapService } from '../../../vendors/coincap/services/coincap.service'
import { ManageRequestDataMapper } from '../mappers/manage-request-data.mapper'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'

@Injectable()
export class ManageService {
  constructor(
    private readonly databoxService: DataboxService,
    private readonly coinCapService: CoinCapService,
    private readonly dbWritingService: DbWritingService,
  ) {}

  /**
   * Pushes multiple metrics to Databox API & creates a new row in DB based on the request status
   */
  async pushMultipleMetrics(metrics: Metric[], serviceProvider: ServiceProvider): Promise<ManageRequestDataResponse> {
    const requestData: Partial<RequestDataDB> = {
      serviceProvider,
      timeOfSending: new Date().toISOString(),
      metricsSent: metrics,
      numberOfKPIsSent: metrics.length,
      successfulRequest: true,
    }

    try {
      await this.databoxService.pushMultipleMetrics(metrics)

      return ManageRequestDataMapper.mapRequestDataDbToManageRequestDataResponse(await this.dbWritingService.saveRequestData(requestData))
    } catch (e) {
      requestData.successfulRequest = false
      requestData.errorMessage = e.message

      return ManageRequestDataMapper.mapRequestDataDbToManageRequestDataResponse(await this.dbWritingService.saveRequestData(requestData))
    }
  }

  /**
   * Fetches data from CoinCap API and maps it to internal metrics
   */
  async fetchChainDataMetrics(chains: CoinCapChain[]): Promise<Metric[]> {
    const metrics: Metric[] = []

    const chainData = await Promise.all(chains.map((chain) => this.coinCapService.getChainData(chain)))

    chainData.forEach((chainItem) => {
      const { symbol, priceUsd, supply } = chainItem.data

      const values = [
        { key: `${symbol}_price_usd`, value: parseFloat(parseFloat(priceUsd).toFixed(2)) },
        { key: `${symbol}_supply`, value: parseFloat(parseFloat(supply).toFixed(2)) },
      ]

      metrics.push(...values)
    })

    return metrics
  }

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
