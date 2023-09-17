import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Response } from 'express'
import { GitHubRequestOptionsFactory } from '../http/github-request-options.factory'
import { DbFetchingService } from '../../../libs/db/services/db-fetching.service'
import { GitHubAuthenticationResponse } from '../responses/github-authentication.response'
import { DbWritingService } from '../../../libs/db/services/db-writing.service'
import { AuthenticationDB } from '../../../libs/db/entities/authentication-db.entity'

@Injectable()
export class GitHubAuthenticationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbFetchingService: DbFetchingService,
    private readonly dbWritingService: DbWritingService,
    private readonly gitHubRequestOptionsFactory: GitHubRequestOptionsFactory,
  ) {}

  /**
   * Initiate OAuth authentication flow in order to be able to access GitHub API
   */
  async authenticateUser(res: Response, code?: string): Promise<AuthenticationDB> {
    const { authUrl, clientId, clientSecret } = this.gitHubRequestOptionsFactory.getConfig()

    if (code) {
      const response = await firstValueFrom(
        this.httpService.get<GitHubAuthenticationResponse>(`${authUrl}/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`, { headers: { Accept: 'application/json' } }),
      )

      return this.saveAuthenticationData(response.data)
    }

    const authentication = await this.dbFetchingService.getAuthentication()

    if (!authentication) {
      res.redirect(`${authUrl}/authorize?client_id=${clientId}`)

      return
    }

    if (authentication.accessTokenExpiresAt < new Date()) {
      const response = await firstValueFrom(
        this.httpService.get<GitHubAuthenticationResponse>(`${authUrl}/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${authentication.refreshToken}`, { headers: { Accept: 'application/json' } }),
      )

      return this.saveAuthenticationData(response.data)
    }

    return authentication
  }

  private async saveAuthenticationData(authenticationResponse: GitHubAuthenticationResponse): Promise<AuthenticationDB> {
    const accessTokenExpiresAt = new Date()
    accessTokenExpiresAt.setSeconds(accessTokenExpiresAt.getSeconds() + authenticationResponse.expires_in)

    const authentication: Partial<AuthenticationDB> = {
      accessToken: authenticationResponse.access_token,
      accessTokenExpiresAt,
      refreshToken: authenticationResponse.refresh_token,
    }

    return this.dbWritingService.saveAuthentication(authentication)
  }
}
