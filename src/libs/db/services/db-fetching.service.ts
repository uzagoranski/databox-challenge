import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RequestDataEntity } from '../entities/request-data.entity'
import { AuthenticationEntity } from '../entities/authentication.entity'

@Injectable()
export class DbFetchingService {
  constructor(
    @InjectRepository(RequestDataEntity) private readonly requestDataRepository: Repository<RequestDataEntity>,
    @InjectRepository(AuthenticationEntity) private readonly authenticationRepository: Repository<AuthenticationEntity>,
  ) {}

  getRequestDataById(id: string): Promise<RequestDataEntity | undefined> {
    const query = this.requestDataRepository.createQueryBuilder('request_data')

    query.where('request_data.id = :id', { id })

    return query.getOne()
  }

  getAuthentication(): Promise<AuthenticationEntity | undefined> {
    return this.authenticationRepository.createQueryBuilder('authentication').getOne()
  }
}
