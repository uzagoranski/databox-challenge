import { Inject, Injectable } from '@nestjs/common'
import { HttpModuleOptions } from '@nestjs/axios'
import gitHubHttpConfig from './github-http.config'
import { GitHubHttpConfig } from '../interfaces/github-config.interface'

@Injectable()
export class GitHubRequestOptionsFactory {
  constructor(@Inject(gitHubHttpConfig.KEY) private config: GitHubHttpConfig) {}

  buildUrl(path?: string): string {
    const { baseUrl } = this.config

    return `${baseUrl}${path ? `/${path}` : ''}`
  }

  createFormRequestOptions(token: string): HttpModuleOptions {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    }
  }
}
