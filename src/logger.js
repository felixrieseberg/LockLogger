const log = require('electron-log')

const { ElectronWatcher } = require('./electron')
const { PowerShellWatcher } = require('./powershell')

class Logger {
  constructor() {
    this.electronWatcher = new ElectronWatcher()
    this.powershellWatcher = new PowerShellWatcher()

    this.electronWatcher.on('change', (change) => {
      log.info(`Electron:`, change)
    })

    this.powershellWatcher.on('change', (change) => {
      log.info(`PowerShell:`, change)
    })

    this.electronWatcher.watch()
    this.powershellWatcher.watch()
  }
}

module.exports = {
  Logger
}
