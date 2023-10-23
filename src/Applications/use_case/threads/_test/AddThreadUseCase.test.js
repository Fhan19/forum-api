const AddThread = require('../../../../Domains/threads/entities/AddThread')
const AddedThread = require('../../../../Domains/threads/entities/AddedThread')
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository')
const AddThreadUseCase = require('../AddThreadUseCase')

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'sebuah thread',
      body: 'bagaimana mungkin',
      owner: 'user-123'
    }

    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner
    })

    const mockThreadRepository = new ThreadRepository()

    mockThreadRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread))

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository
    })

    // Action
    const addedThread = await getThreadUseCase.execute(useCasePayload)

    // Assert
    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner
    }))

    expect(mockThreadRepository.addUser).toBeCalledWith(new AddThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner
    }))
  })
})