const AddReplyUseCase = require('../../../../Applications/use_case/replies/AddReplyUseCase')
const DeleteReplyUseCase = require('../../../../Applications/use_case/replies/DeleteReplyUseCase')
const autoBind = require('auto-bind')

class RepliesHandler {
  constructor (container) {
    this._container = container

    autoBind(this)
  }

  async postReplyHandler (request, h) {
    const { body: content } = request.payload
    const { id: owner } = request.auth.credentials
    const { threadId, commentId } = request.params

    const newReply = {
      owner, threadId, commentId, content
    }

    const addReplyUseCase = await this._container.getInstance(AddReplyUseCase.name)

    const addedReply = await addReplyUseCase.execute(newReply)

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

    const deleteReplyUseCase = await this._container.getInstance(DeleteReplyUseCase.name)

    await deleteReplyUseCase.execute(deleteReply)

    const response = h.response({
      status: 'success'
    })

    response.code(200)
    return response
  }
}

module.exports = RepliesHandler
