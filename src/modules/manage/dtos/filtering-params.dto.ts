import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { ListingFiltering } from '../../../libs/db/interfaces/listing-filtering.interface'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'

export class FilteringParamsDto implements ListingFiltering {
  @ApiPropertyOptional({ example: '132d1983-9668-49ca-9737-82aeda63f89a', description: 'Token database identifier' })
  @IsString()
  @IsOptional()
    id?: string

  @ApiPropertyOptional({ example: ServiceProvider.GITHUB, description: 'Metrics source' })
  @IsEnum(ServiceProvider)
  @IsOptional()
    serviceProvider?: ServiceProvider

  @ApiPropertyOptional({ example: '12-02-2023', description: 'Time of sending the request' })
  @IsString()
  @IsDateString()
  @IsOptional()
    timeOfSending?: string

  @ApiPropertyOptional({ example: 1, description: 'Amount of sent KPIs' })
  @IsNumber()
  @IsOptional()
    numberOfKPIsSent?: number

  @ApiPropertyOptional({ example: true, description: 'Request status' })
  @IsBoolean()
  @Transform(({ value }) => (value === 'true'))
  @IsOptional()
    successfulRequest?: boolean
}
