import { of } from 'rxjs'
import { Mock } from 'ts-mockery'
import { HttpService } from '@nestjs/axios'
import { DataboxRequestOptionsFactory } from '../../../../../src/vendors/databox/http/databox-request-options.factory'
import { DataboxService } from '../../../../../src/vendors/databox/services/databox.service'
import {
  DATABOX_HTTP_CONFIG,
  DATABOX_METRICS_ARRAY,
  DATABOX_PUSH_MULTIPLE_METRICS_ERRONEOUS_RESPONSE,
  DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE,
  DATABOX_REQUEST_METRICS_ARRAY,
} from '../../../../__mocks__/databox.service.mock'
import { DATABOX_HTTP_MODULE_OPTIONS, DATABOX_HTTP_MODULE_OPTIONS_NO_AUTH } from '../../../../__mocks__/databox-request-options.factory.mock'

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
    buildUrl.mockReturnValue(DATABOX_HTTP_CONFIG.baseUrl)

    test('should be called using expected params and return expected response', async () => {
      post.mockReturnValue(of({ data: DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE }))
      createFormRequestOptions.mockReturnValue(DATABOX_HTTP_MODULE_OPTIONS)

      const result = await databoxService.pushMultipleMetrics(DATABOX_METRICS_ARRAY)

      expect(post).toHaveBeenCalledWith(DATABOX_HTTP_CONFIG.baseUrl, { data: DATABOX_REQUEST_METRICS_ARRAY }, DATABOX_HTTP_MODULE_OPTIONS)

      expect(result).toEqual(DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE)
    })

    test('should be called using no authentication and return erroneous response', async () => {
      post.mockImplementation(() => {
        throw new Error(DATABOX_PUSH_MULTIPLE_METRICS_ERRONEOUS_RESPONSE.message)
      })
      createFormRequestOptions.mockReturnValue(DATABOX_HTTP_MODULE_OPTIONS_NO_AUTH)

      try {
        await databoxService.pushMultipleMetrics(DATABOX_METRICS_ARRAY)
      } catch (e) {
        expect(post).toHaveBeenCalledWith(DATABOX_HTTP_CONFIG.baseUrl, { data: DATABOX_REQUEST_METRICS_ARRAY }, DATABOX_HTTP_MODULE_OPTIONS_NO_AUTH)

        return expect(post).toThrowError()
      }
    })
  })
})
