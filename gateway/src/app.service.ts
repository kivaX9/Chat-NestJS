import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'

@Injectable()
export class AppService {
  constructor(@Inject('CHAT-USERS') private readonly ChatUsers: ClientProxy) {}

  getUser(id: number) {
    return this.ChatUsers.send({ cmd: 'GET_USER' }, id)
  }

  registerUser(registerUserDto: RegisterUserDTO) {
    return this.ChatUsers.send({ cmd: 'REGISTER_USER' }, registerUserDto)
  }

  loginUser(loginUserDto: LoginUserDTO) {
    return this.ChatUsers.send({ cmd: 'LOGIN_USER' }, loginUserDto)
  }
}
