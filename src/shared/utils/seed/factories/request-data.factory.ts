/* eslint-disable import/no-extraneous-dependencies */
import { Faker } from '@faker-js/faker'
import { setSeederFactory } from 'typeorm-extension'
import { RequestDataEntity } from '../../../../libs/db/entities/request-data.entity'
import { ServiceProvider } from '../../../enums/service-provider.enum'

export const RequestDataFactory = setSeederFactory(RequestDataEntity, (faker: Faker) => {
  const requestDataEntity = new RequestDataEntity()

  const numberOfMetrics = Math.floor(Math.random() * 5) + 1

  requestDataEntity.serviceProvider = faker.helpers.arrayElement(Object.values(ServiceProvider))
  requestDataEntity.timeOfSending = faker.date.anytime()
  requestDataEntity.metricsSent = []
  Array.from(Array(numberOfMetrics)).forEach(() => {
    requestDataEntity.metricsSent.push({
      key: faker.lorem.word(),
      value: faker.number.float({
        min: 0, max: 10000, precision: 1,
      }),
    })
  })
  requestDataEntity.numberOfKPIsSent = requestDataEntity.metricsSent.length
  requestDataEntity.successfulRequest = Math.random() < 0.5
  if (!requestDataEntity.successfulRequest) {
    requestDataEntity.errorMessage = faker.lorem.sentence({ min: 5, max: 10 })
  }

  return requestDataEntity
})
