import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestDataDB } from '@libs/db/entities/request-data-db.entity'
import { DbListingService } from '@libs/db/services/db-listing.service'
import { DbFetchingService } from '@libs/db/services/db-fetching.service'
import { DbWritingService } from '@libs/db/services/db-writing.service'

@Module({
  imports: [ TypeOrmModule.forFeature([ RequestDataDB ]) ],
  providers: [ DbListingService, DbFetchingService, DbWritingService ],
  exports: [ DbListingService, DbFetchingService, DbWritingService ],
})
export class DbModule {}
