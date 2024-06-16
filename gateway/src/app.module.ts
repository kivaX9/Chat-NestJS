import { Module } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'

import { UsersModule } from './modules/users/users.module'
import { CommentsModule } from './modules/comments/comments.module'

import { ConnectionConfig } from './utils/AppModules/ConnectionConfig'
import { ConnectionThrottler } from './utils/AppModules/ConnectionThrottler'

import { GuardsProviders } from './utils/AppModules/GuardsProviders'

@Module({
  imports: [ConnectionConfig, ConnectionThrottler, UsersModule, CommentsModule],
  providers: [...GuardsProviders, JwtService],
})
export class AppModule {}
