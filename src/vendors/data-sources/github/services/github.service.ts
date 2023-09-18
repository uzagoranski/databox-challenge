import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { GitHubRequestOptionsFactory } from '../http/github-request-options.factory'
import { GitHubAuthenticationService } from './github-authentication.service'
import { Metric } from '../../../../shared/interfaces/metric.interface'
import { DataSourceService } from '../../data-source.service.interface'
import { GetMetrics } from '../../../../shared/interfaces/get-metrics.interface'
import { ServiceProvider } from '../../../../shared/enums/service-provider.enum'
import { AuthenticationEntity } from '../../../../libs/db/entities/authentication.entity'

@Injectable()
export class GitHubService implements DataSourceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly gitHubAuthenticationService: GitHubAuthenticationService,
    private readonly gitHubRequestOptionsFactory: GitHubRequestOptionsFactory,
  ) {}

  serviceProvider = ServiceProvider.GITHUB

  async getMetrics(): Promise<GetMetrics> {
    const authentication = await this.gitHubAuthenticationService.getAuthenticationData()

    const metricsResponse: GetMetrics = {
      serviceProvider: this.serviceProvider,
      metrics: [],
    }

    // Using early return to avoid calling the GitHub API and getting an error
    if (!authentication) {
      return metricsResponse
    }

    // To get data for all relevant metrics, we have to call the GitHub integration service two times
    const [ commitsSinceYesterday, openPullRequests ] = await Promise.all([
      await this.getCommits(authentication),
      await this.getPullRequests(authentication),
    ])

    // When data is successfully fetched, we have to map it to Databox format by creating key-value pairs
    const values: Metric[] = [
      { key: 'GitHub_commits_since_yesterday', value: commitsSinceYesterday.length },
      { key: 'GitHub_open_pull_requests', value: openPullRequests.length },
    ]

    // The key-value pairs are then pushed into metrics array, which is returned to the client
    metricsResponse.metrics.push(...values)

    return metricsResponse
  }

  /**
   * Fetch commit data for selected repository from GitHub API
   */
  private async getCommits(authentication: AuthenticationEntity): Promise<any[]> {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const path = this.gitHubRequestOptionsFactory.buildUrl(`commits?since=${yesterday.toISOString()}`)

    return this.fetchData(path, authentication)
  }

  /**
   * Fetch pull request data for selected repository from GitHub API
   */
  private async getPullRequests(authentication: AuthenticationEntity): Promise<any[]> {
    const path = this.gitHubRequestOptionsFactory.buildUrl(`pulls?state=open&per_page=100`)

    return this.fetchData(path, authentication)
  }

  private async fetchData(path: string, authentication: AuthenticationEntity): Promise<any[]> {
    try {
      const options = this.gitHubRequestOptionsFactory.createFormRequestOptions(authentication?.accessToken)

      const response = await firstValueFrom(this.httpService.get<any>(path, options))

      return response.data
    } catch (e) {
      Logger.error(`An error occurred in interaction with GitHub API. Error details: ${e.message}`)

      throw e
    }
  }
}
