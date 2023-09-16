import path from 'path'
import { TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): MysqlConnectionOptions {
    const host = this.configService.get<string>('TYPEORM_HOST')
    const reader = this.configService.get<string>('TYPEORM_READER_HOST') || host
    const isDifferentHost = reader !== host
    const extra = isDifferentHost ? { max: this.configService.get<number>('TYPEORM_MAX_CON', 20) } : undefined
    const synchronize = this.configService.get<boolean>('TYPEORM_ENABLE_SYNCHRONIZE')

    const options: MysqlConnectionCredentialsOptions = {
      host,
      port: this.configService.get<number>('TYPEORM_PORT', 3306),
      database: this.configService.get<string>('TYPEORM_DATABASE'),
      username: this.configService.get<string>('TYPEORM_USERNAME'),
      password: this.configService.get<string>('SECRET_TYPEORM_PASSWORD'),
    }

    const replication = isDifferentHost ? { master: options, slaves: [{ ...options, host: reader }] } : undefined
    const dirname = __dirname
    const entitiesUrl = path.join(dirname, '..', 'libs', 'db', 'entities', '**', '*')
    const migrationsUrl = path.join(dirname, '..', 'libs', 'db', 'migrations', '**', '*')

    return {
      type: 'mysql',
      charset: 'utf8mb4_general_ci',
      ...options,
      synchronize,
      extra,
      replication,
      entities: [ entitiesUrl ],
      migrations: [ migrationsUrl ],
    }
  }
}
