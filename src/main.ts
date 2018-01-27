import { app, BrowserWindow } from 'electron'

const development = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null

const createMainWindow = () => {
  const window = new BrowserWindow()

  const url = development
    ? `http://localhost:3000`
    : `file://${__dirname}/index.html`

  if (development) {
    window.webContents.openDevTools()
  }

  window.loadURL(url)

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) mainWindow = createMainWindow()
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})
