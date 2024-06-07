import { Controller, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { AppService } from './app.service'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'GET_USER' })
  getUser(@Payload() id: number) {
    return this.appService.getUser(id)
  }

  @MessagePattern({ cmd: 'REGISTER_USER' })
  @UsePipes(new ValidationPipe())
  registerUser(@Payload() registerUserDto: RegisterUserDTO) {
    return this.appService.registerUser(registerUserDto)
  }

  @MessagePattern({ cmd: 'LOGIN_USER' })
  loginUser(@Payload() loginUserDto: LoginUserDTO) {
    return this.appService.loginUser(loginUserDto)
  }
}
