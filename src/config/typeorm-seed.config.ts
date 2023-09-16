import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '..', '..', '.env'), debug: true })

const entitiesUrl = path.join(__dirname, '..', 'libs', 'db', 'entities', '**', '*')
const migrationsUrl = path.join(__dirname, '..', 'libs', 'db', 'migrations', '**', '*')

const dbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  charset: 'utf8mb4_general_ci',
  host: process.env.TYPEORM_HOST ?? 'localhost',
  port: parseInt(process.env.TYPEORM_PORT ?? '3306', 10),
  database: process.env.TYPEORM_DATABASE ?? 'databox-challenge-db',
  username: process.env.TYPEORM_USERNAME ?? 'root',
  password: process.env.SECRET_TYPEORM_PASSWORD ?? 'secret',
  entities: [ entitiesUrl ],
  migrations: [ migrationsUrl ],
  dropSchema: true,
}

export default new DataSource(dbConfig)
