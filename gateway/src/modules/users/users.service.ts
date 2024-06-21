import { Observable } from 'rxjs'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import LoginUserDTO from './dtos/LoginUser.dto'
import RegisterUserDTO from './dtos/RegisterUser.dto'
import UserDTO from './dtos/User.dto'
import HttpResponse from 'src/types/HttpResponse'

@Injectable()
export class UsersService {
  constructor(@Inject('CHAT-USERS') private readonly ChatUsers: ClientProxy) {}

  // Зарегистрировать пользователя
  registerUser(
    registerUserDto: RegisterUserDTO,
  ): Observable<HttpResponse | Error> {
    return this.ChatUsers.send({ cmd: 'REGISTER_USER' }, registerUserDto)
  }

  // Авторизировать пользователя
  loginUser(
    loginUserDto: LoginUserDTO,
  ): Observable<UserDTO | HttpResponse | Error> {
    return this.ChatUsers.send({ cmd: 'LOGIN_USER' }, loginUserDto)
  }
}
