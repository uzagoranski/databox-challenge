import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Metric } from '@shared/interfaces/metric.interface'
import { DataboxMapper } from '@vendors/databox/mappers/databox.mapper'
import { DataboxRequestPayload } from '@vendors/databox/interfaces/databox-request-payload.interface'
import { DataboxRequestOptionsFactory } from '@vendors/databox/http/databox-request-options.factory'
import { DataboxPushMultipleMetricsSuccessResponse } from '@vendors/databox/responses/databox-push-multiple-metrics-success.response'

@Injectable()
export class DataboxService {
  constructor(
    private readonly httpService: HttpService,
    private readonly databoxRequestOptionsFactory: DataboxRequestOptionsFactory,
  ) {}

  /**
   * Initialise authentication flow with tokenproof API, calling /simple endpoint and returning deeplink to tokenproof application
   */
  async pushMultipleMetrics(metrics: Metric[]): Promise<DataboxPushMultipleMetricsSuccessResponse> {
    const path = this.databoxRequestOptionsFactory.buildUrl()
    const options = this.databoxRequestOptionsFactory.createFormRequestOptions()

    const payload: DataboxRequestPayload = {
      data: DataboxMapper.mapMetricsToRequestMetrics(metrics),
    }

    try {
      const response = await firstValueFrom(this.httpService.post<DataboxPushMultipleMetricsSuccessResponse>(path, payload, options))

      return response.data
    } catch (e) {
      Logger.error(`There has been an error in interaction with Databox API. Error details: ${e.message}`)

      throw e
    }
  }
}
