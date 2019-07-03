const NotionAgent = require('notionapi-agent')

const config = require('../config')

const options = {
  cookie: config.cookie
}
const agent = new NotionAgent(options)

module.exports = agent
