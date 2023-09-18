import { ApiProperty } from '@nestjs/swagger'
import { CoinCapChainDataResponse } from './coin-cap-chain-data.response'

export class CoinCapChainResponse {
  @ApiProperty({
    example: {
      id: 'bitcoin',
      rank: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      supply: '17193925.0000000000000000',
      maxSupply: '21000000.0000000000000000',
      marketCapUsd: '119179791817.6740161068269075',
      volumeUsd24Hr: '2928356777.6066665425687196',
      priceUsd: '6931.5058555666618359',
      changePercent24Hr: '-0.8101417214350335',
      vwap24Hr: '7175.0663247679233209',
    },
    description: 'CoinCap response data',
  })
    data: CoinCapChainDataResponse
}
