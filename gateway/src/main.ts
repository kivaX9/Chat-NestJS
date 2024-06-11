import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Настройка корс
  app.enableCors({
    origin: configService.get<string>('FRONTEND_DOMAIN'),
    methods: '*',
  })

  await app.listen(3000)
}
bootstrap()
