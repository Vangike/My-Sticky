export type StickyNoteInfo = {
  title: string
  subtitle: string
  lastEditTime: number
  content: StickyNoteContent
}

export type StickyNoteContent = string

export type FolderResult = {
  path: string
  stickyNoteList: StickyNoteInfo[]
}
