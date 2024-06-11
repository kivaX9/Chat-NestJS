import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('USERS_HOST'),
        port: configService.get<number>('USERS_PORT'),
      },
    },
  )

  app.listen()
}
bootstrap()
