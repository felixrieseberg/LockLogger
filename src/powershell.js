const { spawn } = require('child_process')
const path = require('path')
const EventEmitter = require('events')
const isEqual = require('lodash.isequal')
const log = require('electron-log')

/**
 * Executes the PS1 script getting session information
 *
 * @return {Promise.<stderr[], stdout[]>} - stderr and stdout received from the PS1 process
 */
function runPsGetSessions () {
  return new Promise((resolve, reject) => {
    log.silly('PowerShell: Checking sessions')

    const scriptPath = path.resolve(__dirname, './ps1/get-session.ps1')
    const psArgs = `& {& '${scriptPath}'}`
    const args = [ '-ExecutionPolicy', 'Bypass', '-NoProfile', '-NoLogo', psArgs ]

    let stdout = []
    let stderr = []
    let child

    try {
      child = spawn('powershell.exe', args)
    } catch (error) {
      return reject(error)
    }

    child.stdout.on('data', (data) => {
      log.silly('PowerShell: Stdout received: ' + data.toString())
      stdout.push(data.toString())
    })

    child.stderr.on('data', (data) => {
      log.silly('PowerShell: Stderr received: ' + data.toString())
      stderr.push(data.toString())
    })

    child.on('exit', () => {
      const result = stdout.join('')
      resolve(JSON.parse(result))
    })
    child.stdin.end()
  })
}

class PowerShellWatcher extends EventEmitter {
  constructor(options = { interval: 5000 }) {
    super()

    this.interval = options.interval
    this.activeInterval = null
    this.lastState = null

    this.poll = this.poll.bind(this)
  }

  watch() {
    if (this.activeInterval) {
      this.stop()
    }

    this.poll()
    this.activeInterval = setInterval(this.poll, this.interval)
  }

  stop() {
    clearInterval(this.activeInterval)
    this.activeInterval = null
  }

  /**
   * For reference, this method will take about two seconds to run.
   */
  async poll() {
    const newState = await runPsGetSessions()
    const shouldEmit = !isEqual(newState, this.lastState)

    if (shouldEmit) {
      this.emit('change', newState)
    }

    this.lastState = newState
  }
}

module.exports = {
  runPsGetSessions,
  PowerShellWatcher
}
