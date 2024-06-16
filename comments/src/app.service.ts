import { Inject, Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Comment } from 'src/typeorm/entities/Comment.entity'

import CreateResponse from './utils/CreateResponses'

import AddCommentDTO from './dtos/AddComment.dto'
import UpdateCommentDTO from './dtos/UpdateComment.dto'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @Inject(CreateResponse) private createResponse: CreateResponse,
  ) {}

  async getAllComments(userId: string) {
    // Получение всех комментариев user
    const comments = await this.commentsRepository.findBy({ userId })

    //  Ответ
    return comments
  }

  async getAllMyComments(userId: string) {
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
    if (savedComment) return this.createResponse.create('Comment created')
  }

  async updateComment(updateCommentDto: UpdateCommentDTO) {
    const { id, text } = updateCommentDto

    // Обновление комментария
    const updateComment = await this.commentsRepository.update({ id }, { text })

    //  Ответ
    if (updateComment) return this.createResponse.ok('Comment update')
  }

  async deleteComment(id: string) {
    const comment = await this.commentsRepository.findOneBy({ id })

    // Проверка на наличие такого комментария
    if (!comment) return this.createResponse.badRequest('No such comment')

    // Удаление комментария
    const DeleteResult = await this.commentsRepository.delete(id)

    //  Ответ
    if (DeleteResult) return this.createResponse.ok('Comment delete')
  }
}
