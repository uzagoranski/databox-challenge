import { Controller, Get, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator'
import { Res } from '@nestjs/common/decorators/http/route-params.decorator'
import { Response } from 'express'
import { ManageService } from '../services/manage.service'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'
import { ListingParamsDto } from '../dtos/listing-params.dto'
import { CoinCapChain } from '../../../vendors/coincap/enums/coincap-chain.enum'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'
import { ListManageRequestDataResponse } from '../responses/list-manage-request-data.response'

@ApiTags('Manage metrics')
@Controller('manage/metrics')
export class ManageController {
  constructor(private manageService: ManageService) {}

  @Get('')
  @ApiOperation({ summary: 'Returns a list of metrics' })
  @ApiOkResponse({ description: 'List of all metrics', type: ListManageRequestDataResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getListedMetrics(@Query() params: ListingParamsDto): Promise<ListManageRequestDataResponse> {
    return this.manageService.getMetrics(params)
  }

  @Get('/CoinCap')
  @ApiOperation({ summary: 'Stores chain metrics, fetched from CoinCap API' })
  @ApiOkResponse({ description: 'Mapped data response, stored in the db', type: ManageRequestDataResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async fetchAndStoreCoinCapData(): Promise<ManageRequestDataResponse> {
    // We'll first fetch the metrics from CoinCap API
    // More chains can be easily added by updating CoinCapChain enum
    const metrics = await this.manageService.fetchChainDataMetrics(Object.values(CoinCapChain))

    // Then, we'll push them into Databox API, store the request/response data in our local database and return a mapped value
    return this.manageService.pushMultipleMetrics(metrics, ServiceProvider.COINCAP)
  }

  @Get('/GitHub')
  @ApiOperation({ summary: 'Stores GitHub metrics, fetched from GitHub API' })
  @ApiOkResponse({ description: 'Mapped data response, stored in the db', type: ManageRequestDataResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async fetchAndStoreGitHubData(@Res() response: Response, @Query('code') code?: string): Promise<ManageRequestDataResponse> {
    // We'll first fetch the metrics from GitHub API
    const metrics = await this.manageService.fetchGitHubMetrics(response, code)

    // Then, we'll push them into Databox API, store the request/response data in our local database and return a mapped value
    const mappedData = await this.manageService.pushMultipleMetrics(metrics, ServiceProvider.GITHUB)

    // To complete the request, we have to manually send the response back as we're using
    // the @Res() annotation which interferes with the regular NestJS response handler
    response.status(200).send(mappedData)

    return mappedData
  }
}
