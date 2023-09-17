import { Inject, Injectable } from '@nestjs/common'
import { HttpModuleOptions } from '@nestjs/axios'
import gitHubHttpConfig from './github-http.config'
import { GitHubHttpConfig } from '../interfaces/github-config.interface'

@Injectable()
export class GitHubRequestOptionsFactory {
  constructor(@Inject(gitHubHttpConfig.KEY) private config: GitHubHttpConfig) {}

  buildUrl(path?: string): string {
    const { baseUrl, repository, owner } = this.config

    return `${baseUrl}/repos/${owner}/${repository}${path ? `/${path}` : ''}`
  }

  getConfig(): GitHubHttpConfig {
    return this.config
  }

  createFormRequestOptions(token: string): HttpModuleOptions {
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': this.config.apiVersion,
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    }
  }
}
