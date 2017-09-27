const { app, BrowserWindow, ipcMain: ipc } = require('electron')
const wpilibNT = require('wpilib-nt-client')
const meow = require('meow')

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
