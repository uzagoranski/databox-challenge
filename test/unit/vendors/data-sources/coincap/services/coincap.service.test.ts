import { of } from 'rxjs'
import { Mock } from 'ts-mockery'
import { HttpService } from '@nestjs/axios'
import { CoinCapService } from '../../../../../../src/vendors/data-sources/coincap/services/coincap.service'
import { CoinCapRequestOptionsFactory } from '../../../../../../src/vendors/data-sources/coincap/http/coincap-request-options.factory'
import { CoinCapChain } from '../../../../../../src/vendors/data-sources/coincap/enums/coincap-chain.enum'
import { COINCAP_CHAIN_RESPONSE } from '../../../../../__mocks__/coincap.service.mock'
import { COINCAP_HTTP_CONFIG } from '../../../../../__mocks__/coincap-request-options.factory.mock'

describe('CoinCapService', () => {
  const get = jest.fn()
  const buildUrl = jest.fn()
  const httpService = Mock.of<HttpService>({ get })
  const coinCapRequestOptionsFactory = Mock.of<CoinCapRequestOptionsFactory>({ buildUrl })

  let coinCapService: CoinCapService

  beforeEach(() => {
    coinCapService = new CoinCapService(httpService, coinCapRequestOptionsFactory)
  })

  describe('getChainData', () => {
    test('should be called using expected params and return expected response', async () => {
      buildUrl.mockReturnValue(COINCAP_HTTP_CONFIG)
      get.mockReturnValue(of(COINCAP_CHAIN_RESPONSE))

      const result = await coinCapService.getChainData(CoinCapChain.BITCOIN)

      expect(result).toEqual(COINCAP_CHAIN_RESPONSE.data)
    })
  })
})
