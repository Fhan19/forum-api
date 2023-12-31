const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AddedComment = require('../../Domains/comments/entities/AddedComment')
const DetailComment = require('../../Domains/comments/entities/DetailComment')
const CommentRepository = require('../../Domains/comments/CommentRepository')

class CommentRepositoryPostgres extends CommentRepository {
  constructor (pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addComment (newComment) {
    const { threadId, content, owner } = newComment
    const id = `comment-${this._idGenerator()}`
    const date = new Date().toISOString()
    const isDelete = false

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, owner, thread_id, date, content, is_delete',
      values: [id, owner, threadId, date, content, isDelete]
    }

    const result = await this._pool.query(query)

    return new AddedComment(result.rows[0])
  }

  async deleteComment (id) {
    const query = {
      text: 'UPDATE comments SET is_delete = true WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) throw new NotFoundError('komentar tidak ditemukan')
  }

  async verifyCommentOwner (id, owner) {
    const query = {
      text: 'SELECT owner FROM comments WHERE is_delete = \'false\' AND id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) throw new NotFoundError('komen tidak ditemukan')

    const comment = result.rows[0]
    if (comment.owner !== owner) throw new AuthorizationError('bukan komentar anda')
  }

  async getCommentsByThreadId (threadId) {
    const query = {
      text: `SELECT comments.id, comments.date, comments.content, comments.is_delete, users.username
          FROM comments
          LEFT JOIN users ON comments.owner = users.id
          WHERE comments.thread_id = $1 GROUP BY comments.id, users.username ORDER BY comments.date ASC`,
      values: [threadId]
    }

    const results = await this._pool.query(query)

    return results.rows.map((result) => new DetailComment({ ...result }))
  }

  async verifyCommentExists (id) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) throw new NotFoundError('komentar tidak ditemukan')
  }
}

module.exports = CommentRepositoryPostgres
