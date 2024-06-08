import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

import { UsersMicroservice } from 'src/utils/ClientsModules/UsersMicroservices'

@Module({
  imports: [UsersMicroservice],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
