import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { CoinCapRequestOptionsFactory } from '../http/coincap-request-options.factory'
import { CoinCapChain } from '../enums/coincap-chain.enum'
import { CoinCapChainResponse } from '../responses/coincap-chain.response'
import { ServiceProvider } from '../../../../shared/enums/service-provider.enum'
import { DataSourceService } from '../../data-source.service.interface'
import { GetMetrics } from '../../../../shared/interfaces/get-metrics.interface'
import { Metric } from '../../../../shared/interfaces/metric.interface'

@Injectable()
export class CoinCapService implements DataSourceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly coinCapRequestOptionsFactory: CoinCapRequestOptionsFactory,
  ) {}

  serviceProvider = ServiceProvider.COINCAP

  /**
   * Return a mapped metrics response, including metrics array and service provider
   */
  async getMetrics(): Promise<GetMetrics> {
    const metricsResponse: GetMetrics = {
      serviceProvider: this.serviceProvider,
      metrics: [],
    }

    const chains = Object.values(CoinCapChain)

    // To get data for all relevant chains, we have to call the CoinCap integration service a couple of times
    const chainData = await Promise.all(chains.map((chain) => this.getChainData(chain)))

    // When data is successfully fetched, we have to map it to Databox format by creating key-value pairs
    chainData.forEach((chainItem) => {
      const { symbol, priceUsd, supply } = chainItem.data

      const values: Metric[] = [
        { key: `${symbol}_price_usd`, value: parseFloat(parseFloat(priceUsd).toFixed(2)) },
        { key: `${symbol}_supply`, value: parseFloat(parseFloat(supply).toFixed(2)) },
      ]

      // The key-value pairs are then pushed into metrics array, which is returned to the client
      metricsResponse.metrics.push(...values)
    })

    return metricsResponse
  }

  /**
   * Fetch specific/requested chain data from CoinCap API
   */
  async getChainData(chain: CoinCapChain): Promise<CoinCapChainResponse> {
    const path = this.coinCapRequestOptionsFactory.buildUrl(chain)

    try {
      const response = await firstValueFrom(this.httpService.get<CoinCapChainResponse>(path))

      return response.data
    } catch (e) {
      Logger.error(`An error occurred in interaction with CoinCap API. Error details: ${e.message}`)

      throw e
    }
  }
}
