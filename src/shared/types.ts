import { StickyNoteInfo } from './models'

export type StickyNoteType = (stickyNoteInfo: StickyNoteInfo) => Promise<boolean>
export type getStickyNote = () => Promise<boolean>

export type SaveNoteType = (filename: string, content: string) => Promise<void>
export type ReadNoteType = (filename: string) => Promise<string>

export type NewNoteType = (dirPath: string) => Promise<string | false>
export type DeleteNoteType = (fileName: string) => Promise<boolean>
