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
      content: 'aowkaowk',
      username: 'Hihi',
      isDelete: false,
      replies: {}
    }

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create DetailComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'qiuqiu',
      username: 'Hehe',
      isDelete: true,
      replies: []
    }

    // Action
    const {
      id, content, username, replies
    } = new DetailComment(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(content).toEqual(DetailComment.DELETED_CONTENT_COMMENT)
    expect(username).toEqual(payload.username)
    expect(replies).toEqual(payload.replies)
  })
})
