import { Module } from '@nestjs/common'
import { DbModule } from '../../libs/db/db.module'
import { DataboxModule } from '../../vendors/databox/databox.module'
import { GitHubModule } from '../../vendors/github/github.module'
import { CoinCapModule } from '../../vendors/coincap/coincap.module'
import { ManageController } from './controllers/manage.controller'
import { ManageService } from './services/manage.service'

@Module({
  imports: [ DbModule, DataboxModule, GitHubModule, CoinCapModule ],
  controllers: [ ManageController ],
  providers: [ ManageService ],
  exports: [ ManageService ],
})
export class ManageModule {}
