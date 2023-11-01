class DetailThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const {
      id, owner, date, title, content, comments
    } = payload

    this.id = id
    this.owner = owner
    this.date = date
    this.title = title
    this.content = content
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

  _isPayloadNotContainNeededProperty ({ id, owner, date, title, content, comments }) {
    return !id || !owner || !date || !title || !content || !comments
  }

  _isPayloadNotMeetDataTypeSpecification ({ id, owner, date, title, content, comments }) {
    return typeof id !== 'string' ||
    typeof owner !== 'string' ||
    typeof date !== 'string' ||
    typeof title !== 'string' ||
    typeof content !== 'string' ||
    !(comments instanceof Array)
  }
}

module.exports = DetailThread
