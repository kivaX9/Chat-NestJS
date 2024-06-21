import { HttpException, HttpStatus } from '@nestjs/common'
import HttpResponse from 'src/types/HttpResponse'

export default class CreateResponse {
  ok(message: string): HttpResponse {
    const response = new HttpException(message, HttpStatus.OK)
    return { status: response.getStatus(), message }
  }

  badRequest(message: string): HttpResponse {
    const response = new HttpException(message, HttpStatus.BAD_REQUEST)
    return { status: response.getStatus(), message }
  }
}
