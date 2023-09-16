import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { Metric } from '../../../shared/interfaces/metric.interface'

export class ManageRequestDataResponse {
  @ApiProperty({ example: '942cc87b-5a75-4824-828a-9712723e89d2', description: 'Request data database identifier' })
    id: string

  @ApiProperty({ enum: ServiceProvider, example: ServiceProvider.GITHUB, description: 'Request data service provider' })
    service_provider: ServiceProvider

  @ApiProperty({ example: '2022-03-21 07:56:20.114966', description: 'Request execution date' })
    time_of_sending: string

  @ApiProperty({ example: [{ key: 'test', value: 1 }, { key: 'test', value: 5 }], description: 'Array of metrics, sent to Databox API' })
    metrics_sent: Metric[]

  @ApiProperty({ example: 3, description: 'Amount of sent KPIs' })
    number_of_KPIs_sent: number

  @ApiProperty({ example: true, description: 'Request status (successful/erroneous)' })
    successful_request: boolean

  @ApiPropertyOptional({ example: 'Validation error', description: 'Optional error message in case request failed' })
    error_message?: string
}
