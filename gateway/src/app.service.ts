import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import * as bcrypt from 'bcrypt'

import RegisterUserDTO from './dtos/RegisterUser.dto'

@Injectable()
export class AppService {
  constructor(@Inject('CHAT-USERS') private readonly ChatUsers: ClientProxy) {}

  async registerUser(registerUserDto: RegisterUserDTO) {
    const { password } = registerUserDto

    // Хеширование пароля
    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    return this.ChatUsers.send(
      { cmd: 'REGISTER_USER' },
      { ...registerUserDto, password: hash },
    )
  }
}
