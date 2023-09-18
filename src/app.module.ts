import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfig } from './config/typeorm.config'
import { AuthenticationModule } from './modules/authentication/authentication.module'
import { ManageModule } from './modules/manage/manage.module'
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
    AuthenticationModule,
    ManageModule,
    SchedulerModule,
  ],
})
export class AppModule {}
