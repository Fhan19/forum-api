const AddedReply = require('../AddedReply')

describe('a AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'wkwkwk'
    }

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      owner: 'user-123',
      content: 'wkwkwk'
    }

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create newComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      owner: 'user-123',
      content: 'wkwkwk'
    }

    // Action
    const addedReply = new AddedReply(payload)

    // Assert
    expect(addedReply.id).toEqual(payload.id)
    expect(addedReply.owner).toEqual(payload.owner)
    expect(addedReply.content).toEqual(payload.content)
  })
})