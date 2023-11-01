class AddReply {
  constructor (payload) {
    this._verifyPayload(payload)

    const {
      owner, commentId, content, date
    } = payload

    this.owner = owner
    this.commentId = commentId
    this.content = content
    this.date = date
  }

  _verifyPayload ({
    owner, commentId, content, date
  }) {
    if (!owner || !commentId || !content || !date) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof owner !== 'string' || typeof commentId !== 'string' || typeof content !== 'string' || typeof date !== 'string') {
      throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = AddReply
