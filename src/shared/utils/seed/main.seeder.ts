/* eslint-disable import/no-extraneous-dependencies */
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { RequestDataEntity } from '../../../libs/db/entities/request-data.entity'

export class MainSeeder implements Seeder {
  public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const requestData = factoryManager.get(RequestDataEntity)

    await requestData.saveMany(10)
  }
}
