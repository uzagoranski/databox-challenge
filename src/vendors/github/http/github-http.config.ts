import { ConfigService, registerAs } from '@nestjs/config'
import { GitHubHttpConfig } from '../interfaces/github-config.interface'

const configService = new ConfigService()

export default registerAs<GitHubHttpConfig>('GitHubHttpConfig', () => ({
  baseUrl: configService.get('GITHUB_BASE_URL', ''),
  apiVersion: configService.get('GITHUB_API_VERSION', ''),
  clientId: configService.get('GITHUB_CLIENT_ID', ''),
  clientSecret: configService.get('SECRET_GITHUB_CLIENT_SECRET', ''),
}))
