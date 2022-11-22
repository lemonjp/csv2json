//const jimp = require('jimp')
const rimraf = require('rimraf')
const fs = require('fs')
const { promisify } = require('util')

const csvToJson = require('convert-csv-to-json');

const csv2json = async (src, dest) => {
  //await csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(src, dest);
  await csvToJson.fieldDelimiter(',').formatValueByType().generateJsonFileFromCsv(src, dest);
}

const directoryExists = (filepath) => {
  return fs.existsSync(filepath)
}

const readdir = promisify(fs.readdir)
const mkdir = promisify(fs.mkdir)
const rm = promisify(rimraf)

module.exports = {
  csv2json,
  directoryExists,
  readdir,
  mkdir,
  rm,
}
