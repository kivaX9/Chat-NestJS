import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConnectionConfig } from './utils/AppModules/ConnectionConfig'
import { ConnectionTypeOrm } from './utils/AppModules/ConnectionTypeOrm'
import CreateResponse from './utils/CreateResponses'

@Module({
  imports: [ConnectionConfig, ...ConnectionTypeOrm],
  controllers: [AppController],
  providers: [AppService, CreateResponse],
})
export class AppModule {}
