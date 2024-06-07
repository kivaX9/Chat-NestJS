import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

import { UsersMicroservices } from 'src/utils/ClientsModules/UsersMicroservices'

@Module({
  imports: [UsersMicroservices],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
