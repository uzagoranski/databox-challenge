import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RequestDataDB } from '@libs/db/entities/request-data-db.entity'

@Injectable()
export class DbFetchingService {
  constructor(
    @InjectRepository(RequestDataDB) private readonly requestDataRepository: Repository<RequestDataDB>,
  ) {}

  getRequestDataById(id: string): Promise<RequestDataDB | undefined> {
    const query = this.requestDataRepository.createQueryBuilder('request_data')

    query.where('request_data.id = :id', { id })

    return query.getOne()
  }
}
