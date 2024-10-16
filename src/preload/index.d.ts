import { StickyNoteInfo } from '@shared/models'
import {
  DeleteNoteType,
  NewNoteType,
  ReadNoteType,
  RenameNoteType,
  StickyNoteType
} from '@shared/types'

export interface StickyNoteAPI {
  locale: string
  // Util functions
  pathNormalize: (path: string) => string
  // Title bars function
  appMinimize: () => void
  appClose: () => void
  appDropdown: () => void
  appOpenHub: () => void
  // File handling
  stickyNote: StickyNoteType
  loadFolder: () => Promise<FolderResult | null>
  saveContent: (file: string, content: string) => Promise<void>
  readContent: ReadNoteType
  newStickyNote: NewNoteType
  deleteStickyNote: DeleteNoteType
  getStickyNotesInPath: (filePath: string) => Promise<StickyNoteInfo[]>
  renameNote: RenameNoteType
  // Listeners
  stickyNoteInfoListener: (cb: (stickyNoteInfo: StickyNoteInfo, id: number) => void) => void
  titleChangeListener: (cb: (oldTitle: string, newTitle: string) => void) => void
}

declare global {
  interface Window {
    // electron: api
    api: StickyNoteAPI
  }
}
