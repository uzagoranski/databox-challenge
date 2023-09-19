import { of } from 'rxjs'
import { Mock } from 'ts-mockery'
import { ConfigService } from '@nestjs/config'
import {
  MANAGE_REQUEST_DATA_ENTITY,
  LIST_MANAGE_REQUEST_DATA_RESPONSE,
  DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE,
  GET_METRICS,
  PAGINATED_REQUEST_DATA, MANAGE_REQUEST_DATA_RESPONSE,
} from '../../../../__mocks__/manage.service.mock'
import { ServiceProvider } from '../../../../../src/shared/enums/service-provider.enum'
import { ListingParamsDto } from '../../../../../src/modules/manage/dtos/listing-params.dto'
import { ManageService } from '../../../../../src/modules/manage/services/manage.service'
import { DataSourceService } from '../../../../../src/vendors/data-sources/data-source.service.interface'
import { DataboxService } from '../../../../../src/vendors/databox/services/databox.service'
import { DbListingService } from '../../../../../src/libs/db/services/db-listing.service'
import { DbWritingService } from '../../../../../src/libs/db/services/db-writing.service'

describe('ManageService', () => {
  const get = jest.fn()
  const saveRequestData = jest.fn()
  const getListedRequestData = jest.fn()
  const getMetrics = jest.fn()
  const pushMultipleMetrics = jest.fn()
  const configService = Mock.of<ConfigService>({ get })
  const dbWritingService = Mock.of<DbWritingService>({ saveRequestData })
  const dbListingService = Mock.of<DbListingService>({ getListedRequestData })
  const databoxService = Mock.of<DataboxService>({ pushMultipleMetrics })
  const dataSourceService = Mock.of<DataSourceService>({ getMetrics })

  let manageService: ManageService

  beforeEach(() => {
    manageService = new ManageService(configService, dbWritingService, dbListingService, databoxService, [ dataSourceService ])
  })

  describe('getMetrics', () => {
    const params: ListingParamsDto = { limit: 48, page: 2, serviceProvider: ServiceProvider.GITHUB }

    test('should be called using expected params and return expected response', async () => {
      getListedRequestData.mockReturnValue(of(PAGINATED_REQUEST_DATA))

      const result = await manageService.getMetrics(params)

      expect(getListedRequestData).toHaveBeenCalledWith({ serviceProvider: ServiceProvider.GITHUB }, params.limit, params.page - 1)
      expect(result).toEqual(LIST_MANAGE_REQUEST_DATA_RESPONSE)
    })
  })

  describe('fetchAndStoreMetricsForAllVendors', () => {
    test('should be called using expected params and return expected response', async () => {
      getMetrics.mockReturnValue(GET_METRICS)
      pushMultipleMetrics.mockReturnValue(DATABOX_PUSH_MULTIPLE_METRICS_SUCCESS_RESPONSE)
      saveRequestData.mockReturnValue(MANAGE_REQUEST_DATA_ENTITY)

      const result = await manageService.fetchAndStoreMetricsForAllVendors()

      expect(result).toEqual(MANAGE_REQUEST_DATA_RESPONSE)
    })
  })
})
