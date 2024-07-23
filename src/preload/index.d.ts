import { StickyNoteInfo } from '@shared/models'
import { ReadNoteType, StickyNoteType } from '@shared/types'

export interface StickyNoteAPI {
  locale: string
  stickyNote: StickyNoteType
  loadFolder: () => Promise<FolderResult | null>
  saveContent: (file: string, content: string) => Promise<void>
  readContent: ReadNoteType
  getStickyNotesInPath: (filePath: string) => Promise<StickyNoteInfo[]>
  getStickyNoteInfo: (cb: (stickyNoteInfo: StickyNoteInfo) => void) => void
}

declare global {
  interface Window {
    // electron: api
    api: StickyNoteAPI
  }
}
