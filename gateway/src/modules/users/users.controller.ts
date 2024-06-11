import { Body, Controller, Get, Post, Req } from '@nestjs/common'

import { UsersService } from './users.service'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'

import type { Request } from 'express'

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('current')
  getCurrentUser(@Req() request: Request) {
    const jwtPayload = request['user']
    return this.usersService.getCurrentUser(jwtPayload)
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDTO) {
    return this.usersService.registerUser(registerUserDto)
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDTO) {
    return this.usersService.loginUser(loginUserDto)
  }
}
