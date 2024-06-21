import { Controller } from '@nestjs/common'

import { MessagePattern, Payload } from '@nestjs/microservices'

import { AppService } from './app.service'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'
import { UserDTO } from './dtos/User.dto'
import HttpResponse from './types/HttpResponse'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'REGISTER_USER' })
  registerUser(
    @Payload() registerUserDto: RegisterUserDTO,
  ): Promise<HttpResponse | Error> {
    return this.appService.registerUser(registerUserDto)
  }

  @MessagePattern({ cmd: 'LOGIN_USER' })
  loginUser(@Payload() loginUserDto: LoginUserDTO): Promise<UserDTO | Error> {
    return this.appService.loginUser(loginUserDto)
  }
}
