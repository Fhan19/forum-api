const AddComment = require('../AddComment')

describe('a AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'abc',
      threadId: 'abc'
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      owner: 'user-123',
      threadId: true,
      date: new Date().toISOString(),
      content: 'abc'
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create AddComment object correctly', () => {
    // Arrange
    const payload = {
      owner: 'user-123',
      threadId: 'thread-123',
      date: new Date().toISOString(),
      content: 'abc'
    }

    // Action
    const {
      content, threadId, owner, date
    } = new AddComment(payload)

    // Assert
    expect(owner).toEqual(payload.owner)
    expect(threadId).toEqual(payload.threadId)
    expect(date).toEqual(payload.date)
    expect(content).toEqual(payload.content)
  })
})
