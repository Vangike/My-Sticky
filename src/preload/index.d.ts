import { StickyNoteInfo } from '@shared/models'

export interface StickyNoteAPI {
  locale: string
  stickyNote: StickyNote
  loadFolder: () => Promise<StickyNoteInfo[] | null>
  getStickyNoteInfo: (cb: (stickyNoteInfo: StickyNoteInfo) => void) => void
}

declare global {
  interface Window {
    // electron: api
    api: StickyNoteAPI
  }
}
