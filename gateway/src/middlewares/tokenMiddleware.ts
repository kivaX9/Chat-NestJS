import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { NextFunction, Request, Response } from 'express'

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Получил токен из headers
    const token = this.extractTokenFromHeader(req)

    //  Проверил на наличие токена
    if (!token) {
      return new UnauthorizedException()
    }

    try {
      // Проверка Jwt
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })

      // Добавил декодированный payload токена в объект запроса
      req['user'] = payload
      next()
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
