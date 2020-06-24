const getDownloadFilesValue = require('./getDownloadFilesValue')
const {google} = require('googleapis')

/**
 * Lists the names of up to 20 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth})
  drive.files.list(
    {
      pageSize: 20,
      fields: '*',
      orderBy: 'name'
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err)

      const files = res.data.files

      if (files.length) {
        console.log('\nDownloadable Files on your drive:\n')

        const downloadableFiles = files.filter(
          (file) => !file.mimeType.includes('folder')
        )

        downloadableFiles.forEach((val, index) => {
          console.log(`${index + 1} = ${val.name}`)
        })

        getDownloadFilesValue(downloadableFiles, drive)
      } else {
        console.log('No files found.')
      }
    }
  )
}

module.exports = listFiles
