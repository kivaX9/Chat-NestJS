import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { User } from './typeorm/entities/User.entity'
import { Repository } from 'typeorm'

import RegisterUserDTO from './dtos/RegisterUser.dto'
import LoginUserDTO from './dtos/LoginUser.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async getUser(id: number) {
    // Найти user по id
    const user = await this.userRepository.findOneBy({ id })
    return { ...user, password: undefined }
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    const { username, password, email } = registerUserDto

    // Проверка наличия пользователя с таким же ником и почтой
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    })
    if (existingUser) {
      return new HttpException('Such a user exists', HttpStatus.BAD_REQUEST)
    }

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
    if (savedUser) return new HttpException('User created', HttpStatus.CREATED)
  }

  async loginUser(loginUserDto: LoginUserDTO) {
    const { username, password } = loginUserDto
    const user = await this.userRepository.findOneBy({ username })

    // Проверка пароля
    const { password: passwordHash } = user
    const isComparePassword = await bcrypt.compare(password, passwordHash)
    if (!isComparePassword) {
      return new UnauthorizedException()
    }

    // Генерация токена
    const { id } = user
    const payload = { sub: id, username }
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
