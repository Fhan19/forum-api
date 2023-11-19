const NotFoundError = require('../../../../Commons/exceptions/NotFoundError')
const CommentRepository = require('../../../../Domains/comments/CommentRepository')
const AddedComment = require('../../../../Domains/comments/entities/AddedComment')
const AddComment = require('../../../../Domains/comments/entities/AddComment')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const AddCommentUseCase = require('../AddCommentUseCase')

describe('AddCommentUseCase', () => {
  it('should throw error when thread not exists', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
      threadId: 'thread-xxx',
      date: new Date().toISOString(),
      content: 'wkwkwkwk'
    }

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner
    })

    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()

    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(mockAddedComment))
    mockThreadRepository.verifyThreadExists = jest.fn(() => Promise.reject(new NotFoundError()))

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    })

    // Action & Assert
    await expect(() => addCommentUseCase.execute(useCasePayload))
      .rejects.toThrowError(NotFoundError)
    expect(mockThreadRepository.verifyThreadExists).toBeCalledWith('thread-xxx')
    expect(mockCommentRepository.addComment).not.toBeCalled()
  })

  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
      threadId: 'thread-xxx',
      date: new Date().toISOString(),
      content: 'wkwkwkwk'
    }

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner
    })

    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()

    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(mockAddedComment))
    mockThreadRepository.verifyThreadExists = jest.fn(() => Promise.resolve())

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    })

    // Action
    const addedComment = await addCommentUseCase.execute(useCasePayload)

    // Assert
    expect(addedComment).toStrictEqual(new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner
    }))
    expect(mockThreadRepository.verifyThreadExists).toBeCalledWith(useCasePayload.threadId)
    expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
      owner: useCasePayload.owner,
      threadId: useCasePayload.threadId,
      date: useCasePayload.date,
      content: useCasePayload.content
    }))
  })
})
