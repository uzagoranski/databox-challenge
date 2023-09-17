/* eslint-disable import/no-extraneous-dependencies */
import { Faker } from '@faker-js/faker'
import { setSeederFactory } from 'typeorm-extension'
import { RequestDataDB } from '../../../../libs/db/entities/request-data-db.entity'
import { ServiceProvider } from '../../../enums/service-provider.enum'

export const RequestDataFactory = setSeederFactory(RequestDataDB, (faker: Faker) => {
  const requestDataDB = new RequestDataDB()

  const numberOfMetrics = Math.floor(Math.random() * 5) + 1

  requestDataDB.serviceProvider = faker.helpers.arrayElement(Object.values(ServiceProvider))
  requestDataDB.timeOfSending = faker.date.anytime().toISOString()
  requestDataDB.metricsSent = []
  Array.from(Array(numberOfMetrics)).forEach(() => {
    requestDataDB.metricsSent.push({
      key: faker.lorem.word(),
      value: faker.number.float({
        min: 0, max: 10000, precision: 1,
      }),
    })
  })
  requestDataDB.numberOfKPIsSent = requestDataDB.metricsSent.length
  requestDataDB.successfulRequest = Math.random() < 0.5
  if (!requestDataDB.successfulRequest) {
    requestDataDB.errorMessage = faker.lorem.sentence({ min: 5, max: 10 })
  }

  return requestDataDB
})
