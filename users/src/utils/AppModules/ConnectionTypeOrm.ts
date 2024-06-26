import { type DynamicModule } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/typeorm/entities/User.entity'

export const ConnectionTypeOrm: DynamicModule[] = [
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: 'postgreSQL',
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE'),
      entities: [__dirname + '/../../typeorm/entities/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
  }),
]
