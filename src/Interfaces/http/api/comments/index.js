const CommentsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'comments',
  version: '1.0.0',
  register: async (server, { injections }) => {
    const commentsHandler = new CommentsHandler(injections)
    server.route(routes(commentsHandler))
  }
}
