const autoBind = require('auto-bind')

class CommentsHandler {
  constructor ({ addCommentUseCase, deleteCommentUseCase }) {
    this._addCommentUseCase = addCommentUseCase
    this._deleteCommentUseCase = deleteCommentUseCase

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

    const addedComment = await this._addCommentUseCase.execute(newComment)

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

    await this._deleteCommentUseCase.execute(deleteComment)

    const response = h.response({
      status: 'success'
    })

    response.code(200)
    return response
  }
}

module.exports = CommentsHandler
