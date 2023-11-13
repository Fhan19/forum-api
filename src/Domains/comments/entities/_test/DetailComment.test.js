const DetailComment = require('../DetailComment')

describe('a DetailComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'wkwkwk',
      username: 'Haha'
    }

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 'user-123',
      date: new Date().toISOString(),
      content: 'aowkaowk',
      is_delete: false,
      replies: {}
    }

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create DetailComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'haha',
      date: new Date().toISOString(),
      content: 'aowkaowk',
      is_delete: true,
      replies: []
    }

    // Action
    const {
      id, username, date, content, replies
    } = new DetailComment(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(username).toEqual(payload.username)
    expect(date).toEqual(payload.date)
    expect(content).toEqual(DetailComment.DELETED_CONTENT_COMMENT)
    expect(replies).toEqual(payload.replies)
  })
})
