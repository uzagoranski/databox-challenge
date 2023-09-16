import { Metric } from '@shared/interfaces/metric.interface'
import { DataboxRequestMetric } from '@vendors/databox/interfaces/databox-request-metric.interface'

export class DataboxMapper {
  static mapMetricsToRequestMetrics(metrics: Metric[]): DataboxRequestMetric[] {
    return metrics.map((metric) => ({ [`$${metric.key}`]: metric.value }))
  }
}
