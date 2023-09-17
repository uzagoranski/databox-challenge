import { ApiProperty } from '@nestjs/swagger'

export class GitHubAuthenticationResponse {
  @ApiProperty({ example: 'ghu_IZSm3KhL0lQ5OKnrnMC00YvbbFII7z3TJSKB', description: 'User\'s access token' })
    access_token: string

  @ApiProperty({ example: 28800, description: 'Expiration of the access token' })
    expires_in: number

  @ApiProperty({ example: 'ghr_T2ZKN6q58Zsk8yNEcm5tWOi9Xdo3GfHyOOhhKAq8mEztN2Xf1K7hCigtqaLVXxAI9ADx0y27nKIw', description: 'User\'s refresh token' })
    refresh_token: string

  @ApiProperty({ example: 15724799, description: 'Expiration of the refresh token' })
    refresh_token_expires_in: number

  @ApiProperty({ example: '1259cb53-5274-4ac0-bf2d-0e337bd8a002', description: 'Token scope' })
    scope: string

  @ApiProperty({ example: 'bearer', description: 'Token type' })
    token_type: string
}
