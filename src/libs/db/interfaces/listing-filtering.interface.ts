import { ServiceProvider } from '../../../shared/enums/service-provider.enum'

export interface ListingFiltering {
  id?: string
  serviceProvider?: ServiceProvider
  timeOfSending?: string
  numberOfKPIsSent?: number
  successfulRequest?: boolean
}
