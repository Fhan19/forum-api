const pool = require('../src/Infrastructures/database/postgres/pool')

const RepliesTableTestHelper = {
  async addReply ({
    id = 'comment-123', owner = 'user-123', threadId = 'thread-123', commentId = 'comment-123',
    date = new Date().toISOString(), content = 'sebuah reply', isDelete = false
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, owner, threadId, commentId, date, content, isDelete]
    }

    await pool.query(query)
  },

  async findCommentsById (id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows
  },

  async cleanTable () {
    await pool.query('DELETE FROM comments WHERE 1=1')
  }
}

module.exports = RepliesTableTestHelper
