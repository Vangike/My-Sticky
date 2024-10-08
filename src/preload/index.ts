import { StickyNoteInfo } from '@shared/models'
import {
  DeleteNoteType,
  NewNoteType,
  ReadNoteType,
  RenameNoteType,
  SaveNoteType,
  StickyNoteType
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context Isolation must be enabled in BrowserWindow')
}

// stickyNote: (...args: Parameters<StickyNote>) => ipcRenderer.invoke('stickyNote', ...args)

try {
  contextBridge.exposeInMainWorld('api', {
    locale: navigator.language,
    // Utils
    pathNormalize: (path: string) => ipcRenderer.invoke('pathNormalize', path),
    // Title bar
    appClose: () => ipcRenderer.invoke('appClose'),
    appMinimize: () => ipcRenderer.invoke('appMinimize'),
    appDropdown: () => ipcRenderer.invoke('appDropdown'),
    // File handling
    stickyNote: (...args: Parameters<StickyNoteType>) => ipcRenderer.invoke('stickyNote', ...args),
    loadFolder: () => ipcRenderer.invoke('loadFolder'),
    saveContent: (...args: Parameters<SaveNoteType>) => ipcRenderer.invoke('saveContent', ...args),
    readContent: (...args: Parameters<ReadNoteType>) => ipcRenderer.invoke('readContent', ...args),
    newStickyNote: (...args: Parameters<NewNoteType>) => ipcRenderer.invoke('newNote', ...args),
    renameNote: (...args: Parameters<RenameNoteType>) => ipcRenderer.invoke('renameNote', ...args),
    deleteStickyNote: (...args: Parameters<DeleteNoteType>) =>
      ipcRenderer.invoke('deleteNote', ...args),
    getStickyNotesInPath: (fileName: string) =>
      ipcRenderer.invoke('getStickyNotesInPath', fileName),
    // Listeners
    stickyNoteInfoListener: (cb: (stickyNoteInfo: StickyNoteInfo, id: number) => void) => {
      ipcRenderer.on('getStickyNoteInfo', (_, data, id) => cb(data, id))
    },
    titleChangeListener: (callback) =>
      ipcRenderer.on('getTitleChange', (_, oldTitle: string, newTitle: string) =>
        callback(oldTitle, newTitle)
      )
  })
} catch (error) {
  console.error(error)
}

window.onload = () => {
  const { port1, port2 } = new MessageChannel()
  window.postMessage({ data: 'Sending' }, '*', [port2])

  port1.onmessage = (e) => {
    ipcRenderer.invoke('childMessage', e.data)
  }
}
