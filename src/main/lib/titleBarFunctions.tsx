import { BrowserWindow } from 'electron'
import { createWindow, mainBrowserId } from '..'

export const appMinimize = () => {
  const browser = BrowserWindow.getFocusedWindow()
  browser?.minimize()
}

export const appClose = () => {
  const browser = BrowserWindow.getFocusedWindow()
  browser?.close()
}

export const appDropdown = () => {
  const browser = BrowserWindow.getFocusedWindow()
  const browserSize = browser?.getSize()

  if (!browserSize || !browser) {
    return
  }

  if (browserSize[1] < 72) {
    browser.setSize(browserSize[0], 180)
  } else {
    browser.setSize(browserSize[0], 68)
  }
}

export const appOpenHub = () => {
  const hubWindow = BrowserWindow.fromId(mainBrowserId)
  console.log('openHub has ran!')

  if (hubWindow) {
    hubWindow.focus()
  } else {
    createWindow()
  }
}
