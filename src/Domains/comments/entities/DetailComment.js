class DetailComment {
  constructor (payload) {
    DetailComment.DELETED_CONTENT_COMMENT = '**komentar telah dihapus**'

    this._verifyPayload(payload)

    const {
      id, owner, threadId, date, content, isDelete, replies
    } = payload

    this.id = id
    this.owner = owner
    this.threadId = threadId
    this.date = date
    this.content = (isDelete) ? DetailComment.DELETED_CONTENT_COMMENT : content
    this.replies = replies
  }

  _verifyPayload (payload) {
    if (this._isPayloadNotContainNeededProperty(payload)) {
      throw new Error('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (this._isPayloadNotMeetDataTypeSpecification(payload)) {
      throw new Error('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _isPayloadNotContainNeededProperty ({ id, owner, threadId, date, content, isDelete, replies }) {
    return !id || !owner || !threadId || !date || !content || isDelete === undefined || !replies
  }

  _isPayloadNotMeetDataTypeSpecification ({ id, owner, threadId, date, content, isDelete, replies }) {
    return typeof id !== 'string' ||
      typeof owner !== 'string' ||
      typeof threadId !== 'string' ||
      typeof date !== 'string' ||
      typeof content !== 'string' ||
      typeof isDelete !== 'boolean' ||
      !(replies instanceof Array)
  }
}

module.exports = DetailComment
