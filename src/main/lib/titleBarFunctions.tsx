import { BrowserWindow } from 'electron'

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
