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
      username: 'hehe',
      date: new Date().toISOString(),
      title: 'sebuah thread',
      body: 'aowkawokaowk',
      comments: [{}]
    }

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create DetailThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      username: 'haha',
      date: '10-23-1232',
      title: 'sebuah thread',
      body: 'aowkawokaowk',
      comments: [{
        id: 'comment-123',
        content: 'wkwkwk',
        date: '11-23-1232',
        username: 'Hihi'
      }]
    }

    // Action
    const {
      id, username, date, title, body, comments
    } = new DetailThread(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(username).toEqual(payload.username)
    expect(title).toEqual(payload.title)
    expect(body).toEqual(payload.body)
    expect(date).toEqual(payload.date)
    expect(comments[0].id).toEqual(payload.comments[0].id)
    expect(comments[0].content).toEqual(payload.comments[0].content)
    expect(comments[0].date).toEqual(payload.comments[0].date)
    expect(comments[0].username).toEqual(payload.comments[0].username)
  })
})
