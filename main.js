const { app, BrowserWindow, ipcMain: ipc } = require('electron')
const wpilibNT = require('wpilib-nt-client')

const dev = require('electron-is-dev')

if (dev) {
  const spike = require('./spike')
  spike.watch()
}

let win

const padNumber = number => {
  const { length } = number.toString()
  return '0'.repeat(4 - length) + number
}

class NT {
  constructor() {
    this.startNt()
    this.ip = 'localhost'
    ipc.on('selectip', (_, ip) => {
      this.ip = ip
      this.nt.removeListener(this.listener)
      delete this.nt
      win.webContents.send('connectionstatus', false)
      this.startNt(ip)
    })
    ipc.on('connectionstatus', () => {
      console.log('connectionstatus', this.nt.isConnected())
      win.webContents.send('connectionstatus', this.nt.isConnected())
    })
    ipc.on('value', (e, key, value) => {
      this.data[key] = value
      this.nt.Assign(value, key)
    })
    this.listener = this.nt.addListener((key, value) => {
      this.data[key] = value
      win.webContents.send('value', key, value)
      win.webContents.send('all', this.data)
    })
  }
  startNt(ip = 'localhost') {
    this.ip = ip
    this.data = {}
    this.nt = new wpilibNT.Client()
    this.connected = false
    this.nt.start((isConnected, err) => {
      // Displays the error and the state of connection
      console.log({ isConnected, err })
      win.webContents.send('connectionstatus', isConnected)
    }, ip)
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
