import { HttpException, Inject, Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Comment } from 'src/typeorm/entities/Comment.entity'

import CreateResponse from './utils/CreateResponses'

import { UserRole } from './types/enums/UserRole.enum'

import AddCommentDTO from './dtos/AddComment.dto'
import UpdateCommentDTO from './dtos/UpdateComment.dto'
import DeleteCommentDTO from './dtos/DeleteComment.dto'
import { CommentDTO } from './dtos/Comment.dto'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @Inject(CreateResponse) private createResponse: CreateResponse,
  ) {}

  async getAllComments(userId: string): Promise<CommentDTO[] | Error> {
    // Получение всех комментариев user
    const comments = await this.commentsRepository.findBy({ userId })

    //  Ответ
    return comments
  }

  async addComment(addCommentDto: AddCommentDTO): Promise<CommentDTO | Error> {
    const { userId, text } = addCommentDto

    //  Создание комментария
    const newComment = this.commentsRepository.create({ userId, text })

    //  Сохранения комментария
    const savedComment = await this.commentsRepository.save(newComment)

    //  Ответ
    return savedComment
  }

  async updateComment(
    updateCommentDto: UpdateCommentDTO,
  ): Promise<HttpException | Error> {
    const { id, userId, role, text } = updateCommentDto
    const comment = await this.commentsRepository.findOneBy({ id })

    // Проверка на наличие такого комментария
    // Если не АДМИН, то ->
    // Проверка на принадлежность пользователю
    if (!comment || (comment.userId !== userId && role !== UserRole.ADMIN))
      return this.createResponse.badRequest('No such comment')

    // Обновление комментария
    const updateComment = await this.commentsRepository.update({ id }, { text })

    //  Ответ
    if (updateComment) return this.createResponse.ok('Comment update')
  }

  async deleteComment(
    deleteCommentDto: DeleteCommentDTO,
  ): Promise<HttpException | Error> {
    const { id, userId, role } = deleteCommentDto
    const comment = await this.commentsRepository.findOneBy({ id })

    // Проверка на наличие такого комментария
    // Если не АДМИН, то ->
    // Проверка на принадлежность пользователю
    if (!comment || (comment.userId !== userId && role !== UserRole.ADMIN))
      return this.createResponse.badRequest('No such comment')

    // Удаление комментария
    const DeleteResult = await this.commentsRepository.delete(id)

    //  Ответ
    if (DeleteResult) return this.createResponse.ok('Comment delete')
  }
}
