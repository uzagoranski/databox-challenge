import { HttpModuleOptions } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import databoxHttpConfig from '@vendors/databox/http/databox-http.config'
import { DataboxHttpConfig } from '@vendors/databox/interfaces/databox-config.interface'

@Injectable()
export class DataboxRequestOptionsFactory {
  constructor(@Inject(databoxHttpConfig.KEY) private config: DataboxHttpConfig) {}

  buildUrl(path?: string): string {
    const { baseUrl } = this.config

    return `${baseUrl}${path || ''}`
  }

  createFormRequestOptions(): HttpModuleOptions {
    return {
      headers: {
        'User-Agent': this.config.userAgent,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.databox.v2+json',
      },
      auth: {
        username: this.config.pushToken,
        password: '',
      },
    }
  }
}
