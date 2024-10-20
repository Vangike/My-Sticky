import { TitleBar } from '@renderer/components/TitleBar/TitleBar'
import { browserIDAtom, stickyNoteAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { StickyNoteHeader } from './IndividualStickyNote'
import { TiptapEditor } from './editor/TiptapEditor'

// Message port to communicate data back to Main process
export let messagePort
window.onmessage = (e) => {
  console.log(e)
  messagePort = e.ports[0]
}

export const StickyNoteApp = () => {
  const [stickyNote, setStickyNote] = useAtom(stickyNoteAtom)
  const [browserId, setBrowserId] = useAtom(browserIDAtom)
  const [isFocused, setFocused] = useState(false)

  // Listener from Main to get sticky note information
  // Activate once to prevent rerendering and attaching
  useEffect(() => {
    window.api.stickyNoteInfoListener((stickyNoteInfo, id) => {
      setStickyNote(stickyNoteInfo)
      setBrowserId(id)
    })
  }, [])

  if (stickyNote == null) {
    return
  }

  return (
    <div
      className="flex h-full flex-col"
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {/* TitleBar of sticky note */}
      <div className="bg-amber-200">
        {isFocused ? <TitleBar isStickyNote={true} /> : <div className="w-full h-6"></div>}

        {stickyNote ? (
          <StickyNoteHeader className="w-full p-2 shadow-md rounded-b-sm" />
        ) : (
          <span>Failed to load in this sticky note</span>
        )}
      </div>

      <div className="relative p-2 mt-2 overflow-y-auto flex-1 h-full overflow-hidden">
        <TiptapEditor fileName={stickyNote.title} stickyNoteContent={stickyNote.content} />
      </div>
    </div>
  )
}
