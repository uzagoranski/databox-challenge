import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RequestDataDB } from '../entities/request-data-db.entity'
import { AuthenticationDB } from '../entities/authentication-db.entity'

@Injectable()
export class DbFetchingService {
  constructor(
    @InjectRepository(RequestDataDB) private readonly requestDataRepository: Repository<RequestDataDB>,
    @InjectRepository(AuthenticationDB) private readonly authenticationRepository: Repository<AuthenticationDB>,
  ) {}

  getRequestDataById(id: string): Promise<RequestDataDB | undefined> {
    const query = this.requestDataRepository.createQueryBuilder('request_data')

    query.where('request_data.id = :id', { id })

    return query.getOne()
  }

  getAuthentication(): Promise<AuthenticationDB | undefined> {
    return this.authenticationRepository.createQueryBuilder('authentication').getOne()
  }
}
