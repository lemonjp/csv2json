#!/usr/bin/env node

const program = require('commander')
const path = require('path')

const { csv2json, directoryExists, readdir, mkdir, rm } = require('./lib')

program
  .version('1.0.0')
  .name('csv2json')
  .description('An image resizer to make thumbnails')
  .option('-s,--source <folder>', 'Source csv directory', 'csv')
  .option(
    '-d,--destination <folder>',
    'Directory to be created for json',
    'json'
  )
  .parse(process.argv)

const main = async () => {
  try {
    // Use current working dir vs __dirname where this code lives
    const cwd = process.cwd()

    // Use user input or default options
    //const { source, destination } = program
    const source = program.opts().source
    console.log('source ->', program.opts().source)
    const destination = program.opts().destination

    const srcPath = path.join(cwd, source)
    console.log('srcPath ->', srcPath)
    const destPath = path.join(cwd, destination)


    // Remove destination directory is it exists
    if (directoryExists(destPath)) {
      await rm(destPath)
    }

    // Create destination directory
    await mkdir(destPath)

    // Read source directory
    const csvAll = await readdir(srcPath)

    // Create thumbnails
    for (let csv of csvAll) {
      console.log('srcPath ->', srcPath)
      const src = path.join(srcPath, csv)
      const dest = path.join(destPath, csv)
      console.log(`Creating Json files at: ${dest}`)
      csv2json(src, dest)
    }

    console.log('Json files created successfully!')
  } catch (error) {
    console.log('Error creating Json files.', error.message )
  }
}

main()
