const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const DeleteCommentUseCase = require('../DeleteCommentUseCase')

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123'
    }
    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()

    mockCommentRepository.verifyCommentOwner = jest.fn(() => Promise.resolve())
    mockCommentRepository.deleteComment = jest.fn(() => Promise.resolve())
    mockThreadRepository.verifyThreadExists = jest.fn(() => Promise.resolve())

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    })

    // Action
    await deleteCommentUseCase.execute(useCasePayload)

    // Assert
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(useCasePayload.commentId, useCasePayload.owner)
    expect(mockThreadRepository.verifyThreadExists).toBeCalledWith(useCasePayload.threadId)
    expect(mockCommentRepository.deleteComment).toBeCalledWith(useCasePayload.commentId)
  })
})
