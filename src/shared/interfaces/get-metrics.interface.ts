import { ServiceProvider } from '../enums/service-provider.enum'
import { Metric } from './metric.interface'

export interface GetMetrics {
  serviceProvider: ServiceProvider
  metrics: Metric[]
}
