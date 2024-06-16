import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

import { UsersMicroservice } from 'src/utils/ClientsModules/UsersMicroservices'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [UsersMicroservice],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
