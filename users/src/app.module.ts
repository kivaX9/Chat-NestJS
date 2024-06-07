import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConnectionJwt } from './utils/AppModules/ConnectionJwt'
import { ConnectionConfig } from './utils/AppModules/ConnectionConfig'
import { ConnectionTypeOrm } from './utils/AppModules/ConnectionTypeOrm'

@Module({
  imports: [ConnectionJwt, ConnectionConfig, ...ConnectionTypeOrm],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
