const path = require('path')
const packageJson = require('./package.json')


const config = {
  packagerConfig: {
    name: 'LockLogger',
    executableName: 'lock-logger',
    asar: false,
    icon: path.resolve(__dirname, 'static', 'icon'),
    win32metadata: {
      CompanyName: 'Felix Rieseberg',
      OriginalFilename: 'LockLogger',
    },
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32']
    },
  ],
}

// Finally, export it
module.exports = config