class DeleteCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    await this._threadRepository.verifyThreadExists(useCasePayload.threadId)
    await this._commentRepository.verifyCommentOwner(useCasePayload.commentId, useCasePayload.owner)
    await this._commentRepository.deleteComment(useCasePayload.commentId)
  }
}

module.exports = DeleteCommentUseCase
