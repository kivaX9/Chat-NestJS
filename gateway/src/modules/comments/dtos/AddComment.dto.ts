import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export default class AddCommentDTO {
  @ApiProperty({ example: 'Hello', description: 'Сообщение' })
  @IsNotEmpty()
  text: string
}
