const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase')
const DetailThreadUseCase = require('../../../../Applications/use_case/threads/DetailThreadUseCase')
const autoBind = require('auto-bind')

class ThreadsHandler {
  constructor (container) {
    this._container = container

    autoBind(this)
  }

  async postThreadHandler (request, h) {
    const { title, body } = request.payload
    const { id: owner } = request.auth.credentials
    const newThread = {
      owner, title, body
    }
    const addThreadUseCase = await this._container.getInstance(AddThreadUseCase.name)

    const addedThread = await addThreadUseCase.execute(newThread)

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

    const detailThreadUseCase = await this._container.getInstance(DetailThreadUseCase.name)
    const detailThread = await detailThreadUseCase.execute(threadId)

    const response = h.response({
      status: 'success',
      data: {
        thread: detailThread
      }
    })
    response.code(200)
    return response
  }
}

module.exports = ThreadsHandler
