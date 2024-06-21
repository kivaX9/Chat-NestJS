import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export default class UpdateCommentDTO {
  @ApiProperty({ example: 'Hello 1', description: 'Обновленное Сообщение' })
  @IsNotEmpty()
  text: string
}
