import { StickyNoteInfo } from '@shared/models'

export const mockNotes: StickyNoteInfo[] = [
  {
    title: 'StickyNote 1',
    subtitle: 'This is a subtitle!',
    lastEditTime: new Date().getTime(),
    content:
      'Content 1 is this forever! NOTHING Content 1 is this forever! NOTHINGContent 1 is this forever! NOTHING'
  },
  {
    title: 'StickyNote 2',
    subtitle: '',
    lastEditTime: new Date().getTime(),
    content: ''
  },
  {
    title: 'StickyNote 3',
    subtitle: '',
    lastEditTime: new Date().getTime(),
    content: ''
  },
  {
    title: 'StickyNote 4',
    subtitle: '',
    lastEditTime: new Date().getTime(),
    content: ''
  }
]
