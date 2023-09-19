import { GitHubHttpConfig } from '../../src/vendors/data-sources/github/interfaces/github-config.interface'
import { GetMetrics } from '../../src/shared/interfaces/get-metrics.interface'
import { ServiceProvider } from '../../src/shared/enums/service-provider.enum'

export const GITHUB_HTTP_CONFIG: GitHubHttpConfig = {
  authUrl: 'https://github.com/login/oauth',
  baseUrl: 'https://api.github.com',
  apiVersion: '2022-11-28',
  clientId: 'mock-client-id',
  clientSecret: 'mock-client-secret',
  repository: 'advisory-database',
  owner: 'github',
}

export const GITHUB_GET_METRICS: GetMetrics = {
  serviceProvider: ServiceProvider.GITHUB,
  metrics: [
    {
      key: 'GitHub_commits_since_yesterday',
      value: 5,
    },
    {
      key: 'GitHub_open_pull_requests',
      value: 5,
    },
  ],
}
