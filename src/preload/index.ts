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
    getStickyNoteInfo: (cb: (stickyNoteInfo: StickyNoteInfo) => void) => {
      ipcRenderer.on('getStickyNoteInfo', (event, data) => cb(data))
    }
  })
} catch (error) {
  console.error(error)
}
