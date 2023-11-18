const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const AddThread = require('../../../Domains/threads/entities/AddThread')
const DetailThread = require('../../../Domains/threads/entities/DetailThread')
const pool = require('../../database/postgres/pool')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres')

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
        const addThread = new AddThread({
          title: 'sebuah thread',
          body: 'bagaimana mungkin',
          owner: 'user-123'
        })
        const fakeIdGenerator = () => '123'
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

        // Action
        await threadRepositoryPostgres.addThread(addThread)

        // Assert
        const thread = await ThreadsTableTestHelper.findThreadById('thread-123')
        expect(thread).toHaveLength(1)
        expect(thread[0].id).toEqual('thread-123')
        expect(thread[0].owner).toEqual('user-123')
        expect(thread[0].title).toEqual('sebuah thread')
        expect(thread[0].body).toEqual('bagaimana mungkin')
      })

      it('should return added thread correctly', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ username: 'dicoding' })
        const addThread = new AddThread({
          title: 'sebuah thread',
          body: 'bagaimana mungkin',
          owner: 'user-123'
        })
        const fakeIdGenerator = () => '123'
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

        // Action
        const addedThread = await threadRepositoryPostgres.addThread(addThread)

        // Assert
        expect(addedThread).toStrictEqual(new AddedThread({
          id: 'thread-123',
          title: addThread.title,
          owner: addThread.owner
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
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

        // Action & Assert
        const thread = await threadRepositoryPostgres.getThreadById('thread-123')
        const comments = await commentRepositoryPostgres.getCommentsByThreadId('thread-123')

        const detailThread = { ...thread, comments }

        await expect(threadRepositoryPostgres.getThreadById('thread-123')).resolves.not.toThrowError(NotFoundError)
        expect(detailThread).toEqual(new DetailThread({
          id: 'thread-123',
          username: 'dicoding',
          date,
          title: 'sebuah thread',
          body: 'bagaimana mungkin',
          comments: []
        }))
      })
    })
  })
})
