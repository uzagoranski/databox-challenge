import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { firstValueFrom, map } from 'rxjs'
import { RequestDataEntity } from '../../../libs/db/entities/request-data.entity'
import { DbWritingService } from '../../../libs/db/services/db-writing.service'
import { DbListingService } from '../../../libs/db/services/db-listing.service'
import { ListingFiltering } from '../../../libs/db/interfaces/listing-filtering.interface'
import { ListingParamsDto } from '../dtos/listing-params.dto'
import { Metric } from '../../../shared/interfaces/metric.interface'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { DataboxService } from '../../../vendors/databox/services/databox.service'
import { GitHubService } from '../../../vendors/github/services/github.service'
import { CoinCapService } from '../../../vendors/coincap/services/coincap.service'
import { CoinCapChain } from '../../../vendors/coincap/enums/coincap-chain.enum'
import { ManageRequestDataMapper } from '../mappers/manage-request-data.mapper'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'
import { ListManageRequestDataResponse } from '../responses/list-manage-request-data.response'

@Injectable()
export class ManageService {
  constructor(
    private readonly dbWritingService: DbWritingService,
    private readonly databoxService: DataboxService,
    private readonly gitHubService: GitHubService,
    private readonly coinCapService: CoinCapService,
    private readonly dbListingService: DbListingService,
  ) {}

  /**
   * Return list of metrics from database based on listing (filtering) parameters
   */
  getMetrics(params: ListingParamsDto): Promise<ListManageRequestDataResponse> {
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
   * Pushes multiple metrics to Databox API & creates a new row in DB based on the request status
   */
  async pushMultipleMetrics(metrics: Metric[], serviceProvider: ServiceProvider): Promise<ManageRequestDataResponse> {
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
   * Fetches data from CoinCap API, aggregates and maps it to internal metrics
   */
  async fetchChainDataMetrics(chains: CoinCapChain[]): Promise<Metric[]> {
    const metrics: Metric[] = []

    // To get data for all relevant chains, we have to call the CoinCap integration service a couple of times
    const chainData = await Promise.all(chains.map((chain) => this.coinCapService.getChainData(chain)))

    // When data is successfully fetched, we have to map it to Databox format by creating key-value pairs
    chainData.forEach((chainItem) => {
      const { symbol, priceUsd, supply } = chainItem.data

      const values: Metric[] = [
        { key: `${symbol}_price_usd`, value: parseFloat(parseFloat(priceUsd).toFixed(2)) },
        { key: `${symbol}_supply`, value: parseFloat(parseFloat(supply).toFixed(2)) },
      ]

      // The key-value pairs are then pushed into metrics array, which is returned to the client
      metrics.push(...values)
    })

    return metrics
  }

  /**
   * Fetches data from GitHub API and maps it to internal metrics if OAuth2 authentication flow has been successfully completed
   */
  async fetchGitHubMetrics(response: Response, code?: string): Promise<Metric[]> {
    const metrics: Metric[] = []

    // To get data for all relevant metrics, we have to call the GitHub integration service two times
    const [ commitsSinceYesterday, openPullRequests ] = await Promise.all([
      await this.gitHubService.getCommits(response, code),
      await this.gitHubService.getPullRequests(response, code),
    ])

    // When data is successfully fetched, we have to map it to Databox format by creating key-value pairs
    const values: Metric[] = [
      { key: 'GitHub_commits_since_yesterday', value: commitsSinceYesterday.length },
      { key: 'GitHub_open_pull_requests', value: openPullRequests.length },
    ]

    // The key-value pairs are then pushed into metrics array, which is returned to the client
    metrics.push(...values)

    return metrics
  }

  /**
     * Process filtering parameters, requested from metric listing endpoint
     */
  private processFilteringParams(params: ListingParamsDto): ListingFiltering {
    const { id, serviceProvider, timeOfSending, numberOfKPIsSent, successfulRequest } = params

    return {
      id,
      serviceProvider,
      timeOfSending,
      numberOfKPIsSent,
      successfulRequest,
    }
  }
}
