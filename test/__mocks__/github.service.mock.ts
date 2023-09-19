import { GitHubHttpConfig } from '../../src/vendors/data-sources/github/interfaces/github-config.interface'

export const GITHUB_HTTP_CONFIG: GitHubHttpConfig = {
  authUrl: 'https://github.com/login/oauth',
  baseUrl: 'https://api.github.com',
  apiVersion: '2022-11-28',
  clientId: 'mock-client-id',
  clientSecret: 'mock-client-secret',
  repository: 'advisory-database',
  owner: 'github',
}
