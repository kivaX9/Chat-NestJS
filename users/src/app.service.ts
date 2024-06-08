import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import * as bcrypt from 'bcrypt'

import { User } from './typeorm/entities/User.entity'
import { Repository } from 'typeorm'

import CreateResponse from './utils/CreateResponse'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
    private createResponse: CreateResponse,
  ) {}

  async registerUser(registerUserDto: RegisterUserDTO) {
    const { username, password, email } = registerUserDto

    // Проверка наличия пользователя с таким же ником и почтой
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    })
    if (existingUser) this.createResponse.badRequest('Such a user exists')

    // Хеширование пароля
    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    // Создание нового user
    const newUser = this.userRepository.create({
      username,
      password: hash,
      email,
    })

    // Сохранение нового user
    const savedUser = await this.userRepository.save(newUser)

    // Ответ
    if (savedUser) this.createResponse.create('User created')
  }

  async loginUser(loginUserDto: LoginUserDTO) {
    const { username, password } = loginUserDto
    const user = await this.userRepository.findOneBy({ username })

    // Проверка пароля
    const { password: passwordHash, ...userWithoutPassword } = user
    const isComparePassword = await bcrypt.compare(password, passwordHash)
    if (!isComparePassword) {
      return new UnauthorizedException()
    }

    // Генерация токена
    const payload = { sub: user.id, user: userWithoutPassword }
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES'),
    })

    // Ответ
    return {
      ...user,
      password: undefined,
      token,
    }
  }
}
