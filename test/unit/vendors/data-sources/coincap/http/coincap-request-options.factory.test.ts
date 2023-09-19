import { CoinCapHttpConfig } from '../../../../../../src/vendors/data-sources/coincap/interfaces/coincap-config.interface'
import { CoinCapRequestOptionsFactory } from '../../../../../../src/vendors/data-sources/coincap/http/coincap-request-options.factory'
import { CoinCapChain } from '../../../../../../src/vendors/data-sources/coincap/enums/coincap-chain.enum'
import { COINCAP_HTTP_CONFIG } from '../../../../../__mocks__/coincap-request-options.factory.mock'

describe('CoinCapRequestOptionsFactory', () => {
  const coinCapHttpConfig: CoinCapHttpConfig = COINCAP_HTTP_CONFIG

  let capRequestOptionsFactory: CoinCapRequestOptionsFactory

  beforeEach(() => {
    capRequestOptionsFactory = new CoinCapRequestOptionsFactory(coinCapHttpConfig)
  })

  describe('buildUrl', () => {
    test('should be called with Bitcoin path parameter', async () => {
      const result = capRequestOptionsFactory.buildUrl(CoinCapChain.BITCOIN)

      expect(result).toStrictEqual(`https://api.coincap.io/v2/assets/${CoinCapChain.BITCOIN}`)
    })

    test('should be called with Ethereum path parameter', async () => {
      const result = capRequestOptionsFactory.buildUrl(CoinCapChain.ETHEREUM)

      expect(result).toStrictEqual(`https://api.coincap.io/v2/assets/${CoinCapChain.ETHEREUM}`)
    })

    test('should be called with Cardano path parameter', async () => {
      const result = capRequestOptionsFactory.buildUrl(CoinCapChain.CARDANO)

      expect(result).toStrictEqual(`https://api.coincap.io/v2/assets/${CoinCapChain.CARDANO}`)
    })
  })
})
