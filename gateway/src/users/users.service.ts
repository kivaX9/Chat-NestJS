import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import LoginUserDTO from 'src/users/dtos/LoginUser.dto'
import RegisterUserDTO from 'src/users/dtos/RegisterUser.dto'

@Injectable()
export class UsersService {
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
