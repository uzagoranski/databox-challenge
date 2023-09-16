import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import databoxHttpConfig from '@vendors/databox/http/databox-http.config'
import { DataboxService } from '@vendors/databox/services/databox.service'
import { DataboxRequestOptionsFactory } from '@vendors/databox/http/databox-request-options.factory'

@Module({
  imports: [ ConfigModule.forFeature(databoxHttpConfig), HttpModule ],
  providers: [ DataboxService, DataboxRequestOptionsFactory ],
  exports: [ DataboxService, DataboxRequestOptionsFactory ],
})
export class DataboxModule {}
