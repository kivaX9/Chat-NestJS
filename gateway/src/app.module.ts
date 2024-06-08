import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersModule } from './modules/users/users.module'
import { CommentsModule } from './modules/comments/comments.module'

import { TokenMiddleware } from './middlewares/tokenMiddleware'

import { ConnectionConfig } from './utils/AppModules/ConnectionConfig'

@Module({
  imports: [ConnectionConfig, UsersModule, CommentsModule],
  providers: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        { path: 'users/register', method: RequestMethod.POST },
        { path: 'users/login', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
