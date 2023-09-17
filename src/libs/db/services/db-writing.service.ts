import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RequestDataDB } from '../entities/request-data-db.entity'
import { AuthenticationDB } from '../entities/authentication-db.entity'

@Injectable()
export class DbWritingService {
  constructor(
    @InjectRepository(RequestDataDB) private readonly requestDataRepository: Repository<RequestDataDB>,
    @InjectRepository(AuthenticationDB) private readonly authenticationRepository: Repository<AuthenticationDB>,
  ) {}

  saveRequestData(requestData: Partial<RequestDataDB>): Promise<RequestDataDB> {
    return this.requestDataRepository.save(requestData)
  }

  async saveAuthentication(authentication: Partial<AuthenticationDB>): Promise<AuthenticationDB> {
    await this.authenticationRepository.clear()

    return this.authenticationRepository.save(authentication)
  }
}
