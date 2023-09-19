import { Mock } from 'ts-mockery'
import { ManageService } from '../../../../../src/modules/manage/services/manage.service'
import { ManageController } from '../../../../../src/modules/manage/controllers/manage.controller'
import { ListingParamsDto } from '../../../../../src/modules/manage/dtos/listing-params.dto'
import { ServiceProvider } from '../../../../../src/shared/enums/service-provider.enum'

describe('ManageController', () => {
  const getMetrics = jest.fn()
  const fetchAndStoreMetricsForAllVendors = jest.fn()

  const manageService = Mock.of<ManageService>({ getMetrics, fetchAndStoreMetricsForAllVendors })

  const manageController = new ManageController(manageService)

  describe('getListedMetrics', () => {
    test('should call getMetrics with no params', () => {
      manageController.getListedMetrics({})

      expect(getMetrics).toHaveBeenCalled()
    })

    test('should call getMetrics with params', () => {
      const params: ListingParamsDto = {
        page: 1,
        limit: 48,
        serviceProvider: ServiceProvider.GITHUB,
      }

      manageController.getListedMetrics(params)

      expect(getMetrics).toHaveBeenCalled()
    })
  })

  describe('fetchAndStoreMetricsForAllVendors', () => {
    test('should call fetchAndStoreMetricsForAllVendors', () => {
      manageController.fetchAndStoreMetricsForAllVendors()

      expect(fetchAndStoreMetricsForAllVendors).toHaveBeenCalled()
    })
  })
})
