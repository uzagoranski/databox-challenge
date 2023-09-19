import { HttpModuleOptions } from '@nestjs/axios'

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
