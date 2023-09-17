import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Response } from 'express'
import { GitHubRequestOptionsFactory } from '../http/github-request-options.factory'
import { GitHubAuthenticationService } from './github-authentication.service'

@Injectable()
export class GitHubService {
  constructor(
    private readonly httpService: HttpService,
    private readonly gitHubAuthorizationService: GitHubAuthenticationService,
    private readonly gitHubRequestOptionsFactory: GitHubRequestOptionsFactory,
  ) {}

  /**
   * Fetch commit data for selected repository from GitHub API
   */
  async getCommits(res: Response, code?: string): Promise<any[]> {
    const yesterday = new Date()

    yesterday.setDate(yesterday.getDate() - 1)

    const path = this.gitHubRequestOptionsFactory.buildUrl(`commits?since=${yesterday.toISOString()}`)

    return this.fetchData(path, res, code)
  }

  /**
   * Fetch pull request data for selected repository from GitHub API
   */
  async getPullRequests(res: Response, code?: string): Promise<any[]> {
    const path = this.gitHubRequestOptionsFactory.buildUrl(`pulls?state=open&per_page=100`)

    return this.fetchData(path, res, code)
  }

  private async fetchData(path: string, res: Response, code?: string): Promise<any[]> {
    try {
      const authentication = await this.gitHubAuthorizationService.authenticateUser(res, code)

      const options = this.gitHubRequestOptionsFactory.createFormRequestOptions(authentication.accessToken)

      const response = await firstValueFrom(this.httpService.get<any>(path, options))

      return response.data
    } catch (e) {
      Logger.error(`An error occurred in interaction with GitHub API. Error details: ${e.message}`)

      throw e
    }
  }
}
