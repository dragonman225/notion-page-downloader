const { getPageIDFromNotionPageURL } = require('../src/notion-utils')

module.exports = { testNotionUtils }

function testNotionUtils() {
  const url1 = 'https://www.notion.so/0eeee000ccccbbbbaaaa123450000000'
  const url2 = 'https://www.notion.so/This-is-a-page-0eeee000ccccbbbbaaaa123450000000'
  const url3 = 'https://www.notion.so/username/0eeee000ccccbbbbaaaa123450000000'
  console.log('Testing getPageIDFromNotionPageURL():\n')
  console.log(url1.padEnd(url2.length), '->', getPageIDFromNotionPageURL(url1))
  console.log(url2, '->', getPageIDFromNotionPageURL(url2))
  console.log(url3.padEnd(url2.length), '->', getPageIDFromNotionPageURL(url3))
}