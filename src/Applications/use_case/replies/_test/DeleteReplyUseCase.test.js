const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const ReplyRepository = require('../../../../Domains/replies/ReplyRepository')
const DeleteReplyUseCase = require('../DeleteReplyUseCase')

describe('DeleteReplyUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      commentId: 'comment-123',
      replyId: 'reply-123',
      owner: 'user-123'
    }
    const mockCommentRepository = new CommentRepository()
    const mockReplyRepository = new ReplyRepository()

    mockReplyRepository.verifyReplyOwner = jest.fn(() => Promise.resolve())
    mockCommentRepository.verifyCommentExists = jest.fn(() => Promise.resolve())
    mockReplyRepository.deleteReply = jest.fn(() => Promise.resolve())

    const deleteReplyUseCase = new DeleteReplyUseCase({
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository
    })

    // Action
    await deleteReplyUseCase.execute(useCasePayload)

    // Assert
    expect(mockReplyRepository.verifyReplyOwner).toBeCalledWith(useCasePayload.replyId, useCasePayload.owner)
    expect(mockCommentRepository.verifyCommentExists).toBeCalledWith(useCasePayload.commentId)
    expect(mockReplyRepository.deleteReply).toBeCalledWith(useCasePayload.replyId)
  })
})
