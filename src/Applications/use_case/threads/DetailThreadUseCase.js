const DetailThread = require('../../../Domains/threads/entities/DetailThread')

class DetailThreadUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const thread = await this._threadRepository.getThreadById(useCasePayload)
    const comments = await this._commentRepository.getCommentsByThreadId(useCasePayload)
    const res = []

    await Promise.all(res)
    return new DetailThread({ ...thread, comments })
  }
}

module.exports = DetailThreadUseCase
