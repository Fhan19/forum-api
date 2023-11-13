const AddReply = require('../AddReply')

describe('an AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      commentId: 'abc',
      content: 'abc'
    }

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      owner: true,
      commentId: 'abc',
      content: 'abc'
    }

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create AddReply object correctly', () => {
    // Arrange
    const payload = {
      owner: 'user-123',
      commentId: 'comment-123',
      content: 'abc'
    }

    // Action
    const {
      owner, commentId, content
    } = new AddReply(payload)

    // Assert
    expect(owner).toEqual(payload.owner)
    expect(commentId).toEqual(payload.commentId)
    expect(content).toEqual(payload.content)
  })
})
