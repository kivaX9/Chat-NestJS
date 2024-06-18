import type { Request } from 'express'
import { Observable } from 'rxjs'
import { HttpException, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import LoginUserDTO from './dtos/LoginUser.dto'
import RegisterUserDTO from './dtos/RegisterUser.dto'
import JwtPayloadDTO from './dtos/JwtPayload.dto'
import UserDTO from './dtos/User.dto'

@Injectable()
export class UsersService {
  constructor(@Inject('CHAT-USERS') private readonly ChatUsers: ClientProxy) {}

  // Получить текущего пользователя
  getCurrentUser(request: Request): UserDTO | Error {
    const jwtPayload: JwtPayloadDTO = request['user']
    return jwtPayload.user
  }

  // Зарегистрировать пользователя
  registerUser(
    registerUserDto: RegisterUserDTO,
  ): Observable<HttpException | Error> {
    return this.ChatUsers.send({ cmd: 'REGISTER_USER' }, registerUserDto)
  }

  // Авторизировать пользователя
  loginUser(loginUserDto: LoginUserDTO): Observable<UserDTO | Error> {
    return this.ChatUsers.send({ cmd: 'LOGIN_USER' }, loginUserDto)
  }
}
