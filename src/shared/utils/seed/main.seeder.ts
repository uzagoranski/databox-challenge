/* eslint-disable import/no-extraneous-dependencies */
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { RequestDataDB } from '../../../libs/db/entities/request-data-db.entity'

export class MainSeeder implements Seeder {
  public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const requestData = factoryManager.get(RequestDataDB)

    await requestData.saveMany(10)
  }
}
