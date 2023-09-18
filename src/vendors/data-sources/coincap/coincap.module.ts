import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import coinCapHttpConfig from './http/coincap-http.config'
import { CoinCapService } from './services/coincap.service'
import { CoinCapRequestOptionsFactory } from './http/coincap-request-options.factory'

@Module({
  imports: [ ConfigModule.forFeature(coinCapHttpConfig), HttpModule ],
  providers: [ CoinCapService, CoinCapRequestOptionsFactory ],
  exports: [ CoinCapService, CoinCapRequestOptionsFactory ],
})
export class CoinCapModule {}
