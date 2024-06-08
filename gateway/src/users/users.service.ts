import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import LoginUserDTO from './dtos/LoginUser.dto'
import RegisterUserDTO from './dtos/RegisterUser.dto'
import JwtPayloadDTO from './dtos/JwtPayload.dto'

@Injectable()
export class UsersService {
  constructor(@Inject('CHAT-USERS') private readonly ChatUsers: ClientProxy) {}

  getCurrentUser(jwtPayload: JwtPayloadDTO) {
    return jwtPayload.user
  }

  registerUser(registerUserDto: RegisterUserDTO) {
    return this.ChatUsers.send({ cmd: 'REGISTER_USER' }, registerUserDto)
  }

  loginUser(loginUserDto: LoginUserDTO) {
    return this.ChatUsers.send({ cmd: 'LOGIN_USER' }, loginUserDto)
  }
}
