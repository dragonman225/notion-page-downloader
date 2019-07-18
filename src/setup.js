const fs = require('fs')
const path = require('path')

let configFile = path.join(__dirname, '../config.json')
let configSampleFile = path.join(__dirname, '../config.sample.json')

if (!fs.existsSync(configFile)) {
  fs.copyFileSync(configSampleFile, configFile)
}