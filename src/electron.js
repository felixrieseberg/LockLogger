const { powerMonitor } = require('electron')
const EventEmitter = require('events')

class ElectronWatcher extends EventEmitter {
  constructor() {
    super()

    this.isWatching = false
  }

  watch() {
    powerMonitor.on('lock-screen', () => this.change('lock-screen'))
    powerMonitor.on('unlock-screen', () => this.change('unlock-screen'))
  }

  stop() {
    powerMonitor.removeAllListeners('lock-screen')
    powerMonitor.removeAllListeners('unlock-screen')
  }

  change(...args) {
    this.emit('change', args)
  }
}

module.exports = {
  ElectronWatcher
}
