import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Comment } from 'src/typeorm/entities/Comment.entity'

import AddCommentDTO from './dtos/AddComment.dto'
import UpdateCommentDTO from './dtos/UpdateComment.dto'
import CreateResponse from './utils/CreateResponses'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    private createResponse: CreateResponse,
  ) {}

  async getAllComments(userId: number) {
    // Получение всех комментариев user
    const comments = await this.commentsRepository.findBy({ userId })

    //  Ответ
    return comments
  }

  async addComment(addCommentDto: AddCommentDTO) {
    const { userId, text } = addCommentDto

    //  Создание комментария
    const newComment = this.commentsRepository.create({ userId, text })

    //  Сохранения комментария
    const savedComment = await this.commentsRepository.save(newComment)

    //  Ответ
    if (savedComment) this.createResponse.create('Comment created')
  }

  async updateComment(updateCommentDto: UpdateCommentDTO) {
    const { id, text } = updateCommentDto

    // Обновление комментария
    const updateComment = await this.commentsRepository.update({ id }, { text })

    //  Ответ
    if (updateComment) this.createResponse.ok('Comment update')
  }

  async deleteComment(id: number) {
    // Удаление комментария
    const deleteComment = await this.commentsRepository.delete(id)

    //  Ответ
    if (deleteComment) this.createResponse.ok('Comment delete')
  }
}
