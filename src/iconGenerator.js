const { readFileSync, writeFileSync } = require('fs')
const READ_PATH = './src/resources/icons.txt'
const WRITE_PATH = './src/resources/icons.js'

// readPath: relative path of .txt file to read
// writePath: relative path of .js file to create/overwrite
function generateIcons(readPath, writePath) {
  const textStream = readFileSync(readPath, 'utf8')
  const iconsArray = textStream.split('\r\n')
  const fileContent = `export const icons = [\n  '${iconsArray.join(`',\n  '`)}'\n]`
  writeFileSync(writePath, fileContent)
}

generateIcons(READ_PATH, WRITE_PATH)
