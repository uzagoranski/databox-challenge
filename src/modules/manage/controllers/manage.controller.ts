import { Controller, Get, Post } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator'
import { ManageService } from '../services/manage.service'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { CoinCapChain } from '../../../vendors/coincap/enums/coincap-chain.enum'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'

@ApiTags('Manage metrics')
@Controller('manage/metrics')
export class ManageController {
  constructor(private manageService: ManageService) {}

  @Get('')
  @ApiOperation({ summary: 'Returns a list of metrics' })
  // @ApiOkResponse({ description: 'List of all metrics', type: ListManageRequestDataResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getListedMetrics(): Promise<any> {
    return this.manageService.pushMultipleMetrics(
      [
        {
          key: 'Test_metric',
          value: 321,
        },
        {
          key: 'Test_metric',
          value: 322,
        },
      ],
      ServiceProvider.GITHUB,
    )
  }

  @Post('/coinCap')
  @ApiOperation({ summary: 'Stores chain metrics, fetched from CoinCap API' })
  @ApiOkResponse({ description: 'Mapped data response, stored in the db', type: ManageRequestDataResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async fetchAndStoreCoinCapData(): Promise<any> {
    const metrics = await this.manageService.fetchChainDataMetrics(
      // More chains can be easily added
      [
        CoinCapChain.BITCOIN, CoinCapChain.ETHEREUM, CoinCapChain.CARDANO,
      ],
    )

    return this.manageService.pushMultipleMetrics(metrics, ServiceProvider.COINCAP)
  }

  @Post('/gitHub')
  @ApiOperation({ summary: 'Stores GitHub metrics, fetched from GitHub API' })
  @ApiOkResponse({ description: 'Mapped data response, stored in the db', type: ManageRequestDataResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async fetchAndStoreGitHubData(): Promise<any> {
    const metrics = await this.manageService.fetchChainDataMetrics(
      // More chains can be easily added
      [
        CoinCapChain.BITCOIN, CoinCapChain.ETHEREUM, CoinCapChain.CARDANO,
      ],
    )

    return this.manageService.pushMultipleMetrics(metrics, ServiceProvider.COINCAP)
  }
}
