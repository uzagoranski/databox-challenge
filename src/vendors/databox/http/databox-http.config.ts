import { ConfigService, registerAs } from '@nestjs/config'
import { DataboxHttpConfig } from '@vendors/databox/interfaces/databox-config.interface'

const configService = new ConfigService()

export default registerAs<DataboxHttpConfig>('DataboxHttpConfig', () => ({
  baseUrl: configService.get('DATABOX_BASE_URL', ''),
  pushToken: configService.get('DATABOX_PUSH_TOKEN', ''),
  userAgent: configService.get('DATABOX_USER_AGENT', ''),
}))
