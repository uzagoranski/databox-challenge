import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { HttpModule } from '@nestjs/axios'
import { SchedulerService } from './services/scheduler.service'

@Module({
  imports: [ ScheduleModule.forRoot(), HttpModule ],
  providers: [ SchedulerService ],
})
export class SchedulerModule {}
