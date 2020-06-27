const rlSync = require('readline-sync')
const initializeDownloads = require('./createDownloadDirectory')

function getDownloadFilesValue(files, drive) {
  while (true) {
    const range = getRange(files)

    if (range) {
      if (range.length === 1) {
        const index = range[0] - 1
        console.log('\nDownload this file? :\n')
        console.log(`${files[index].name}`)

        if (getConfimation()) {
          initializeDownloads(files[index], drive)
          break
        } else {
          continue
        }
      }

      const filesToDownload = files.slice(range[0], range[1] + 1)

      console.log('\nDownload these files? :\n')

      filesToDownload.forEach((val, index) => {
        console.log(`${index + 1} -> ${val.name}`)
      })

      if (getConfimation()) {
        initializeDownloads(filesToDownload, drive)
        break
      } else {
        continue
      }
    }
  }
}

function getRange(files) {
  const range = rlSync.question(
    `\nEnter the range of corresponding numbers to start downloading files or type single number to download one file\n[e.g., To download all the files from number 1 to 5, type 1,5 and hit enter]: `
  )

  if (range.includes(',')) {
    const indexes = range.split(',').map((value) => value.trim() - 1)

    indexes.forEach((val) => {
      if (!parseInt(val)) {
        console.log('\nInvalid input')
        return false
      }
    })

    if (
      indexes.length > 2 ||
      indexes[1] < indexes[0] ||
      indexes[0] < 0 ||
      indexes[1] > files.length - 1
    ) {
      console.log('\nInvalid range')
      return false
    }

    return indexes
  } else {
    if (!parseInt(range) || range - 1 > files.length - 1) {
      console.log('\nInvalid input')
      return false
    }

    return range.trim().split('')
  }
}

function getConfimation() {
  const response = rlSync.question('\nConfirm? [Y/N]: ')
  const ans = response.toLowerCase()

  if (ans === 'y' || ans === 'yes') {
    return true
  } else if (ans === 'n' || ans === 'no') {
    return false
  } else {
    console.log('Invalid Input')
    return false
  }
}

module.exports = getDownloadFilesValue
