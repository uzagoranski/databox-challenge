import { Module } from '@nestjs/common'
import { DataboxModule } from '@vendors/databox/databox.module'
import { ManageController } from '@modules/manage/controllers/manage.controller'
import { ManageService } from '@modules/manage/services/manage.service'
import { DbModule } from '@libs/db/db.module'

@Module({
  imports: [ DbModule, DataboxModule ],
  controllers: [ ManageController ],
  providers: [ ManageService ],
  exports: [ ManageService ],
})
export class ManageModule {}
