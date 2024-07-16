import { StickyNoteInfo } from '@shared/models'
import { atom, useAtom } from 'jotai'
import { StickyNoteHeader } from './IndividualStickyNote'
import { TiptapEditor } from './TiptapEditor'

const stickyNoteAtom = atom<StickyNoteInfo | null>(null)

export const StickyNoteApp = () => {
  const [stickyNote, setStickyNote] = useAtom(stickyNoteAtom)

  window.api.getStickyNoteInfo((stickyNoteInfo) => {
    console.info(stickyNoteInfo)
    setStickyNote(stickyNoteInfo)
  })

  if (stickyNote == null) {
    return
  }

  return (
    <div className="flex flex-col max-h-screen">
      <div>
        {stickyNote ? <StickyNoteHeader stickyNoteInfo={stickyNote} /> : <span>Error</span>}
      </div>

      <div className="p-2 overflow-y-auto flex-1">
        <TiptapEditor stickyNoteContent={stickyNote.content} />
      </div>
    </div>
  )
}
