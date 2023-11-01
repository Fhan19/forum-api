class DeleteReplyUseCase {
  constructor ({ commentRepository, replyRepository }) {
    this._commentRepository = commentRepository
    this._replyRepository = replyRepository
  }

  async execute (useCasePayload) {
    await this._replyRepository.verifyReplyOwner(useCasePayload.replyId, useCasePayload.owner)
    await this._commentRepository.verifyCommentExists(useCasePayload.commentId)
    await this._replyRepository.deleteReply(useCasePayload.replyId)
  }
}

module.exports = DeleteReplyUseCase
