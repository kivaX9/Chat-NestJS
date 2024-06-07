import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { AppModules } from './utils/AppModules'

@Module({
  imports: [...AppModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
