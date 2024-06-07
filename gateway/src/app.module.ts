import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersModule } from './users/users.module'

import { TokenMiddleware } from './middlewares/tokenMiddleware'

import { ConnectionConfig } from './utils/AppModules/ConnectionConfig'

@Module({
  imports: [UsersModule, ConnectionConfig],
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
