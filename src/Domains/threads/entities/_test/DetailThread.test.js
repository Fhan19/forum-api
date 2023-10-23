const DetailThread = require('../DetailThread')

describe('a DetailThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      title: 'sebuah thread',
      body: 'aowkawokaowk',
      username: 'Haha'
    }

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'sebuah thread',
      body: 'aowkawokaowk',
      username: 'Hoho',
      comments: [{
        replies: {}
      }]
    }

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create DetailThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'awokoakwokaowk',
      username: 'Hehe',
      comments: [{
        id: 'comment-123',
        content: 'wkwkwk',
        username: 'Hihi',
        replies: [{
          id: 'reply-123',
          content: 'y',
          username: 'Huhu'
        }]
      }]
    }

    // Action
    const {
      id, comments
    } = new DetailThread(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(comments[0].id).toEqual(payload.comments[0].id)
    expect(comments[0].replies[0].id).toEqual(payload.comments[0].replies[0].id)
  })
})
