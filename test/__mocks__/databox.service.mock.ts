import { DataboxHttpConfig } from '../../src/vendors/databox/interfaces/databox-config.interface'
import { DataboxPushMultipleMetricsSuccessResponse } from '../../src/vendors/databox/responses/databox-push-multiple-metrics-success.response'
import { Metric } from '../../src/shared/interfaces/metric.interface'
import { DataboxRequestMetric } from '../../src/vendors/databox/interfaces/databox-request-metric.interface'

export const DATABOX_HTTP_CONFIG: DataboxHttpConfig = {
  baseUrl: 'https://push.databox.com',
  userAgent: 'databox-js/2.0.1',
  pushToken: 'hfg9iteynlka8caou2vwjq',
}

export const DATABOX_METRICS_ARRAY: Metric[] = [{
  key: 'GitHub_commits_since_yesterday',
  value: 5,
}]

export const DATABOX_REQUEST_METRICS_ARRAY: DataboxRequestMetric[] = [{
  $GitHub_commits_since_yesterday: 5,
}]

export const DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE: DataboxPushMultipleMetricsSuccessResponse = {
  status: 'OK',
  message: 'Successfully pushed 1 data entry!',
  id: '1259cb53-5274-4ac0-bf2d-0e337bd8a002',
}
