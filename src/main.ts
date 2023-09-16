import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { ExecutionHelper } from '@shared/utils/helpers/execution.helper'
import { SwaggerFactory } from '@docs/swagger/swagger.factory'
import { AppConfig } from '@config/app.config'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const appPort: number = configService.get<number>('APP_PORT', AppConfig.APP_PORT)
  const appHostname: string = configService.get<string>('APP_HOSTNAME', AppConfig.APP_HOST)
  const apiPrefix: string = configService.get<string>('APP_API_PREFIX', AppConfig.GLOBAL_PREFIX)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.setGlobalPrefix(apiPrefix)
  app.enableCors()

  SwaggerFactory.setupSwagger(app)

  await app.listen(appPort, appHostname)

  await ExecutionHelper.onAppRunning(app, AppConfig.APP_NAME)
}
bootstrap().catch((error: Error) => ExecutionHelper.onAppBootstrapFailure(error))
