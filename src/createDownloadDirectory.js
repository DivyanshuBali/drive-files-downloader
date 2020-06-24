const fs = require('fs')
const downloadFile = require('./downloadFile')

function createDownloadDirectory(filesToDownload, drive) {
  const dir = './downloads'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  downloadFile(0, filesToDownload, drive)
}

module.exports = createDownloadDirectory
