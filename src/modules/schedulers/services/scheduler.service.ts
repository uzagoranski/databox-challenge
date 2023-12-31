import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SchedulerService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  readonly selfUrl: string = this.configService.get<string>('SELF_URL', 'http://127.0.0.1:3000/api/databox-challenge')

  // Cron job will be executed every day at 23:59 local time
  @Cron('59 23 * * *')
  async handleCron() {
    Logger.log(`Cron Job execution instantiated at ${new Date().toISOString()}. Daily sync of the metrics is starting.`)

    await firstValueFrom(this.httpService.get(`${this.selfUrl}/manage/metrics/sync`))

    Logger.log(`Cron Job execution finished at ${new Date().toISOString()}. Daily sync of the metrics is done.`)
  }
}
