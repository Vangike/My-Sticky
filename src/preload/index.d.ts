import { StickyNoteInfo } from '@shared/models'

export interface StickyNoteAPI {
  locale: string
  stickyNote: (stickyNoteInfo: StickyNoteInfo) => Promise<boolean>
  getStickyNoteInfo: (cb: (stickyNoteInfo: StickyNoteInfo) => void) => void
}

declare global {
  interface Window {
    // electron: api
    api: StickyNoteAPI
  }
}
