const autoBind = require('auto-bind')

class RepliesHandler {
  constructor ({ addReplyUseCase, deleteReplyUseCase }) {
    this._addReplyUseCase = addReplyUseCase
    this._deleteReplyUseCase = deleteReplyUseCase

    autoBind(this)
  }

  async postReplyHandler (request, h) {
    const { content } = request.payload
    const { id: owner } = request.auth.credentials
    const { threadId, commentId } = request.params
    const date = new Date().toISOString()

    const newReply = {
      owner, threadId, commentId, date, content
    }

    const addedReply = await this._addReplyUseCase.execute(newReply)

    const response = h.response({
      status: 'success',
      data: {
        addedReply
      }
    })
    response.code(201)
    return response
  }

  async deleteReplyHandler (request, h) {
    const { id: owner } = request.auth.credentials
    const { threadId, commentId, replyId } = request.params

    const deleteReply = {
      owner, replyId, commentId, threadId
    }

    await this._deleteReplyUseCase.execute(deleteReply)

    const response = h.response({
      status: 'success'
    })

    response.code(200)
    return response
  }
}

module.exports = RepliesHandler
