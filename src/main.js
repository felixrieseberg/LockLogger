// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const log = require('electron-log')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let logger

// Setup the logger
// 1048576 bytes = 1mb
log.transports.file.maxSize = 1048576 * 50
log.transports.file.level = 'info'

log.info(`Starting LockLogger`)

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 450,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('static/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.setMenu(null)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // This is the thing that watches the state
  const { Logger } =  require('./logger')

  logger = new Logger()
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('before-quit', () => {
  log.info('Quitting')
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.