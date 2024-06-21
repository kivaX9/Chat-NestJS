import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common'
import CreateHttpResponse from './utils/CreateHttpResponse'

const configService = new ConfigService()

async function bootstrap(): Promise<void> {
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

  // Настройка валидации
  app.useGlobalPipes(
    new ValidationPipe({
      // Ошибка, если объект содержит свойства, не определённые в DTO
      forbidNonWhitelisted: true,
      // Преобразует входные данные в типы, определенные в DTO
      transform: true,
      // Автоматически возвращает ошибки валидации с кодом 400
      exceptionFactory: (errors): HttpException => {
        const message = errors
          .map(({ constraints }) => constraints)
          .flatMap((obj) => Object.values(obj))
          .join(', ')
        return new CreateHttpResponse(message, HttpStatus.BAD_REQUEST)
      },
    }),
  )

  await app.listen(3000)
}
bootstrap()
