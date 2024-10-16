import { StickyNoteInfo } from '@shared/models'
import { DeleteNoteType, NewNoteType, ReadNoteType, RenameNoteType } from '@shared/types'
import { BrowserWindow, ipcMain } from 'electron'
import { stickyNote } from '.'
import {
  deleteStickyNote,
  getStickyNotesInPath,
  loadFolder,
  newStickyNote,
  readContent,
  renameNote,
  saveContent
} from './lib/fileHandling'
import { appClose, appDropdown, appMinimize, appOpenHub } from './lib/titleBarFunctions'
import { pathNormalize } from './lib/util'

export const appIPCHandle = () => {
  // IPC handle for util functions
  ipcMain.handle('pathNormalize', (_, path: string) => pathNormalize(path))

  // IPC handle for title bars functions
  ipcMain.handle('appMinimize', () => appMinimize())
  ipcMain.handle('appClose', () => appClose())
  ipcMain.handle('appDropdown', () => appDropdown())
  ipcMain.handle('appOpenHub', () => appOpenHub())

  // IPC handle for file handling
  ipcMain.handle('stickyNote', (_, stickyNoteInfo: StickyNoteInfo) => {
    stickyNote(stickyNoteInfo)
  })
  ipcMain.handle('getStickyNotesInPath', (_, fileName) => {
    getStickyNotesInPath(fileName)
  })

  ipcMain.handle('loadFolder', () => loadFolder())
  ipcMain.handle('saveContent', (_, fileName, content) => {
    saveContent(fileName, content)
  })
  ipcMain.handle('readContent', (_, ...args: Parameters<ReadNoteType>) => readContent(...args))

  ipcMain.handle('newNote', (_, ...args: Parameters<NewNoteType>) => newStickyNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNoteType>) =>
    deleteStickyNote(...args)
  )
  ipcMain.handle('renameNote', (_, ...args: Parameters<RenameNoteType>) => renameNote(...args))

  // IPC handle for port messages
  ipcMain.handle('childMessage', (_, message) => {
    if (message.type == 'TitleChange') {
      const mainWindow = BrowserWindow.fromId(1)
      mainWindow?.webContents.send(
        'getTitleChange',
        message.content.oldTitle,
        message.content.newTitle
      )
    }
  })
}
