import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import gitHubHttpConfig from './http/github-http.config'
import { GitHubService } from './services/github.service'
import { GitHubRequestOptionsFactory } from './http/github-request-options.factory'

@Module({
  imports: [ ConfigModule.forFeature(gitHubHttpConfig), HttpModule ],
  providers: [ GitHubService, GitHubRequestOptionsFactory ],
  exports: [ GitHubService, GitHubRequestOptionsFactory ],
})
export class GitHubModule {}
