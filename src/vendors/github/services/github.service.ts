import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { GitHubRequestOptionsFactory } from '../http/github-request-options.factory'
import { GithubCommitsResponse } from '../responses/github-commits.response'

@Injectable()
export class GitHubService {
  constructor(
    private readonly httpService: HttpService,
    private readonly gitHubRequestOptionsFactory: GitHubRequestOptionsFactory,
  ) {}

  /**
   * Initiate OAuth authentication flow in order to be able to access GitHub API
   */
  async authenticateUser(): Promise<any> {
    const path = this.gitHubRequestOptionsFactory.buildUrl()

    try {
      const response = await firstValueFrom(this.httpService.get<GithubCommitsResponse>(path))

      return response.data
    } catch (e) {
      Logger.error(`There has been an error in interaction with GitHub API. Error details: ${e.message}`)

      throw e
    }
  }

  /**
   * Fetch commit data for selected repository from GitHub API
   */
  async getCommitsData(): Promise<GithubCommitsResponse> {
    const path = this.gitHubRequestOptionsFactory.buildUrl()

    try {
      const response = await firstValueFrom(this.httpService.get<GithubCommitsResponse>(path))

      return response.data
    } catch (e) {
      Logger.error(`There has been an error in interaction with GitHub API. Error details: ${e.message}`)

      throw e
    }
  }
}
