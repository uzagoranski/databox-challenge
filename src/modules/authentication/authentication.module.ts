import { Module } from '@nestjs/common'
import { DbModule } from '../../libs/db/db.module'
import { GitHubModule } from '../../vendors/github/github.module'
import { AuthenticationController } from './controllers/authentication.controller'
import { AuthenticationService } from './services/authentication.service'

@Module({
  imports: [ DbModule, GitHubModule ],
  controllers: [ AuthenticationController ],
  providers: [ AuthenticationService ],
  exports: [ AuthenticationService ],
})
export class AuthenticationModule {}
