import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { StickyNoteInfo } from '@shared/models'
import { app, BrowserWindow, Menu, shell } from 'electron'
import path, { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { appIPCHandle } from './ipcHandle'
import { readContent } from './lib/filehandling'

Menu.setApplicationMenu(null)
app.disableHardwareAcceleration()

// const mainBrowserID = atom(0)
export let mainBrowserId = 0

// Main sticky note window
export function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 460,
    minHeight: 80,
    title: 'My Sticky',
    icon: icon,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      devTools: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainBrowserId = mainWindow.id
}

// METHOD: opens a new browser/window for sticky notes
export const stickyNote = async (stickyNoteInfo: StickyNoteInfo) => {
  const windowProperties = {}

  // Get the Content of the Sticky Note
  const content = await readContent(stickyNoteInfo.title)
  const newStickyNoteInfo = {
    title: stickyNoteInfo.title,
    subtitle: stickyNoteInfo.subtitle,
    lastEditTime: stickyNoteInfo.lastEditTime,
    content: content
  }

  const { name: fileName } = path.parse(stickyNoteInfo.title)
  console.log(fileName)

  // Init location of new window to application location
  const parentWindow = BrowserWindow.getFocusedWindow()
  if (parentWindow) {
    const pos = parentWindow.getPosition()
    Object.assign(windowProperties, {
      x: pos[0] + 20,
      y: pos[1] + 20
    })
  }

  Object.assign(windowProperties, {
    width: 350,
    height: 460,
    minHeight: 68,
    title: fileName,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      devTools: true
    },
    autoHideMenuBar: true
  })

  const stickyNote = new BrowserWindow(windowProperties)

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    stickyNote.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/stickynote.html`)
    stickyNote.webContents.openDevTools()
  } else {
    stickyNote.loadFile(join(__dirname, '../renderer/stickynote.html'))
  }

  stickyNote.on('ready-to-show', () => {
    stickyNote.webContents.send('getStickyNoteInfo', newStickyNoteInfo, stickyNote.id)
  })

  return true
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.mysticky')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Function that handles all IPC handlers
  appIPCHandle()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
