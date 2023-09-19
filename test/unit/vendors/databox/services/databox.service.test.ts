import { of } from 'rxjs'
import { Mock } from 'ts-mockery'
import { HttpService } from '@nestjs/axios'
import { DataboxRequestOptionsFactory } from '../../../../../src/vendors/databox/http/databox-request-options.factory'
import { DataboxService } from '../../../../../src/vendors/databox/services/databox.service'
import { DATABOX_HTTP_CONFIG, DATABOX_METRICS_ARRAY, DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE, DATABOX_REQUEST_METRICS_ARRAY } from '../../../../__mocks__/databox.service.mock'
import { HTTP_MODULE_OPTIONS } from '../../../../__mocks__/databox-request-options.factory.mock'

describe('DataboxService', () => {
  const post = jest.fn()
  const buildUrl = jest.fn()
  const createFormRequestOptions = jest.fn()
  const httpService = Mock.of<HttpService>({ post })
  const databoxRequestOptionsFactory = Mock.of<DataboxRequestOptionsFactory>({ buildUrl, createFormRequestOptions })

  let databoxService: DataboxService

  beforeEach(() => {
    databoxService = new DataboxService(httpService, databoxRequestOptionsFactory)
  })

  describe('pushMultipleMetrics', () => {
    test('should be called using expected params and return expected response', async () => {
      buildUrl.mockReturnValue(DATABOX_HTTP_CONFIG.baseUrl)
      post.mockReturnValue(of({ data: DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE }))
      createFormRequestOptions.mockReturnValue(HTTP_MODULE_OPTIONS)

      const result = await databoxService.pushMultipleMetrics(DATABOX_METRICS_ARRAY)

      expect(post).toHaveBeenCalledWith(DATABOX_HTTP_CONFIG.baseUrl, { data: DATABOX_REQUEST_METRICS_ARRAY }, HTTP_MODULE_OPTIONS)

      expect(result).toEqual(DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE)
    })
  })
})
