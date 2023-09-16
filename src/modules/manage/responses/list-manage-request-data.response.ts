import { ApiProperty } from '@nestjs/swagger'
import { ManageRequestDataResponse } from './manage-request-data.response'
import { Pagination } from '../../../libs/db/interfaces/pagination.interface'

export class ListManageRequestDataResponse implements Pagination<ManageRequestDataResponse[]> {
  @ApiProperty({ type: [ ManageRequestDataResponse ], description: 'List of results' })
    items: ManageRequestDataResponse[]

  @ApiProperty({ example: 1, description: 'Page number' })
    page: number

  @ApiProperty({ example: 10, description: 'Max items per page' })
    limit: number

  @ApiProperty({ example: 25, description: 'Total results' })
    total: number

  // @ApiProperty({ type: [ ManageRequestDataFilteringResponse ], description: 'Filtering options' })
  //   filtering: ManageRequestDataFilteringResponse[]
}
