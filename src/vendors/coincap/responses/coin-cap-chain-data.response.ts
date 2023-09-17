import { ApiProperty } from '@nestjs/swagger'

export class CoinCapChainDataResponse {
  @ApiProperty({ example: 'bitcoin', description: 'Chain identifier' })
    id: string

  @ApiProperty({ example: '1', description: 'Chain rank' })
    rank: string

  @ApiProperty({ example: 'BTC', description: 'Chain symbol' })
    symbol: string

  @ApiProperty({ example: 'Bitcoin', description: 'Chain/asset name' })
    name: string

  @ApiProperty({ example: '17193925.0000000000000000', description: 'Available supply for trading' })
    supply: string

  @ApiProperty({ example: '21000000.0000000000000000', description: 'Total quantity of asset issued' })
    maxSupply: string

  @ApiProperty({ example: '119179791817.6740161068269075', description: 'Supply x price' })
    marketCapUsd: string

  @ApiProperty({ example: '2928356777.6066665425687196', description: 'Quantity of trading volume represented in USD over the last 24 hours' })
    volumeUsd24Hr: string

  @ApiProperty({ example: '6931.5058555666618359', description: 'Volume-weighted price based on real-time market data, translated to USD' })
    priceUsd: string

  @ApiProperty({ example: '-0.8101417214350335', description: 'The direction and value change in the last 24 hours' })
    changePercent24Hr: string

  @ApiProperty({ example: '7175.0663247679233209', description: 'Volume Weighted Average Price in the last 24 hours' })
    vwap24Hr: string
}
