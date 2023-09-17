import { Inject, Injectable } from '@nestjs/common'
import { CoinCapHttpConfig } from '../interfaces/coincap-config.interface'
import coinCapHttpConfig from './coincap-http.config'
import { CoinCapChain } from '../enums/coincap-chain.enum'

@Injectable()
export class CoinCapRequestOptionsFactory {
  constructor(@Inject(coinCapHttpConfig.KEY) private config: CoinCapHttpConfig) {}

  buildUrl(path: CoinCapChain): string {
    const { baseUrl } = this.config

    return `${baseUrl}/${path}`
  }
}
