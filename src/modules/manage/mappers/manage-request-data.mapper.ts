import { RequestDataEntity } from '../../../libs/db/entities/request-data.entity'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'
import { ManageRequestDataFilteringResponse } from '../responses/manage-request-data-filtering.response'
import { ListingFiltering } from '../../../libs/db/interfaces/listing-filtering.interface'
import { ManageRequestDataFilteringType } from '../enums/manage-request-data-filtering-type.enum'

export class ManageRequestDataMapper {
  static mapRequestDataDbToManageRequestDataResponse(requestData: RequestDataEntity): ManageRequestDataResponse {
    return {
      id: requestData.id,
      service_provider: requestData.serviceProvider,
      time_of_sending: requestData.timeOfSending.toISOString(),
      metrics_sent: requestData.metricsSent,
      number_of_KPIs_sent: requestData.numberOfKPIsSent,
      successful_request: requestData.successfulRequest,
      error_message: requestData.errorMessage || undefined,
    }
  }

  static mapFilteringToManageRequestDataFilteringResponse(currentFiltering: ListingFiltering): ManageRequestDataFilteringResponse[] {
    const options: ManageRequestDataFilteringResponse[] = [
      {
        id: ManageRequestDataFilteringType.ID,
        name: 'Database identifier',
      },
      {
        id: ManageRequestDataFilteringType.SERVICE_PROVIDER,
        name: 'Request service provider',
      },
      {
        id: ManageRequestDataFilteringType.TIME_OF_SENDING,
        name: 'Time of sending the request',
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

    return options.map((option) => (currentFiltering[option.id] ? { id: option.id, name: option.name, selected: currentFiltering } : { id: option.id, name: option.name }))
  }
}
