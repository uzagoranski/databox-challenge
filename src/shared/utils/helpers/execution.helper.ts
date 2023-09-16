import { INestApplication, Logger as NestLogger } from '@nestjs/common'
import os from 'os'
import process from 'process'

export class ExecutionHelper {
  static async onAppRunning(app: INestApplication, service: string): Promise<void> {
    const startupLogger = new NestLogger(ExecutionHelper.name)
    const url = await app.getUrl()
    const date = new Date().toDateString()
    const messages = [
      '-------------------------------',
      `OS Type: ${os.type()}`,
      `OS Release: ${os.release()}`,
      `OS Platform: ${os.platform()}`,
      `Process Path: ${process.cwd()}`,
      `Process Title: ${service}`,
      `Process Pid: ${process.pid}`,
      `Node Version: ${process.version}`,
      '-------------------------------',
      `${service} started at ${date} on ${url}`,
    ]
    messages.forEach((message) => startupLogger.debug(message))

    app.useLogger(startupLogger)
  }

  static onAppBootstrapFailure(error: Error) {
    console.error(`[FATAL][ERR] - Service could not be started. Reason: ${error.message}`)
  }
}
