const NewReply = require('../NewReply')

describe('an AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'abc',
      commentId: 'abc',
      content: 'abc'
    }

    // Action and Assert
    expect(() => new NewReply(payload)).toThrowError('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      owner: true,
      threadId: 'abc',
      commentId: 'abc',
      content: 'abc'
    }

    // Action and Assert
    expect(() => new NewReply(payload)).toThrowError('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create newReply object correctly', () => {
    // Arrange
    const payload = {
      owner: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
      content: 'abc'
    }

    // Action
    const {
      owner, threadId, commentId, content
    } = new NewReply(payload)

    // Assert
    expect(owner).toEqual(payload.owner)
    expect(threadId).toEqual(payload.threadId)
    expect(commentId).toEqual(payload.commentId)
    expect(content).toEqual(payload.content)
  })
})
