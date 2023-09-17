import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { CoinCapRequestOptionsFactory } from '../http/coincap-request-options.factory'
import { CoinCapChain } from '../enums/coincap-chain.enum'
import { CoinCapChainResponse } from '../responses/coincap-chain.response'

@Injectable()
export class CoinCapService {
  constructor(
    private readonly httpService: HttpService,
    private readonly coinCapRequestOptionsFactory: CoinCapRequestOptionsFactory,
  ) {}

  /**
   * Fetch specific chain data from CoinCap API
   */
  async getChainData(chain: CoinCapChain): Promise<CoinCapChainResponse> {
    const path = this.coinCapRequestOptionsFactory.buildUrl(chain)

    try {
      const response = await firstValueFrom(this.httpService.get<CoinCapChainResponse>(path))

      return response.data
    } catch (e) {
      Logger.error(`There has been an error in interaction with CoinCap API. Error details: ${e.message}`)

      throw e
    }
  }
}
