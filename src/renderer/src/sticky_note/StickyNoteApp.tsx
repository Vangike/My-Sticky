import { stickyNoteAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { StickyNoteHeader } from './IndividualStickyNote'
import { TiptapEditor } from './editor/TiptapEditor'

export const StickyNoteApp = () => {
  const [stickyNote, setStickyNote] = useAtom(stickyNoteAtom)

  // Prevent rerendering and attaching
  useEffect(() => {
    window.api.getStickyNoteInfo((stickyNoteInfo) => {
      setStickyNote(stickyNoteInfo)
    })
  }, [])

  if (stickyNote == null) {
    return
  }

  return (
    <div className="flex h-full flex-col">
      {stickyNote ? (
        <StickyNoteHeader className="w-full bg-amber-200 p-2 shadow-md rounded-b-sm" />
      ) : (
        <span>Failed to load in this sticky note</span>
      )}

      <div className="relative p-2 mt-2 overflow-y-auto flex-1 h-full overflow-hidden">
        <TiptapEditor fileName={stickyNote.title} stickyNoteContent={stickyNote.content} />
      </div>
    </div>
  )
}
