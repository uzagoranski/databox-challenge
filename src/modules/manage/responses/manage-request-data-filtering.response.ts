import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ListingFiltering } from '../../../libs/db/interfaces/listing-filtering.interface'
import { ManageRequestDataFilteringType } from '../enums/manage-request-data-filtering-type.enum'

export class ManageRequestDataFilteringResponse {
  @ApiProperty({ enum: ManageRequestDataFilteringType, example: 'updatedAt', description: '2022-02-04' })
    id: ManageRequestDataFilteringType

  @ApiProperty({ example: 'Created at', description: 'Name of the selected filter' })
    name: string

  @ApiPropertyOptional({ example: { tokenId: '1' }, description: 'Currently applied filter' })
    selected?: ListingFiltering
}
