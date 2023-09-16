import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { from, map, Observable } from 'rxjs'
import { RequestDataDB } from '../entities/request-data-db.entity'
import { ListingSorting } from '../interfaces/listing-sorting.interface'
import { ListingFiltering } from '../interfaces/listing-filtering.interface'
import { Pagination } from '../interfaces/pagination.interface'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'

@Injectable()
export class DbListingService {
  constructor(
    @InjectRepository(RequestDataDB) private readonly requestDataRepository: Repository<RequestDataDB>,
  ) {}

  getListedRequestData(sorting: ListingSorting, filtering: ListingFiltering, limit = 10, offset = 0): Observable<Pagination<RequestDataDB[]>> {
    const query = this.requestDataRepository.createQueryBuilder('requestData')

    this.applyLimits(query, limit, offset)
    this.applySorting(query, sorting)
    this.applyFiltering(query, filtering)

    return from(query.getManyAndCount()).pipe(
      map(([ tokens, total ]: [RequestDataDB[], number]) => ({
        limit,
        total,
        page: offset + 1,
        items: tokens,
      })),
    )
  }

  private applyLimits(query: SelectQueryBuilder<RequestDataDB>, limit: number, offset: number): void {
    query.take(limit)
    query.skip(offset * limit)
  }

  private applySorting(query: SelectQueryBuilder<RequestDataDB>, sorting: ListingSorting): void {
    query.orderBy(`request_data.${sorting.by}`, sorting.dir)
  }

  private applyFiltering(query: SelectQueryBuilder<RequestDataDB>, filtering: ListingFiltering): void {
    this.applyIdFilter(query, filtering.id)
    this.applyServiceProviderFilter(query, filtering.serviceProvider)
    this.applyTimeOfSendingFilter(query, filtering.timeOfSending)
    this.applyNumberOfKPIsFilter(query, filtering.numberOfKPIsSent)
    this.applySuccessfulRequestFilter(query, filtering.successfulRequest)
  }

  private applyIdFilter(query: SelectQueryBuilder<RequestDataDB>, value?: string): void {
    value && query.andWhere('request_data.id like :id', { id: `%${value}%` })
  }

  private applyServiceProviderFilter(query: SelectQueryBuilder<RequestDataDB>, value?: ServiceProvider): void {
    value && query.andWhere('request_data.serviceProvider like :serviceProvider', { serviceProvider: `%${value}%` })
  }

  private applyTimeOfSendingFilter(query: SelectQueryBuilder<RequestDataDB>, value?: string): void {
    value && query.andWhere('request_data.timeOfSending like :timeOfSending', { timeOfSending: `%${value}%` })
  }

  private applyNumberOfKPIsFilter(query: SelectQueryBuilder<RequestDataDB>, value?: number): void {
    value && query.andWhere('request_data.numberOfKPIsSent = :numberOfKPIsSent', { numberOfKPIsSent: value })
  }

  private applySuccessfulRequestFilter(query: SelectQueryBuilder<RequestDataDB>, value?: boolean): void {
    value && query.andWhere('request_data.successfulRequest = :successfulRequest', { successfulRequest: value })
  }
}
