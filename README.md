# Notion Page Downloader

This is a small application to demonstrate the following three of my Notion-related projects. 

* [notionapi-agent](https://github.com/dragonman225/notionapi-agent)
* [notionast-util-from-notionapi](https://github.com/dragonman225/notionast-util-from-notionapi)
* [notionast-util-to-html](https://github.com/dragonman225/notionast-util-to-html)

With this application users can download a Notion page as a HTML file. 
Although recently Notion starts providing an option to export to HTML, my projects potentially give users more flexibility to customize how the blocks look.

## Demo

This repository includes a demo result in `data/index.html`. The original page is Notion's guide :  [Keyboard & Markdown Shortcuts](https://www.notion.so/Keyboard-Markdown-Shortcuts-66e28cec810548c3a4061513126766b0).

## Setup

1. `npm install` or `pnpm install`
2. `cp config.sample.json config.json`

## Usage

1. If you want to download your non-public pages, open `config.json`, fill in your cookie. Otherwise, go to the next step.
2. Find the page ID of the page you want to download from browser's devtool, and fill in the `pageID` field of `config.json`. It must be the dashed version, like `66e28cec-8105-48c3-a406-1513126766b0`.
3. `npm run start`
4. Result is saved as `data/index.html`.

## Supported Blocks

* Text (With color, background color, styles.)
* Heading 1, 2, 3
* Bulleted List
* To-do List
* Toggle List
* Quote
* Web Bookmark