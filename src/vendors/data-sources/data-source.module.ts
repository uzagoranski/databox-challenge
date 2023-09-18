import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { DbModule } from '../../libs/db/db.module'
import { CoinCapService } from './coincap/services/coincap.service'
import { GitHubService } from './github/services/github.service'
import { GitHubAuthenticationService } from './github/services/github-authentication.service'
import { DATA_SOURCE_SERVICE, DataSourceService } from './data-source.service.interface'
import gitHubHttpConfig from './github/http/github-http.config'
import coincapHttpConfig from './coincap/http/coincap-http.config'
import { GitHubRequestOptionsFactory } from './github/http/github-request-options.factory'
import { CoinCapRequestOptionsFactory } from './coincap/http/coincap-request-options.factory'

@Module({
  imports: [ ConfigModule.forFeature(gitHubHttpConfig), ConfigModule.forFeature(coincapHttpConfig), DbModule, HttpModule ],
  providers: [
    GitHubService,
    GitHubAuthenticationService,
    GitHubRequestOptionsFactory,
    CoinCapService,
    CoinCapRequestOptionsFactory,
    {
      provide: DATA_SOURCE_SERVICE,
      useFactory: (...services: DataSourceService[]) => services,
      inject: [ GitHubService, CoinCapService ],
    },
  ],
  exports: [ DATA_SOURCE_SERVICE ],
})
export class DataSourceModule {}
