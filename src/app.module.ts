import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ManageModule } from './modules/manage/manage.module'
import { TypeOrmConfig } from './config/typeorm.config'
import { SchedulerModule } from './modules/schedulers/scheduler.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ ConfigService ],
      useClass: TypeOrmConfig,
    }),
    ManageModule,
    SchedulerModule,
  ],
})
export class AppModule {}
