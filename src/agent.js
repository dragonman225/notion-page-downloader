const NotionAgent = require('notionapi-agent')

module.exports = { createAgent }

function createAgent(options) {
  return new NotionAgent(options)
}
