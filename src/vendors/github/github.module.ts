import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import gitHubHttpConfig from './http/github-http.config'
import { GitHubService } from './services/github.service'
import { GitHubRequestOptionsFactory } from './http/github-request-options.factory'
import { DbModule } from '../../libs/db/db.module'
import { GitHubAuthenticationService } from './services/github-authentication.service'

@Module({
  imports: [ ConfigModule.forFeature(gitHubHttpConfig), DbModule, HttpModule ],
  providers: [ GitHubService, GitHubAuthenticationService, GitHubRequestOptionsFactory ],
  exports: [ GitHubService, GitHubAuthenticationService, GitHubRequestOptionsFactory ],
})
export class GitHubModule {}
