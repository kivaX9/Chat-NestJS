import { Module, OnModuleInit } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConnectionJwt } from './utils/AppModules/ConnectionJwt'
import { ConnectionConfig } from './utils/AppModules/ConnectionConfig'
import { ConnectionTypeOrm } from './utils/AppModules/ConnectionTypeOrm'
import CreateResponse from './utils/CreateResponse'

@Module({
  imports: [ConnectionJwt, ConnectionConfig, ...ConnectionTypeOrm],
  controllers: [AppController],
  providers: [AppService, CreateResponse],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly usersService: AppService) {}

  async onModuleInit() {
    await this.usersService.createAdminUser()
  }
}
