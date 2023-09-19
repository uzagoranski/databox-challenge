import { Controller, Get, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator'
import { ManageService } from '../services/manage.service'
import { ListingParamsDto } from '../dtos/listing-params.dto'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'
import { ListManageRequestDataResponse } from '../responses/list-manage-request-data.response'

@ApiTags('Manage metrics')
@Controller('manage/metrics')
export class ManageController {
  constructor(private manageService: ManageService) {}

  @Get('')
  @ApiOperation({ summary: 'Returns a list of request' })
  @ApiOkResponse({ description: 'List of all metrics', type: ListManageRequestDataResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getListedMetrics(@Query() params: ListingParamsDto): Promise<ListManageRequestDataResponse> {
    return this.manageService.getMetrics(params)
  }

  @Get('/sync')
  @ApiOperation({ summary: 'Fetches metrics from all providers (such as GitHub, CoinCap etc.)' })
  @ApiOkResponse({ description: 'Mapped data response, stored in the db', type: Array<ManageRequestDataResponse> })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async fetchAndStoreMetricsForAllVendors(): Promise<ManageRequestDataResponse[]> {
    return this.manageService.fetchAndStoreMetricsForAllVendors()
  }
}
