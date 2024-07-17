import { StickyNoteInfo } from '@shared/models'
import { StickyNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context Isolation must be enabled in BrowserWindow')
}

// stickyNote: (...args: Parameters<StickyNote>) => ipcRenderer.invoke('stickyNote', ...args)

try {
  contextBridge.exposeInMainWorld('api', {
    locale: navigator.language,
    stickyNote: (...args: Parameters<StickyNote>) => ipcRenderer.invoke('stickyNote', ...args),
    loadFolder: () => ipcRenderer.invoke('loadFolder'),
    getStickyNoteInfo: (cb: (stickyNoteInfo: StickyNoteInfo) => void) => {
      ipcRenderer.on('getStickyNoteInfo', (event, data) => cb(data))
    }
  })
} catch (error) {
  console.error(error)
}
