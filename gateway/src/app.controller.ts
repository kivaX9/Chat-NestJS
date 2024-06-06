import { Body, Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createString(@Body() value: { value: string }) {
    return this.appService.createString(value)
  }
}
