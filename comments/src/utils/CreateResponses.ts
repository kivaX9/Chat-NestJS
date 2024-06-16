import { HttpException, HttpStatus } from '@nestjs/common'

export default class CreateResponse {
  ok(message: string) {
    return new HttpException(message, HttpStatus.OK)
  }

  create(message: string) {
    return new HttpException(message, HttpStatus.CREATED)
  }

  badRequest(message: string) {
    return new HttpException(message, HttpStatus.BAD_REQUEST)
  }
}
