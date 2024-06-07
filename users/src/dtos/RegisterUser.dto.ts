import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export default class RegisterUserDTO {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @MinLength(5)
  password: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}
