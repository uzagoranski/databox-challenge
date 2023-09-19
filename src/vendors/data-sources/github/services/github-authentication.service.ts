import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Response } from 'express'
import { GitHubRequestOptionsFactory } from '../http/github-request-options.factory'
import { DbFetchingService } from '../../../../libs/db/services/db-fetching.service'
import { GitHubAuthenticationResponse } from '../responses/github-authentication.response'
import { DbWritingService } from '../../../../libs/db/services/db-writing.service'
import { AuthenticationEntity } from '../../../../libs/db/entities/authentication.entity'

@Injectable()
export class GitHubAuthenticationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbFetchingService: DbFetchingService,
    private readonly dbWritingService: DbWritingService,
    private readonly gitHubRequestOptionsFactory: GitHubRequestOptionsFactory,
  ) {}

  /**
   * Initialise OAuth2 authentication flow in order to be able to access GitHub API
   */
  async authenticateUser(res: Response, code?: string): Promise<AuthenticationEntity | null> {
    const { authUrl, clientId, clientSecret } = this.gitHubRequestOptionsFactory.getConfig()

    // If code is provided in the request, that means we're in the 2nd step of OAuth2 flow, requesting the actual access_token from the GitHub API
    if (code) {
      const response = await firstValueFrom(
        this.httpService.get<GitHubAuthenticationResponse>(`${authUrl}/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`, { headers: { Accept: 'application/json' } }),
      )

      return this.saveAuthenticationData(response.data)
    }

    // Otherwise, we want to check if some data is already present in the database. Keep in mind this is for development
    // purpose only and would be implemented in a different way, if we also had a requirement to implement user management.
    // In that case, we'd link the tokens to the user profile, now, we're only allowing one connection per instance.
    const authentication = await this.dbFetchingService.getAuthentication()

    // If authentication data is not present, we want to initialise OAuth2 flow, calling the GitHub API /authorize endpoint
    if (!authentication) {
      res.redirect(`${authUrl}/authorize?client_id=${clientId}`)

      return null
    }

    // Otherwise, we want to check, if access_token, stored in our DB is still valid. If not, we'll call GitHub API
    // with our refresh_token and request a new access token that will allow us to fetch relevant data.
    if (authentication.accessTokenExpiresAt < new Date()) {
      return this.updateAuthenticationDataIfExpired(authentication)
    }

    return authentication
  }

  /**
   * Returns authentication data if it exists in the database
   */
  async getAuthenticationData(): Promise<AuthenticationEntity | null> {
    return this.dbFetchingService.getAuthentication()
  }

  async updateAuthenticationDataIfExpired(authentication: AuthenticationEntity): Promise<AuthenticationEntity> {
    const { authUrl, clientId, clientSecret } = this.gitHubRequestOptionsFactory.getConfig()

    const response = await firstValueFrom(
      this.httpService.get<GitHubAuthenticationResponse>(`${authUrl}/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${authentication.refreshToken}`, { headers: { Accept: 'application/json' } }),
    )

    return this.saveAuthenticationData(response.data)
  }

  private async saveAuthenticationData(authenticationResponse: GitHubAuthenticationResponse): Promise<AuthenticationEntity> {
    const accessTokenExpiresAt = new Date()
    accessTokenExpiresAt.setSeconds(accessTokenExpiresAt.getSeconds() + authenticationResponse.expires_in)

    const authentication: Partial<AuthenticationEntity> = {
      accessToken: authenticationResponse.access_token,
      accessTokenExpiresAt,
      refreshToken: authenticationResponse.refresh_token,
    }

    return this.dbWritingService.saveAuthentication(authentication)
  }
}
