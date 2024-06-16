import { Request } from 'express'
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'

import { ConfigService } from '@nestjs/config'

// AuthGuard - это guard, который проверяет авторизацию пользователя

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Получил запрос
      const request = context.switchToHttp().getRequest<Request>()

      // Получил токен из headers
      const token = this.extractTokenFromHeader(request)

      // Проверка Jwt
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })

      // Добавил декодированный payload токена в объект запроса
      request['user'] = payload
      return true
    } catch (err) {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers.authorization
    if (!authorization) {
      return undefined
    }
    const [type, token] = authorization.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
