const fs = require('fs')
const cli = require('commander')
const downloadPageAsTree = require('notionast-util-from-notionapi')
const { toHTML } = require('notionast-util-to-html')

const { getPageIDfromNotionURL, isValidDashID } = require('./notion-utils')
const { createAgent } = require('./agent')

cli.version('0.4.0')
cli.usage('[options] <url>')
cli.option('-t, --token', 'Notion login token for authentication.')
cli.option('-v, --verbose', 'Show status messages.')
cli.parse(process.argv)

if (isArgsEmpty(process.argv)) cli.help(processHelp)

main()

async function main() {
  try {
    let url = process.argv[process.argv.length - 1]
    let pageID = getPageIDfromNotionURL(url)
    let agentOpts = {
      token: cli.opts().token
    }
    
    if (!isValidDashID(pageID)) {
      console.error('npd: Fail to extract pageID from URL.')
      process.exit()
    }

    if (cli.verbose) console.log(`npd: Downloading ${url}, pageID ${pageID}`)

    let tree = await downloadPageAsTree(pageID, createAgent(agentOpts))
    let contentHTML = toHTML(tree)
    let pageHTML = renderPage(tree.data.title[0][0], contentHTML)
    fs.writeFileSync(`Page-${pageID}.html`, pageHTML, { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

function renderPage(pageTitle, contentHTML) {
  let pageHTML = `\
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <!-- Chrome, Firefox OS and Opera Status Bar Color -->
    <meta name="theme-color" content="#FFFFFF">
    <title>${pageTitle}</title>
    <link rel="stylesheet" type="text/css" href="css/prism.css">
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="css/notion-color.css">
    <link rel="stylesheet" type="text/css" href="css/theme.css">
    <style>
      .container {
        padding: 1.5em;
        max-width: 8.3in;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${contentHTML}
    </div>
  </body>
</html>`
  return pageHTML
}

function isArgsEmpty(argv) {
  if (argv[0].indexOf('node') !== '-1') {
    return argv.length === 2
  } else {
    return argv.length === 1
  }
}

function processHelp(str) {
  return str.replace('index', 'npd')
}
