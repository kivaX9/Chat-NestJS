import { HttpException, HttpStatus } from '@nestjs/common'

export default class CreateResponse {
  ok(message: string): HttpException {
    return new HttpException(message, HttpStatus.OK)
  }

  badRequest(message: string): HttpException {
    return new HttpException(message, HttpStatus.BAD_REQUEST)
  }
}
