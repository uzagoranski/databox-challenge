import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Max } from 'class-validator'
import { FilteringParamsDto } from '@modules/manage/dtos/filtering-params.dto'

export class ListingParamsDto extends FilteringParamsDto {
  @ApiPropertyOptional({ example: 10, description: 'Max items by page' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Max(50)
    limit?: number

  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsNumber()
  @Type(() => Number)
  @Max(50)
  @IsOptional()
    page?: number
}
