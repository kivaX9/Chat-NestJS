import { IsNotEmpty, MinLength } from 'class-validator'

export default class LoginUserDTO {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @MinLength(5)
  password: string
}
