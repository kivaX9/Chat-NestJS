import { HttpException, HttpStatus } from '@nestjs/common'

export default class CreateResponse {
  create(message: string): HttpException {
    return new HttpException(message, HttpStatus.CREATED)
  }

  badRequest(message: string): HttpException {
    return new HttpException(message, HttpStatus.BAD_REQUEST)
  }
}
