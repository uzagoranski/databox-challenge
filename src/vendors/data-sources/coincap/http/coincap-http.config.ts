import { ConfigService, registerAs } from '@nestjs/config'
import { CoinCapHttpConfig } from '../interfaces/coincap-config.interface'

const configService = new ConfigService()

export default registerAs<CoinCapHttpConfig>('CoinCapHttpConfig', () => ({
  baseUrl: configService.get('COINCAP_BASE_URL', ''),
}))
