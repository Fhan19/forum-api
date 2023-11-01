const CommentRepository = require('../../../../Domains/replies/ReplyRepository')
const ReplyRepository = require('../../../../Domains/replies/ReplyRepository')
const AddedReply = require('../../../../Domains/replies/entities/AddedReply')
const AddReply = require('../../../../Domains/replies/entities/AddReply')
const AddReplyUseCase = require('../AddReplyUseCase')

describe('AddReplyUseCase', () => {
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
      commentId: 'comment-123',
      date: new Date().toISOString(),
      content: 'di anime tidak begitu'
    }

    const mockAddedReply = new AddedReply({
      id: 'reply-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner
    })

    const mockCommentRepository = new CommentRepository()
    const mockReplyRepository = new ReplyRepository()

    mockCommentRepository.verifyCommentExists = jest.fn(() => Promise.resolve())
    mockReplyRepository.addReply = jest.fn(() => Promise.resolve(mockAddedReply))

    const addReplyUseCase = new AddReplyUseCase({
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository
    })

    // Action
    const addedReply = await addReplyUseCase.execute(useCasePayload)

    // Assert
    expect(mockCommentRepository.verifyCommentExists).toBeCalledWith(useCasePayload.commentId)
    expect(mockReplyRepository.addReply).toBeCalledWith(new AddReply({
      owner: useCasePayload.owner,
      commentId: useCasePayload.commentId,
      date: useCasePayload.date,
      content: useCasePayload.content
    }))
    expect(addedReply).toStrictEqual(new AddedReply({
      id: 'reply-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner
    }))
  })
})
