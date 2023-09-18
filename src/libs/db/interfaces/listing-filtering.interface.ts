import { ServiceProvider } from '../../../shared/enums/service-provider.enum'

export interface ListingFiltering {
  id?: string
  serviceProvider?: ServiceProvider
  numberOfKPIsSent?: number
  successfulRequest?: boolean
}
