import { HttpException, HttpStatus } from '@nestjs/common'

// CreateHttpResponse -  кастомный класс http ошибок

export default class CreateHttpResponse extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super({ status, message }, status)
  }
}
