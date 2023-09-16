/* eslint-disable import/no-extraneous-dependencies */
import { DataSourceOptions } from 'typeorm'
import { runSeeders, SeederOptions } from 'typeorm-extension'
import { RequestDataFactory } from './factories/request-data.factory'
import typeormSeedConfig from '../../../config/typeorm-seed.config'
import { MainSeeder } from './main.seeder'

typeormSeedConfig.setOptions({
  ...typeormSeedConfig.options,
  factories: [ RequestDataFactory ],
  seeds: [ MainSeeder ],
} as DataSourceOptions & SeederOptions)

// eslint-disable-next-line no-void
void typeormSeedConfig.initialize().then(async () => {
  await typeormSeedConfig.synchronize(true)
  await runSeeders(typeormSeedConfig)
  process.exit()
})
