import { Body, Controller, Post } from '@nestjs/common'

import { AppService } from './app.service'

import RegisterUserDTO from './dtos/RegisterUser.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDTO) {
    return this.appService.registerUser(registerUserDto)
  }
}
