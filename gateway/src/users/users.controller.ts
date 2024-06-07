import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'

import { UsersService } from './users.service'

import LoginUserDTO from 'src/users/dtos/LoginUser.dto'
import RegisterUserDTO from 'src/users/dtos/RegisterUser.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id)
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
