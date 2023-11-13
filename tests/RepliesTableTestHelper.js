const pool = require('../src/Infrastructures/database/postgres/pool')

const RepliesTableTestHelper = {
  async addReply ({
    id = 'comment-123', owner = 'user-123', commentId = 'comment-123',
    date = new Date().toISOString(), content = 'sebuah reply', isDelete = false
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, owner, commentId, date, content, isDelete]
    }

    await pool.query(query)
  },

  async findRepliesById (id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
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
