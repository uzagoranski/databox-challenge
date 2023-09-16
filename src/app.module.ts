import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ManageModule } from './modules/manage/manage.module'
import { TypeOrmConfig } from './config/typeorm.config'

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
