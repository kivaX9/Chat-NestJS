import { Injectable, ExecutionContext } from '@nestjs/common'

import { ThrottlerGuard } from '@nestjs/throttler'

// CustomThrottlerGuard - это кастомный ThrottlerGuard,
// который устанавливает ограничение частоты запросов

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Извлекаем объект запроса из контекста выполнения
    const request = context.switchToHttp().getRequest()

    // Проверка на метод запроса GET (Если GET, то ThrottlerGuard применять не нужно)
    if (request.method === 'GET') {
      return true
    }

    // вызывается родительский метод canActivate из класса ThrottlerGuard
    return super.canActivate(context)
  }
}
