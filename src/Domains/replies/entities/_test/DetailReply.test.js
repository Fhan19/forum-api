const DetailReply = require('../DetailReply')

describe('a DetailReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'Haha',
      id: 'reply-123',
      content: 'Wkwk'
    }

    // Action and Assert
    expect(() => new DetailReply(payload)).toThrowError('DETAIL_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 'Hihi',
      content: 'wkwkwk',
      isDelete: false
    }

    // Action and Assert
    expect(() => new DetailReply(payload)).toThrowError('DETAIL_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create DetailReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'Hoho',
      content: 'wkwkwk',
      isDelete: true
    }

    // Action
    const {
      id, content, username
    } = new DetailReply(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(content).toEqual(DetailReply.DELETED_REPLY_CONTENT)
    expect(username).toEqual(payload.username)
  })
})
