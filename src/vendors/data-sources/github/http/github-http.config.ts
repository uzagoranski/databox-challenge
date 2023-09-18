import { ConfigService, registerAs } from '@nestjs/config'
import { GitHubHttpConfig } from '../interfaces/github-config.interface'

const configService = new ConfigService()

export default registerAs<GitHubHttpConfig>('GitHubHttpConfig', () => ({
  authUrl: configService.get('GITHUB_OAUTH_BASE_URL', 'https://github.com/login/oauth'),
  baseUrl: configService.get('GITHUB_BASE_URL', 'https://api.github.com'),
  apiVersion: configService.get('GITHUB_API_VERSION', '2022-11-28'),
  clientId: configService.get('GITHUB_CLIENT_ID', ''),
  clientSecret: configService.get('SECRET_GITHUB_CLIENT_SECRET', ''),
  repository: configService.get('GITHUB_REPOSITORY', 'advisory-database'),
  owner: configService.get('GITHUB_REPOSITORY_OWNER', 'github'),
}))
