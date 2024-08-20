import { BrowserWindow } from 'electron'

export const appMinimize = () => {
  const browser = BrowserWindow.getFocusedWindow()
  browser?.minimize()
}

export const appClose = () => {
  const browser = BrowserWindow.getFocusedWindow()
  browser?.close()
}
