import { GetMetrics } from '../../shared/interfaces/get-metrics.interface'
import { ServiceProvider } from '../../shared/enums/service-provider.enum'

export const DATA_SOURCE_SERVICE = 'DataSourceService'

export interface DataSourceService {
  serviceProvider: ServiceProvider

  getMetrics(): Promise<GetMetrics>
}
