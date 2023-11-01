const DetailThread = require('../../../Domains/threads/entities/DetailThread')

class DetailThreadUseCase {
  constructor ({ commentRepository, replyRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._replyRepository = replyRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const thread = await this._threadRepository.getThreadById(useCasePayload)
    const comments = await this._commentRepository.getCommentsByThreadId(useCasePayload)
    const res = []

    for (const comment of comments) {
      res.push({
        ...comment,
        replies: await this._replyRepository.getRepliesByCommentId(comment.id)
      })
    }

    await Promise.all(res)
    return new DetailThread({ ...thread, comments: res })
  }
}

module.exports = DetailThreadUseCase
