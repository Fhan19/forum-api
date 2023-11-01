const RepliesHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'replies',
  version: '1.0.0',
  register: async (server, { injections }) => {
    const repliesHandler = new RepliesHandler(injections)
    server.route(routes(repliesHandler))
  }
}
