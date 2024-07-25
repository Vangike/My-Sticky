import { stickyNoteAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { StickyNoteHeader } from './IndividualStickyNote'
import { TiptapEditor } from './TiptapEditor'

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
    <div className="flex h-full flex-col bg-blue-100">
      <div>
        {stickyNote ? (
          <StickyNoteHeader stickyNoteInfo={stickyNote} />
        ) : (
          <span>Failed to load in this sticky note</span>
        )}
      </div>

      <div className="relative p-2 overflow-y-auto flex-1 h-full overflow-hidden">
        <TiptapEditor fileName={stickyNote.title} stickyNoteContent={stickyNote.content} />
      </div>
    </div>
  )
}

// flex flex-col max-h-screen h-full bg-green-100
