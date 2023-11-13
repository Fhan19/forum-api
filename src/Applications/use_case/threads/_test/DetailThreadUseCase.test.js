const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const ReplyRepository = require('../../../../Domains/replies/ReplyRepository')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const DetailThread = require('../../../../Domains/threads/entities/DetailThread')
const DetailThreadUseCase = require('../DetailThreadUseCase')

describe('AddThreadUseCase', () => {
  it('should orchestrating the detail thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123'
    }

    const mockReply = [{
      id: 'reply-123',
      username: 'haha',
      date: new Date().toISOString(),
      content: 'y'
    }]

    const mockComment = [{
      id: 'comment-123',
      username: 'hihi',
      date: new Date().toISOString(),
      content: 'lu sok asik',
      replies: [{ ...mockReply[0] }]
    }]

    const mockThread = new DetailThread({
      id: 'thread-123',
      username: 'haha',
      date: new Date().toISOString(),
      title: 'Sebuah Thread',
      content: 'Bagaimana Mungkin',
      comments: [{ ...mockComment[0] }]
    })

    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()
    const mockReplyRepository = new ReplyRepository()

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve({
      id: 'thread-123',
      username: 'haha',
      date: mockThread.date,
      title: 'Sebuah Thread',
      content: 'Bagaimana Mungkin'
    }))
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(mockComment))

    mockReplyRepository.getRepliesByCommentId = jest.fn(() => Promise.resolve([{
      id: 'reply-123',
      username: 'haha',
      date: mockReply[0].date,
      content: 'y'
    }]))

    const detailThreadUseCase = new DetailThreadUseCase({
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository
    })

    // Action
    const detailThread = await detailThreadUseCase.execute(useCasePayload)

    // Assert
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload)
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(useCasePayload)
    expect(mockReplyRepository.getRepliesByCommentId).toBeCalledWith(mockComment[0].id)
    expect(detailThread).toStrictEqual(mockThread)
  })
})
