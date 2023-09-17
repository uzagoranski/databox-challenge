import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { DataboxRequestOptionsFactory } from '../http/databox-request-options.factory'
import { Metric } from '../../../shared/interfaces/metric.interface'
import { DataboxPushMultipleMetricsSuccessResponse } from '../responses/databox-push-multiple-metrics-success.response'
import { DataboxRequestPayload } from '../interfaces/databox-request-payload.interface'
import { DataboxMapper } from '../mappers/databox.mapper'

@Injectable()
export class DataboxService {
  constructor(
    private readonly httpService: HttpService,
    private readonly databoxRequestOptionsFactory: DataboxRequestOptionsFactory,
  ) {}

  /**
   * Push multiple metrics to Databox API, calling / endpoint and returning response message with status
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
      Logger.error(`An error occurred in interaction with Databox API. Error details: ${e.message}`)

      throw e
    }
  }
}
