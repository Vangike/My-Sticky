import { StickyNoteInfo } from '@shared/models'

const dateFormatter = new Intl.DateTimeFormat(window.api.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const formateDateFromMs = (ms: number) => dateFormatter.format(ms)

export const openStickyNote = async (stickyNote: StickyNoteInfo) => {
  const openStickyNote = await window.api.stickyNote(stickyNote)

  if (!openStickyNote) {
    return
  }
}

export const newStickyNote = async () => {
  const newStickyNote: StickyNoteInfo = {
    title: '',
    subtitle: '',
    lastEditTime: Date.now(),
    content: 'testing!'
  }
  const stickyNote = await window.api.stickyNote(newStickyNote)

  if (!stickyNote) {
    return
  }
}
