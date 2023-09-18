import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RequestDataEntity } from '../entities/request-data.entity'
import { AuthenticationEntity } from '../entities/authentication.entity'

@Injectable()
export class DbWritingService {
  constructor(
    @InjectRepository(RequestDataEntity) private readonly requestDataRepository: Repository<RequestDataEntity>,
    @InjectRepository(AuthenticationEntity) private readonly authenticationRepository: Repository<AuthenticationEntity>,
  ) {}

  saveRequestData(requestData: Partial<RequestDataEntity>): Promise<RequestDataEntity> {
    return this.requestDataRepository.save(requestData)
  }

  async saveAuthentication(authentication: Partial<AuthenticationEntity>): Promise<AuthenticationEntity> {
    await this.authenticationRepository.clear()

    return this.authenticationRepository.save(authentication)
  }
}
