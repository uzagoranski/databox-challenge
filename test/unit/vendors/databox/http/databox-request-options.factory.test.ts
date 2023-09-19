import { DataboxRequestOptionsFactory } from '../../../../../src/vendors/databox/http/databox-request-options.factory'
import { DataboxHttpConfig } from '../../../../../src/vendors/databox/interfaces/databox-config.interface'
import { DATABOX_HTTP_MODULE_OPTIONS } from '../../../../__mocks__/databox-request-options.factory.mock'
import { DATABOX_HTTP_CONFIG } from '../../../../__mocks__/databox.service.mock'

describe('DataboxRequestOptionsFactory', () => {
  const databoxHttpConfig: DataboxHttpConfig = DATABOX_HTTP_CONFIG

  let databoxRequestOptionsFactory: DataboxRequestOptionsFactory

  beforeEach(() => {
    databoxRequestOptionsFactory = new DataboxRequestOptionsFactory(databoxHttpConfig)
  })

  describe('buildUrl', () => {
    test('should be called with no path parameter', async () => {
      const result = databoxRequestOptionsFactory.buildUrl()

      expect(result).toStrictEqual('https://push.databox.com')
    })

    test('should be called with random path parameter', async () => {
      const path = 'random'

      const result = databoxRequestOptionsFactory.buildUrl(path)

      expect(result).toStrictEqual(`https://push.databox.com/random`)
    })
  })

  describe('createFormRequestOptions', () => {
    test('should return expected form request options', async () => {
      const result = databoxRequestOptionsFactory.createFormRequestOptions()

      expect(result).toStrictEqual(DATABOX_HTTP_MODULE_OPTIONS)
    })
  })
})
