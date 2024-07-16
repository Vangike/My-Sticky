import { StickyNoteInfo } from './models'

export type StickyNote = (stickyNoteInfo: StickyNoteInfo) => Promise<boolean>
export type getStickyNote = () => Promise<boolean>
