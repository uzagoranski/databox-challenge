import { HttpModuleOptions } from '@nestjs/axios'
import { DataboxHttpConfig } from '../../src/vendors/databox/interfaces/databox-config.interface'

export const DATABOX_HTTP_CONFIG: DataboxHttpConfig = {
  baseUrl: 'https://push.databox.com',
  userAgent: 'databox-js/2.0.1',
  pushToken: 'hfg9iteynlka8caou2vwjq',
}

export const HTTP_MODULE_OPTIONS: HttpModuleOptions = {
  headers: {
    'User-Agent': 'databox-js/2.0.1',
    'Content-Type': 'application/json',
    Accept: 'application/vnd.databox.v2+json',
  },
  auth: {
    username: 'hfg9iteynlka8caou2vwjq',
    password: '',
  },
}
