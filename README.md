# Notion Page Downloader

This is a small application to demonstrate the following three modules of my Notion-related project.

* [notionapi-agent](https://github.com/dragonman225/notionapi-agent)
* [notionast-util-from-notionapi](https://github.com/dragonman225/notionast-util-from-notionapi)
* [notionast-util-to-html](https://github.com/dragonman225/notionast-util-to-html)

With this application users can download a Notion page as a HTML file. 
Although recently Notion starts providing an option to export to HTML, my modules potentially give users more flexibility to customize how the blocks look.

## Demo

This repository includes a rendering result as `public/index.html`. The original page is the [Blog Post](<https://www.notion.so/Blog-Post-20f83114dc15488eb5684c8c29821a4b>) template.

## Upgrade from Previous Versions

1. Delete `node_modules/` and `package_lock.json`.
2. Run `npm install` or `pnpm install`.

## Setup

1. Clone this repository.

   ```bash
   git clone https://github.com/dragonman225/notion-page-downloader.git
   ```

2. Go into the repository.
   ```bash
   cd notion-page-downloader
   ```

3. If you use `npm`

   ```bash
   npm install
   ```

   Or, if you use `pnpm`

   ```bash
   pnpm install
   ```

4. Duplicate `config.sample.json` as `config.json`

   On Linux or macOS, you can use this command.

   ```bash
   cp config.sample.json config.json
   ```

## Usage

1. If you want to download your private pages, open `config.json`, fill in your token (Follow this [guide](https://github.com/dragonman225/notionapi-agent/blob/master/docs/obtain_token.md) to obtain your token). Otherwise, go to the next step.
2. Find the page ID of the page you want to download from browser's devtool, and fill in the `pageID` field of `config.json`. It must contain dashes, like `66e28cec-8105-48c3-a406-1513126766b0`.
3. `npm run start`
4. Result is saved as `public/index.html`.

## Supported Blocks

Please view the list [here](https://github.com/dragonman225/notionast-util-to-html).