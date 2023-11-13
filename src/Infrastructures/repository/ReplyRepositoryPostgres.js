const InvariantError = require('../../Commons/exceptions/InvariantError')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')
const AddedReply = require('../../Domains/replies/entities/AddedReply')
const DetailReply = require('../../Domains/replies/entities/DetailReply')
const ReplyRepository = require('../../Domains/replies/ReplyRepository')

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor (pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addReply (reply) {
    const {
      owner, commentId, content
    } = reply
    const id = `reply-${this._idGenerator()}`
    const date = new Date().toISOString()

    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
      values: [id, owner, commentId, date, content, false]
    }

    const result = await this._pool.query(query)

    return new AddedReply({ ...result.rows[0] })
  }

  async verifyReplyExist (reply) {
    const { replyId, owner, commentId } = reply
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1 AND comment_id = $2',
      values: [replyId, commentId]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('tidak ada balasan')
    }

    if (result.rows[0].owner !== owner) {
      throw new AuthorizationError('Anda tidak dapat menghapus balasan ini')
    }

    if (result.rows[0].is_delete === true) {
      throw new InvariantError('balasan telah dihapus')
    }
  }

  async deleteReply (replyId) {
    const query = {
      text: 'UPDATE replies SET is_delete = true WHERE id = $1',
      values: [replyId]
    }

    await this._pool.query(query)
  }

  async getRepliesByCommentId (commentId) {
    const query = {
      text: `SELECT replies.id , users.username, replies.date, replies.content, replies.is_delete AS "isDelete"
      FROM replies 
      INNER JOIN users ON replies.owner = users.id 
      WHERE replies.comment_id = $1
      ORDER BY replies.date`,
      values: [commentId]
    }

    const result = await this._pool.query(query)

    return result.rows.map((reply) => new DetailReply(reply))
  }
}

module.exports = ReplyRepositoryPostgres
