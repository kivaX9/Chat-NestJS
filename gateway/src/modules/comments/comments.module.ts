import { Module } from '@nestjs/common'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

import { CommentsMicroservice } from 'src/utils/ClientsModules/CommentsMicroservices'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [CommentsMicroservice],
  controllers: [CommentsController],
  providers: [CommentsService, JwtService],
})
export class CommentsModule {}
