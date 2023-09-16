import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppConfig } from '@config/app.config'
import { SwaggerConfig } from '@config/swagger.config'

export class SwaggerFactory {
  static setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder().setTitle(AppConfig.APP_NAME).setDescription(AppConfig.APP_DESCRIPTION).addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(SwaggerConfig.APP_DOCS_PATH, app, document)
  }
}
