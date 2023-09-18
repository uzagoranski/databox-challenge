import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestDataEntity } from './entities/request-data.entity'
import { AuthenticationEntity } from './entities/authentication.entity'
import { DbListingService } from './services/db-listing.service'
import { DbFetchingService } from './services/db-fetching.service'
import { DbWritingService } from './services/db-writing.service'

@Module({
  imports: [ TypeOrmModule.forFeature([ RequestDataEntity, AuthenticationEntity ]) ],
  providers: [ DbListingService, DbFetchingService, DbWritingService ],
  exports: [ DbListingService, DbFetchingService, DbWritingService ],
})
export class DbModule {}
