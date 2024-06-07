import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './typeorm/entities/User.entity'
import { Repository } from 'typeorm'

import RegisterUserDTO from './dtos/RegisterUser.dto'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(id: number) {
    // Возврат user по id
    return await this.userRepository.findOneBy({ id })
  }

  async registerUser(registerUserDto: RegisterUserDTO) {
    // Деструктурищация
    const { username, password, email } = registerUserDto

    // Проверка наличия пользователя с таким же ником и почтой
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    })
    if (existingUser) {
      return new HttpException('Such a user exists', HttpStatus.BAD_REQUEST)
    }

    // Создание нового user
    const newUser = this.userRepository.create({
      username,
      password,
      email,
    })

    // Сохранение нового user
    const savedUser = await this.userRepository.save(newUser)

    // Ответ
    if (savedUser) return new HttpException('User created', HttpStatus.CREATED)
  }
}
