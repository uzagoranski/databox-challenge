import { AuthenticationEntity } from '../../src/libs/db/entities/authentication.entity'
import { AuthenticationResponse } from '../../src/modules/authentication/responses/authentication.response'

export const AUTHENTICATION_ENTITY: AuthenticationEntity = {
  id: '19cb5253-1774-5cc0-ef5d-038a0eb37d02',
  accessToken: 'ghu_PqRqHb4duk28T9pZBuB3dsoQsrVJ4vtAX45Q',
  accessTokenExpiresAt: new Date('2023-09-18T16:10:28.000Z'),
  refreshToken: 'ghr_T2ZKN6q58Zsk8yNEcm5tWOi9Xdo3GfHyOOhhKAq8mEztN2Xf1K7hCigtqaLVXxAI9ADx0y27nKIw',
}

export const AUTHENTICATION_RESPONSE: AuthenticationResponse = {
  access_token: 'ghu_PqRqHb4duk28T9pZBuB3dsoQsrVJ4vtAX45Q',
  expires_at: new Date('2023-09-18T16:10:28.000Z'),
}
