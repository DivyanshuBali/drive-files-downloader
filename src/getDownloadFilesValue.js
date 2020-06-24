const rlSync = require('readline-sync')
const initializeDownloads = require('./createDownloadDirectory')

function getDownloadFilesValue(files, drive) {
  const range = rlSync.question(
    '\nEnter the range of numbers to start downloading files \n[e.g., To download all the files from number 1 to 5, type 1,5 and hit enter]: '
  )

  if (!range.includes(',')) {
    console.log('\nInvalid Range')
    getDownloadFilesValue(files, drive)
  }

  const indexes = range.split(',').map((val) => val.trim() - 1)

  if (
    indexes[1] < indexes[0] ||
    indexes[0] < 0 ||
    indexes[1] > files.length - 1 ||
    indexes.length > 2
  ) {
    console.log('\nInvalid Range')
    getDownloadFilesValue(files, drive)
  }

  const filesToDownload = files.slice(indexes[0], indexes[1] + 1)

  console.log('\nDownload these files?:\n')
  filesToDownload.forEach((val, index) => {
    console.log(`${index + 1} -> ${val.name}`)
  })

  const response = rlSync.question('\nConfirm?[Y/N]: ')
  const ans = response.toLowerCase()

  if (ans === 'y' || ans === 'yes') {
    initializeDownloads(filesToDownload, drive)
  } else if (ans === 'n' || ans === 'no') {
    getDownloadFilesValue(files, drive)
  } else {
    console.log('Invalid Input')
    getDownloadFilesValue(files, drive)
  }
}

module.exports = getDownloadFilesValue
