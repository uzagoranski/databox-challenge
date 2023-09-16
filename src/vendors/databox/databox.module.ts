import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import databoxHttpConfig from './http/databox-http.config'
import { DataboxService } from './services/databox.service'
import { DataboxRequestOptionsFactory } from './http/databox-request-options.factory'

@Module({
  imports: [ ConfigModule.forFeature(databoxHttpConfig), HttpModule ],
  providers: [ DataboxService, DataboxRequestOptionsFactory ],
  exports: [ DataboxService, DataboxRequestOptionsFactory ],
})
export class DataboxModule {}
