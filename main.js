const { app, BrowserWindow, ipcMain: ipc } = require('electron')
const wpilibNT = require('wpilib-nt-client')

const dev = require('electron-is-dev')

if (dev) {
  const spike = require('./spike')
  spike.watch()
}

let win

class NT {
  constructor() {
    this.data = {}
    this.nt = new wpilibNT.Client()
    this.nt.start((isConnected, err) => {
      // Displays the error and the state of connection
      console.log({ isConnected, err })
    }, 'localhost')
    ipc.on('value', (e, key, value) => {
      this.data[key] = value
      this.nt.Assign(value, key)
    })
    this.nt.addListener((key, value) => {
      console.log(key, value)
      this.data[key] = value
      win.webContents.send('value', key, value)
      win.webContents.send('all', this.data)
    })
  }
}

const nt = new NT()

const createWindow = () => {
  win = new BrowserWindow({
    width: 1366,
    height: 570
  })
  if (dev) {
    win.webContents.openDevTools()
  }
  // don't show menus
  win.setMenu(null)
  console.log('load')
  win.loadURL(
    dev ? 'http://localhost:1111' : `file:///${__dirname}/public/index.html`
  )
  // top left
  win.setPosition(0, 0)
}

// electron has initialized
app.on('ready', createWindow)

app.on('window-all-closed', app.quit)
