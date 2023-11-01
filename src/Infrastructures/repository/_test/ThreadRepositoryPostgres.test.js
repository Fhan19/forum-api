const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const ThreadRepository = require('../../../Domains/replies/ThreadRepository')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const NewThread = require('../../../Domains/threads/entities/NewThread')
const Thread = require('../../../Domains/threads/entities/Thread')
const pool = require('../../database/postgres/pool')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')

describe('ThreadRepositoryPostgres', () => {
  it('should be instance of CommentRepository domain', () => {
    const replyRepositoryPostgres = new ThreadRepositoryPostgres({}, {})

    expect(replyRepositoryPostgres).toBeInstanceOf(ThreadRepository)
  })

  describe('behavior test', () => {
    afterEach(async () => {
      await UsersTableTestHelper.cleanTable()
      await ThreadsTableTestHelper.cleanTable()
    })

    afterAll(async () => {
      await pool.end()
    })

    describe('addThread function', () => {
      it('should persist new thread and return added thread correctly', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ username: 'dicoding' })
        const newThread = new NewThread({
          title: 'sebuah thread',
          content: 'bagaimana mungkin',
          owner: 'user-123'
        })
        const fakeIdGenerator = () => '123'
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

        // Action
        await threadRepositoryPostgres.addThread(newThread)

        // Assert
        const thread = await ThreadsTableTestHelper.findThreadById('thread-123')
        expect(thread).toHaveLength(1)
      })

      it('should return added thread correctly', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ username: 'dicoding' })
        const newThread = new NewThread({
          title: 'sebuah thread',
          content: 'bagaimana mungkin',
          owner: 'user-123'
        })
        const fakeIdGenerator = () => '123'
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

        // Action
        const addedThread = await threadRepositoryPostgres.addThread(newThread)

        // Assert
        expect(addedThread).toStrictEqual(new AddedThread({
          id: 'thread-123',
          title: newThread.title,
          owner: newThread.owner
        }))
      })
    })

    describe('verifyThreadExists function', () => {
      it('should throw NotFoundError when thread not exists', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

        // Action & Assert
        await expect(threadRepositoryPostgres.verifyThreadExists('xxxx')).rejects.toThrowError(NotFoundError)
      })

      it('should not throw NotFoundError when thread exists', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ username: 'dicoding' })
        await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' })
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

        // Action & Assert
        await expect(threadRepositoryPostgres.verifyThreadExists('thread-123')).resolves.not.toThrowError(NotFoundError)
      })
    })

    describe('getThreadById function', () => {
      it('should throw NotFoundError when thread not exists', async () => {
        // Arrange
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

        // Action & Assert
        await expect(threadRepositoryPostgres.getThreadById('xxxx')).rejects.toThrowError(NotFoundError)
      })

      it('should not throw NotFoundError when thread exists', async () => {
        // Arrange
        const date = new Date().toISOString()
        await UsersTableTestHelper.addUser({ username: 'dicoding' })
        await ThreadsTableTestHelper.addThread({ date, title: 'sebuah thread' })
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

        // Action & Assert
        const thread = await threadRepositoryPostgres.getThreadById('thread-123')
        await expect(threadRepositoryPostgres.getThreadById('thread-123')).resolves.not.toThrowError(NotFoundError)
        expect(thread).toEqual(new Thread({
          id: 'thread-123',
          title: 'sebuah thread',
          content: 'bagaimana mungkin',
          date,
          username: 'dicoding'
        }))
      })
    })
  })
})
