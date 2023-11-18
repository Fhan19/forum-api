class DetailComment {
  constructor (payload) {
    DetailComment.DELETED_CONTENT_COMMENT = '**komentar telah dihapus**'

    this._verifyPayload(payload)

    const {
      id, username, date, content, is_delete: isDelete
    } = payload

    this.id = id
    this.username = username
    this.date = date
    this.content = (isDelete) ? DetailComment.DELETED_CONTENT_COMMENT : content
  }

  _verifyPayload (payload) {
    if (this._isPayloadNotContainNeededProperty(payload)) {
      throw new Error('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (this._isPayloadNotMeetDataTypeSpecification(payload)) {
      throw new Error('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _isPayloadNotContainNeededProperty ({ id, username, date, content, is_delete: isDelete }) {
    return !id || !username || !date || !content || isDelete === undefined
  }

  _isPayloadNotMeetDataTypeSpecification ({ id, username, date, content, is_delete: isDelete }) {
    return typeof id !== 'string' ||
      typeof username !== 'string' ||
      typeof date !== 'string' ||
      typeof content !== 'string' ||
      typeof isDelete !== 'boolean'
  }
}

module.exports = DetailComment
