const { app, BrowserWindow, ipcMain: ipc } = require('electron')
const wpilibNT = require('wpilib-nt-client')
const meow = require('meow')
const { connect } = require('net')

const Spike = require('spike-core')

const jsStandards = require('spike-js-standards')
const cssStandards = require('spike-css-standards')
const htmlStandards = require('reshape-standard')
const preactPreset = require('babel-preset-preact')
const sugarss = require('sugarss')
const sugarml = require('sugarml')

const spikeConfig = {
  root: __dirname,
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['components/*/*.sss'],
  entry: { index: './index' },
  server: { open: false },
  babel: jsStandards({ appendPresets: preactPreset }),
  postcss: cssStandards({
    parser: sugarss,
    minify: true,
    warnForDuplicates: false
  }),
  reshape: htmlStandards({ parser: sugarml, locals: {}, minify: true }),
  target: 'electron'
}

const port = 1735

const spike = new Spike(spikeConfig)

spike.on('error', err => console.error(`error: ${err}`))
spike.on('warning', warn => console.log(`warning: ${warn}`))
spike.on('compile', () => console.log('compiled'))
spike.once('compile', () => {
  // wait to reload, because server isn't started right away
  setTimeout(() => (win.reload ? win.reload() : ''), 500)
})

const cli = meow(`
  Usage
    $ ./main.js
`)

const { production } = cli.flags

if (!production) {
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
  if (!production) {
    win.webContents.openDevTools()
  }
  win.setMenu(null)
  console.log('load')
  win.loadURL('http://localhost:1111')
  // top left
  win.setPosition(0, 0)
}

// electron has initialized
app.on('ready', createWindow)

app.on('window-all-closed', app.quit)
