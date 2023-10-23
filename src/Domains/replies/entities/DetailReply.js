class DetailReply {
  constructor (payload) {
    DetailReply.DELETED_REPLY_CONTENT = '**balasan telah dihapus**'

    this._verifyPayload(payload)

    const {
      id, username, content, isDelete
    } = payload

    this.id = id
    this.username = username
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

  _isPayloadNotContainNeededProperty ({
    id, username, content, isDelete
  }) {
    return !id || !username || !content || isDelete === undefined
  }

  _isPayloadNotMeetDataTypeSpecification ({
    id, content, username, isDelete
  }) {
    return typeof id !== 'string' ||
        typeof username !== 'string' ||
        typeof content !== 'string' ||
        typeof isDelete !== 'boolean'
  }
}

module.exports = DetailReply
