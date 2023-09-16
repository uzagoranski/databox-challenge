import { RequestDataDB } from '../../../libs/db/entities/request-data-db.entity'
import { ManageRequestDataResponse } from '../responses/manage-request-data.response'

export class ManageRequestDataMapper {
  static mapRequestDataDbToManageRequestDataResponse(requestData: RequestDataDB): ManageRequestDataResponse {
    return {
      id: requestData.id,
      service_provider: requestData.serviceProvider,
      time_of_sending: requestData.timeOfSending,
      metrics_sent: requestData.metricsSent,
      number_of_KPIs_sent: requestData.numberOfKPIsSent,
      successful_request: requestData.successfulRequest,
      error_message: requestData.errorMessage || undefined,
    }
  }

  // static mapFilteringToManageTokenFilteringResponse(currentFiltering: ListingFiltering): ManageRequestDataResponse>[] {
  //   const options: ManageRequestDataFilteringResponse[] = [
  //     {
  //       id: ManageTokenFilteringType.ID,
  //       name: 'Token database identifier',
  //     },
  //     {
  //       id: ManageTokenFilteringType.NAME,
  //       name: 'Token name',
  //     },
  //     {
  //       id: ManageTokenFilteringType.CONTRACT_ADDRESS,
  //       name: 'Token contract address',
  //     },
  //     {
  //       id: ManageTokenFilteringType.TOKEN_ID,
  //       name: 'Token public identifier',
  //     },
  //     {
  //       id: ManageTokenFilteringType.BLOCKCHAIN,
  //       name: 'Token blockchain',
  //     },
  //     {
  //       id: ManageTokenFilteringType.TOKEN_URL,
  //       name: 'Token url',
  //     },
  //     {
  //       id: ManageTokenFilteringType.CATEGORY,
  //       name: 'Token category',
  //     },
  //     {
  //       id: ManageTokenFilteringType.VISIBLE,
  //       name: 'Visible',
  //     },
  //     {
  //       id: ManageTokenFilteringType.ACTIVE,
  //       name: 'Active',
  //     },
  //     {
  //       id: ManageTokenFilteringType.GOLDEN_TICKET,
  //       name: 'Golden ticket',
  //     },
  //     {
  //       id: ManageTokenFilteringType.CREATED_AT,
  //       name: 'Created at',
  //     },
  //     {
  //       id: ManageTokenFilteringType.CREATED_BY,
  //       name: 'Created by',
  //     },
  //     {
  //       id: ManageTokenFilteringType.UPDATED_AT,
  //       name: 'Updated at',
  //     },
  //     {
  //       id: ManageTokenFilteringType.UPDATED_BY,
  //       name: 'Updated by',
  //     },
  //   ]
  //
  //   return options.map((option) => (currentFiltering[option.id] ? { id: option.id, name: option.name, selected: currentFiltering } : { id: option.id, name: option.name }))
  // }
}
