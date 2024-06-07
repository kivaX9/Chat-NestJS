import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ClientsModules } from './utils/ClientsModules'

@Module({
  imports: [ClientsModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
