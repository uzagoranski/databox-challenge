import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestDataDB } from './entities/request-data-db.entity'
import { AuthenticationDB } from './entities/authentication-db.entity'
import { DbListingService } from './services/db-listing.service'
import { DbFetchingService } from './services/db-fetching.service'
import { DbWritingService } from './services/db-writing.service'

@Module({
  imports: [ TypeOrmModule.forFeature([ RequestDataDB, AuthenticationDB ]) ],
  providers: [ DbListingService, DbFetchingService, DbWritingService ],
  exports: [ DbListingService, DbFetchingService, DbWritingService ],
})
export class DbModule {}
