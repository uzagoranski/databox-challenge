import { Module } from '@nestjs/common'
import { DbModule } from '../../libs/db/db.module'
import { DataboxModule } from '../../vendors/databox/databox.module'
import { DataSourceModule } from '../../vendors/data-sources/data-source.module'
import { ManageController } from './controllers/manage.controller'
import { ManageService } from './services/manage.service'

@Module({
  imports: [ DbModule, DataboxModule, DataSourceModule ],
  controllers: [ ManageController ],
  providers: [ ManageService ],
  exports: [ ManageService ],
})
export class ManageModule {}
