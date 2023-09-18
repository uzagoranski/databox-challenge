import { ApiProperty } from '@nestjs/swagger'

export class AuthenticationResponse {
  @ApiProperty({ example: 'ghu_PqRqHb4duk28T9pZBuB3dsoQsrVJ4vtAX45Q', description: 'Access token' })
    access_token: string

  @ApiProperty({ example: '2023-09-18T16:10:28.000Z', description: 'Access token expiration date' })
    expires_at: Date
}
