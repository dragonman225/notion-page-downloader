const NotionAgent = require('notionapi-agent')

const config = require('../config')

const options = {
  token: config.token
}
const agent = new NotionAgent(options)

module.exports = agent
