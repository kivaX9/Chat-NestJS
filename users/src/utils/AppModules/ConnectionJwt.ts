import { type DynamicModule } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

export const ConnectionJwt: DynamicModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<number>('ACCESS_TOKEN_EXPIRES'),
    },
  }),
})
