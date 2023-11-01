class DetailReply {
  constructor (payload) {
    DetailReply.DELETED_REPLY_CONTENT = '**balasan telah dihapus**'

    this._verifyPayload(payload)

    const {
      id, owner, commentId, date, content, isDelete
    } = payload

    this.id = id
    this.owner = owner
    this.commentId = commentId
    this.date = date
    this.content = (isDelete) ? DetailReply.DELETED_REPLY_CONTENT : content
  }

  _verifyPayload (payload) {
    if (this._isPayloadNotContainNeededProperty(payload)) {
      throw new Error('DETAIL_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (this._isPayloadNotMeetDataTypeSpecification(payload)) {
      throw new Error('DETAIL_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _isPayloadNotContainNeededProperty ({ id, owner, commentId, date, content, isDelete }) {
    return !id || !owner || !commentId || !date || !content || isDelete === undefined
  }

  _isPayloadNotMeetDataTypeSpecification ({ id, owner, commentId, date, content, isDelete }) {
    return typeof id !== 'string' ||
      typeof owner !== 'string' ||
      typeof commentId !== 'string' ||
      typeof date !== 'string' ||
      typeof content !== 'string' ||
      typeof isDelete !== 'boolean'
  }
}

module.exports = DetailReply
