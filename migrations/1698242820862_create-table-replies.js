exports.up = (pgm) => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users(id)',
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'comments(id)',
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    date: {
      type: 'TEXT',
      notNull: true
    },
    content: {
      type: 'TEXT',
      notNull: true
    },

    is_delete: {
      type: 'BOOLEAN',
      notNull: true
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('replies')
}
