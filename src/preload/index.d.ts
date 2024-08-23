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
  // Title bars
  appMinimize: () => void
  appClose: () => void
  appDropdown: () => void
  // File handling
  stickyNote: StickyNoteType
  loadFolder: () => Promise<FolderResult | null>
  saveContent: (file: string, content: string) => Promise<void>
  readContent: ReadNoteType
  newStickyNote: NewNoteType
  deleteStickyNote: DeleteNoteType
  getStickyNotesInPath: (filePath: string) => Promise<StickyNoteInfo[]>
  getStickyNoteInfo: (cb: (stickyNoteInfo: StickyNoteInfo, id: number) => void) => void
  renameNote: RenameNoteType
}

declare global {
  interface Window {
    // electron: api
    api: StickyNoteAPI
  }
}
