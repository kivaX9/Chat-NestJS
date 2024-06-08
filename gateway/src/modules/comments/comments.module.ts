import { Module } from '@nestjs/common'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

import { CommentsMicroservice } from 'src/utils/ClientsModules/CommentsMicroservices'

@Module({
  imports: [CommentsMicroservice],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
