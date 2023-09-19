import { ServiceProvider } from '../../src/shared/enums/service-provider.enum'
import { ManageRequestDataFilteringResponse } from '../../src/modules/manage/responses/manage-request-data-filtering.response'
import { ManageRequestDataFilteringType } from '../../src/modules/manage/enums/manage-request-data-filtering-type.enum'
import { RequestDataEntity } from '../../src/libs/db/entities/request-data.entity'
import { ListManageRequestDataResponse } from '../../src/modules/manage/responses/list-manage-request-data.response'
import { GetMetrics } from '../../src/shared/interfaces/get-metrics.interface'
import { Pagination } from '../../src/libs/db/interfaces/pagination.interface'
import { ManageRequestDataResponse } from '../../src/modules/manage/responses/manage-request-data.response'

export const MANAGE_REQUEST_DATA_ENTITY: RequestDataEntity = {
  id: '942cc87b-5a75-4824-828a-9712723e89d2',
  serviceProvider: ServiceProvider.GITHUB,
  timeOfSending: new Date('2022-03-21 07:56:20.114966'),
  metricsSent: [{ key: 'GitHub_commits_since_yesterday', value: 5 }],
  numberOfKPIsSent: 1,
  successfulRequest: true,
  errorMessage: undefined,
}

export const PAGINATED_REQUEST_DATA: Pagination<RequestDataEntity[]> = {
  items: [ MANAGE_REQUEST_DATA_ENTITY ],
  page: 2,
  limit: 48,
  total: 1,
}

export const MANAGE_REQUEST_DATA_FILTERING_RESPONSE: ManageRequestDataFilteringResponse[] = [
  {
    id: ManageRequestDataFilteringType.ID,
    name: 'Database identifier',
  },
  {
    id: ManageRequestDataFilteringType.SERVICE_PROVIDER,
    name: 'Request service provider',
    selected: {
      id: undefined,
      numberOfKPIsSent: undefined,
      successfulRequest: undefined,
      serviceProvider: ServiceProvider.GITHUB,
    },
  },
  {
    id: ManageRequestDataFilteringType.NUMBER_OF_KPIS_SENT,
    name: 'Number of KPIs sent via the request',
  },
  {
    id: ManageRequestDataFilteringType.SUCCESSFUL_REQUEST,
    name: 'Request status (success)',
  },
]

export const LIST_MANAGE_REQUEST_DATA_RESPONSE: ListManageRequestDataResponse = {
  items: [
    {
      id: '942cc87b-5a75-4824-828a-9712723e89d2',
      service_provider: ServiceProvider.GITHUB,
      time_of_sending: '2022-03-21T06:56:20.114Z',
      metrics_sent: [{ key: 'GitHub_commits_since_yesterday', value: 5 }],
      number_of_KPIs_sent: 1,
      successful_request: true,
      error_message: undefined,
    },
  ],
  page: 2,
  limit: 48,
  total: 1,
  filtering: MANAGE_REQUEST_DATA_FILTERING_RESPONSE,
}

export const GET_METRICS: GetMetrics = {
  serviceProvider: ServiceProvider.GITHUB,
  metrics: [
    {
      key: 'GitHub_commits_since_yesterday',
      value: 5,
    },
  ],
}

export const MANAGE_REQUEST_DATA_RESPONSE: ManageRequestDataResponse[] = [{
  id: '942cc87b-5a75-4824-828a-9712723e89d2',
  service_provider: ServiceProvider.GITHUB,
  time_of_sending: '2022-03-21T06:56:20.114Z',
  metrics_sent: [{ key: 'GitHub_commits_since_yesterday', value: 5 }],
  number_of_KPIs_sent: 1,
  successful_request: true,
  error_message: undefined,
}]
