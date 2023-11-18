const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const DetailThread = require('../../../../Domains/threads/entities/DetailThread')
const DetailThreadUseCase = require('../DetailThreadUseCase')

describe('AddThreadUseCase', () => {
  it('should orchestrating the detail thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123'
    }

    const mockComment = [{
      id: 'comment-123',
      username: 'hihi',
      date: new Date().toISOString(),
      content: 'lu sok asik'
    }]

    const mockThread = new DetailThread({
      id: 'thread-123',
      username: 'haha',
      date: new Date().toISOString(),
      title: 'Sebuah Thread',
      body: 'Bagaimana Mungkin',
      comments: [{ ...mockComment[0] }]
    })

    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve({
      id: 'thread-123',
      username: 'haha',
      date: mockThread.date,
      title: 'Sebuah Thread',
      body: 'Bagaimana Mungkin'
    }))
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(mockComment))

    const detailThreadUseCase = new DetailThreadUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    })

    // Action
    const detailThread = await detailThreadUseCase.execute(useCasePayload)

    // Assert
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload)
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(useCasePayload)
    expect(detailThread).toStrictEqual(mockThread)
  })
})
