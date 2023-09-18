import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { from, map, Observable } from 'rxjs'
import { RequestDataEntity } from '../entities/request-data.entity'
import { ListingFiltering } from '../interfaces/listing-filtering.interface'
import { Pagination } from '../interfaces/pagination.interface'
import { ServiceProvider } from '../../../shared/enums/service-provider.enum'

@Injectable()
export class DbListingService {
  constructor(
    @InjectRepository(RequestDataEntity) private readonly requestDataRepository: Repository<RequestDataEntity>,
  ) {}

  getListedRequestData(filtering: ListingFiltering, limit = 10, offset = 0): Observable<Pagination<RequestDataEntity[]>> {
    const query = this.requestDataRepository.createQueryBuilder('request_data')

    this.applyLimits(query, limit, offset)
    this.applyFiltering(query, filtering)

    return from(query.getManyAndCount()).pipe(
      map(([ tokens, total ]: [RequestDataEntity[], number]) => ({
        limit,
        total,
        page: offset + 1,
        items: tokens,
      })),
    )
  }

  private applyLimits(query: SelectQueryBuilder<RequestDataEntity>, limit: number, offset: number): void {
    query.take(limit)
    query.skip(offset * limit)
  }

  private applyFiltering(query: SelectQueryBuilder<RequestDataEntity>, filtering: ListingFiltering): void {
    this.applyIdFilter(query, filtering.id)
    this.applyServiceProviderFilter(query, filtering.serviceProvider)
    this.applyNumberOfKPIsFilter(query, filtering.numberOfKPIsSent)
    this.applySuccessfulRequestFilter(query, filtering.successfulRequest)
  }

  private applyIdFilter(query: SelectQueryBuilder<RequestDataEntity>, value?: string): void {
    value && query.andWhere('request_data.id like :id', { id: `%${value}%` })
  }

  private applyServiceProviderFilter(query: SelectQueryBuilder<RequestDataEntity>, value?: ServiceProvider): void {
    value && query.andWhere('request_data.serviceProvider like :serviceProvider', { serviceProvider: `%${value}%` })
  }

  private applyNumberOfKPIsFilter(query: SelectQueryBuilder<RequestDataEntity>, value?: number): void {
    value && query.andWhere('request_data.numberOfKPIsSent = :numberOfKPIsSent', { numberOfKPIsSent: value })
  }

  private applySuccessfulRequestFilter(query: SelectQueryBuilder<RequestDataEntity>, value?: boolean): void {
    value && query.andWhere('request_data.successfulRequest = :successfulRequest', { successfulRequest: value })
  }
}
