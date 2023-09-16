import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfig } from '@config/typeorm.config'
import { ManageModule } from '@modules/manage/manage.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ManageModule,
    TypeOrmModule.forRootAsync({
      inject: [ ConfigService ],
      useClass: TypeOrmConfig,
    }),
  ],
})
export class AppModule {}
