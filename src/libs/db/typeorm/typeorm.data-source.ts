import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'
import { TypeOrmConfig } from '../../../config/typeorm.config'

config()

const configService = new ConfigService()
const typeOrmConfig = new TypeOrmConfig(configService)
const typeOrmOptions = typeOrmConfig.createTypeOrmOptions()

export default new DataSource(typeOrmOptions)
