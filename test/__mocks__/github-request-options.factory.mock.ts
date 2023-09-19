import { HttpModuleOptions } from '@nestjs/axios'
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

export const GITHUB_ACCESS_TOKEN = 'ghu_PqRqHb4duk28T9pZBuB3dsoQsrVJ4vtAX45Q'

export const HTTP_MODULE_OPTIONS: HttpModuleOptions = {
  headers: {
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
  },
}
