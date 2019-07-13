const fs = require('fs')
const path = require('path')
const downloadPageAsTree = require('notionast-util-from-notionapi')
const toHTML = require('notionast-util-to-html')

const myAgent = require('./agent')
const config = require('../config')

async function main() {
  try {
    let pageID = config.pageID
    let tree = await downloadPageAsTree(pageID, myAgent)
    let contentHTML = toHTML(tree)
    let pageHTML = `\
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <!-- Chrome, Firefox OS and Opera Status Bar Color -->
    <meta name="theme-color" content="#FFB900">
    <title>${tree.data.title[0][0]}</title>
    <link rel="stylesheet" type="text/css" href="css/notion-color.css">
    <link rel="stylesheet" type="text/css" href="css/theme.css">
    <style>
      div {
        margin: 0.8em auto;
      }
      .container {
        padding: 1.5em;
      }
      code {
        background-color: rgba(135,131,120,0.15);
      }
      details {
        margin: 7px auto;
      }
      details div {
        margin: 5px auto;
      }
      details > div {
        margin-left: 28px;
      }
      details > summary {
        margin-left: 6px;
      }
      details > summary:focus {
        outline: none;
      }
      li {
        margin-top: 0;
      }
      .bookmark {
        transition: background 120ms ease-in 0s;
        margin: 0.8em auto;
      }
      .bookmark:hover {
        background: rgba(55, 53, 47, 0.08);
      }
      .bookmark img, .bookmark div {
        margin: 0;
      }
      .indent {
        padding-left: 28px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${contentHTML}
    </div>
  </body>
</html>
`
    const pageHTMLFile = path.join(__dirname, '../data/index.html')
    fs.writeFileSync(pageHTMLFile, pageHTML, { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
