import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RequestDataDB } from '@libs/db/entities/request-data-db.entity'

@Injectable()
export class DbWritingService {
  constructor(
    @InjectRepository(RequestDataDB) private readonly requestDataRepository: Repository<RequestDataDB>,
  ) {}

  saveRequestData(requestData: Partial<RequestDataDB>): Promise<RequestDataDB> {
    return this.requestDataRepository.save(requestData)
  }
}
