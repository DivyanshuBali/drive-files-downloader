const cliProgress = require('cli-progress')
const fs = require('fs')

const progBar = new cliProgress.SingleBar({
  format: 'Download Progress |' + '{bar}' + '| {percentage}%'
})

function downloadFile(start, downloadFiles, drive) {
  if (start > downloadFiles.length - 1) {
    return
  }

  const file = downloadFiles[start]
  let progress = 0
  const dest = fs.createWriteStream(`./downloads/${file.name}`)

  drive.files
    .get(
      {
        fileId: file.id,
        alt: 'media'
      },
      {
        responseType: 'stream'
      }
    )
    .then((res) => {
      console.log()
      progBar.start(file.size, 0)
      res.data
        .on('end', () => {
          progBar.stop()
          console.log(`${file.name} downloaded.`)
          downloadFile(start + 1, downloadFiles, drive)
        })
        .on('error', () => {
          progBar.stop()
          console.log(`Error occurred while downloading ${file.name}`)
        })
        .on('data', (data) => {
          progress += data.length
          progBar.update(progress)
        })
        .pipe(dest)
    })
}

module.exports = downloadFile
