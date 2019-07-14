const fs = require('fs')
const path = require('path')
const downloadPageAsTree = require('notionast-util-from-notionapi')
const toHTML = require('notionast-util-to-html')

const myAgent = require('./agent')
const config = require('../config')

main()

async function main() {
  try {
    let pageID = config.pageID
    let tree = await downloadPageAsTree(pageID, myAgent)
    let contentHTML = toHTML(tree)
    let pageHTML = renderPage(tree.data.title[0][0], contentHTML)
    const pageHTMLFile = path.join(__dirname, '../data/index.html')
    fs.writeFileSync(pageHTMLFile, pageHTML, { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

function renderPage(pageTitle, contentHTML) {
  let pageHTML = `
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <!-- Chrome, Firefox OS and Opera Status Bar Color -->
    <meta name="theme-color" content="#FFB900">
    <title>${pageTitle}</title>
    <link rel="stylesheet" type="text/css" href="css/notion-color.css">
    <link rel="stylesheet" type="text/css" href="css/theme.css">
    <style>
      @media only screen and (max-width: 680px) {
        .column {
          width: 100% !important;
          margin-left: 0 !important;
        }
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
      details > div {
        margin: 3px 0;
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
      ul {
        list-style-type: disc;
      }
      img {
        margin: 0 auto;
      }
      .bookmark {
        transition: background 120ms ease-in 0s;
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
      .block {
        margin: 3px 0;
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
