import { Controller, Get } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ManageService } from '../services/manage.service'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'

@ApiTags('Manage metrics')
@Controller('manage/metrics')
export class ManageController {
  constructor(private manageService: ManageService) {}

  @Get('')
  @ApiOperation({ summary: 'Returns a list of metrics' })
  // @ApiOkResponse({ description: 'List of all metrics', type: ListManageRequestDataResponse })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getListedMetrics(): Promise<any> {
    return this.manageService.pushMany(
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

  // @Get('/last')
  // @ApiOperation({ summary: 'Returns a list of metrics' })
  // // @ApiOkResponse({ description: 'List of all metrics', type: ListManageRequestDataResponse })
  // @ApiBadRequestResponse({ description: 'Bad request' })
  // pushManyMetrics(): Promise<any> {
  //   return this.manageService.getLastPush()
  // }
}
