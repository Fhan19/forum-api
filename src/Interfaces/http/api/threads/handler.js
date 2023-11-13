const autoBind = require('auto-bind')

class ThreadsHandler {
  constructor ({ addThreadUseCase, getThreadUseCase }) {
    this._addThreadUseCase = addThreadUseCase
    this._getThreadUseCase = getThreadUseCase

    autoBind(this)
  }

  async postThreadHandler (request, h) {
    const { title, body: content } = request.payload
    const { id: owner } = request.auth.credentials
    const newThread = {
      owner, title, content
    }

    const addedThread = await this._addThreadUseCase.execute(newThread)

    const response = h.response({
      status: 'success',
      data: {
        addedThread
      }
    })
    response.code(201)
    return response
  }

  async getThreadByIdHandler (request, h) {
    const { threadId } = request.params

    const thread = await this._getThreadUseCase.execute(threadId)

    const response = h.response({
      status: 'success',
      data: {
        thread
      }
    })
    response.code(200)
    return response
  }
}

module.exports = ThreadsHandler
