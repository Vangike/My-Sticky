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
  stickyNote: StickyNoteType
  loadFolder: () => Promise<FolderResult | null>
  saveContent: (file: string, content: string) => Promise<void>
  readContent: ReadNoteType
  newStickyNote: NewNoteType
  deleteStickyNote: DeleteNoteType
  getStickyNotesInPath: (filePath: string) => Promise<StickyNoteInfo[]>
  getStickyNoteInfo: (cb: (stickyNoteInfo: StickyNoteInfo) => void) => void
  renameNote: RenameNoteType
}

declare global {
  interface Window {
    // electron: api
    api: StickyNoteAPI
  }
}
