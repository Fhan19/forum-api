class DetailThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const {
      id, title, body, username, comments
    } = payload

    this.id = id
    this.title = title
    this.body = body
    this.username = username
    this.comments = comments
  }

  _verifyPayload (payload) {
    if (this._isPayloadNotContainNeededProperty(payload)) {
      throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (this._isPayloadNotMeetDataTypeSpecification(payload)) {
      throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _isPayloadNotContainNeededProperty ({
    id, title, body, username, comments
  }) {
    return !id || !title || !body || !username || !comments || !comments[0].replies
  }

  _isPayloadNotMeetDataTypeSpecification ({
    id, title, body, date, username, comments
  }) {
    return typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof body !== 'string' ||
      typeof date !== 'string' ||
      typeof username !== 'string' ||
      !(comments instanceof Array) ||
      !(comments[0].replies instanceof Array)
  }
}

module.exports = DetailThread
