import { ApiProperty } from '@nestjs/swagger'

export class DataboxPushMultipleMetricsSuccessResponse {
  @ApiProperty({ example: 'OK', description: 'Response status' })
    status: string

  @ApiProperty({ example: 'Successfully pushed 2 data entries!', description: 'Response message' })
    message: string

  @ApiProperty({ example: '1259cb53-5274-4ac0-bf2d-0e337bd8a002', description: 'Response identifier' })
    id: string
}
