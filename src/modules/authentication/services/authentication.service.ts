import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { GitHubAuthenticationService } from '../../../vendors/data-sources/github/services/github-authentication.service'
import { AuthenticationMapper } from '../mappers/authentication.mapper'
import { AuthenticationResponse } from '../responses/authentication.response'
import { DbWritingService } from '../../../libs/db/services/db-writing.service'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly dbWritingService: DbWritingService,
    private readonly gitHubAuthenticationService: GitHubAuthenticationService,
  ) {}

  /**
   * Initialise OAuth2 authentication flow in order to be able to access GitHub API
   */
  async authenticateGitHubAccount(response: Response, code?: string): Promise<AuthenticationResponse | null> {
    const authentication = await this.gitHubAuthenticationService.authenticateUser(response, code)

    return authentication ? AuthenticationMapper.mapAuthenticationEntityToAuthenticationResponse(authentication) : null
  }

  /**
   * Remove existing GitHub authentication, collected via OAuth2 flow from local database
   */
  async removeGitHubAuthentication(): Promise<void> {
    return this.dbWritingService.deleteAuthentication()
  }
}
