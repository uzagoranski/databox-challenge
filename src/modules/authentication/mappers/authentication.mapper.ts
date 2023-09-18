import { AuthenticationEntity } from '../../../libs/db/entities/authentication.entity'
import { AuthenticationResponse } from '../responses/authentication.response'

export class AuthenticationMapper {
  static mapAuthenticationEntityToAuthenticationResponse(authentication: AuthenticationEntity): AuthenticationResponse {
    return {
      access_token: authentication.accessToken,
      expires_at: authentication.accessTokenExpiresAt,
    }
  }
}
