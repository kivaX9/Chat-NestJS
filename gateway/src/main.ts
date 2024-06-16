import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

const configService = new ConfigService()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Настройка swagger
  const config = new DocumentBuilder()
    .setTitle('Chat-NestJS')
    .setDescription('Мини-приложение "чат" на NestJS')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Chat-NestJS API',
  })

  // Настройка корс
  app.enableCors({
    origin: configService.get<string>('FRONTEND_DOMAIN'),
    methods: '*',
  })

  await app.listen(3000)
}
bootstrap()
