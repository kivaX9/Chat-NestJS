import { Body, Controller, Get, Post, Req } from '@nestjs/common'

import { UsersService } from './users.service'

import LoginUserDTO from 'src/users/dtos/LoginUser.dto'
import RegisterUserDTO from 'src/users/dtos/RegisterUser.dto'

@Controller('users')
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
