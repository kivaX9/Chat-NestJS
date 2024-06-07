import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'

import { AppService } from './app.service'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getUser(id)
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDTO) {
    return this.appService.registerUser(registerUserDto)
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDTO) {
    return this.appService.loginUser(loginUserDto)
  }
}
