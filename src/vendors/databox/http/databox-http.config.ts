import { ConfigService, registerAs } from '@nestjs/config'
import { DataboxHttpConfig } from '../interfaces/databox-config.interface'

const configService = new ConfigService()

export default registerAs<DataboxHttpConfig>('DataboxHttpConfig', () => ({
  baseUrl: configService.get('DATABOX_BASE_URL', ''),
  userAgent: configService.get('DATABOX_USER_AGENT', ''),
  pushToken: configService.get('SECRET_DATABOX_PUSH_TOKEN', ''),
}))
