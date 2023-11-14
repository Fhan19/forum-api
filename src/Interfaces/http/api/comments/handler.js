const AddCommentUseCase = require('../../../../Applications/use_case/comments/AddCommentUseCase')
const DeleteCommentUseCase = require('../../../../Applications/use_case/comments/DeleteCommentUseCase')
const autoBind = require('auto-bind')

class CommentsHandler {
  constructor (container) {
    this._container = container

    autoBind(this)
  }

  async postCommentHandler (request, h) {
    const { content } = request.payload
    const { id: owner } = request.auth.credentials
    const { threadId } = request.params
    const date = new Date().toISOString()

    const newComment = {
      owner, threadId, date, content
    }

    const addCommentUseCase = await this._container.getInstance(AddCommentUseCase.name)

    const addedComment = await addCommentUseCase.execute(newComment)

    const response = h.response({
      status: 'success',
      data: {
        addedComment
      }
    })
    response.code(201)
    return response
  }

  async deleteCommentHandler (request, h) {
    const { id: owner } = request.auth.credentials
    const { threadId, commentId } = request.params

    const deleteComment = {
      commentId, threadId, owner
    }

    const deleteCommentUseCase = await this._container.getInstance(DeleteCommentUseCase.name)

    await deleteCommentUseCase.execute(deleteComment)

    const response = h.response({
      status: 'success'
    })

    response.code(200)
    return response
  }
}

module.exports = CommentsHandler
