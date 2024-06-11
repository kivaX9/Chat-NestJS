import { APP_GUARD } from '@nestjs/core'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersModule } from './modules/users/users.module'
import { CommentsModule } from './modules/comments/comments.module'

import { TokenMiddleware } from './middlewares/tokenMiddleware'

import { ConnectionConfig } from './utils/AppModules/ConnectionConfig'
import { ConnectionThrottler } from './utils/AppModules/ConnectionThrottler'

import { CustomThrottlerGuard } from './guards/CustomThrottlerGuard'

@Module({
  imports: [ConnectionConfig, UsersModule, CommentsModule, ConnectionThrottler],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        { path: 'api/users/register', method: RequestMethod.POST },
        { path: 'api/users/login', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
