import { stickyNoteAtom } from '@renderer/store'
import { StickyNoteInfo } from '@shared/models'
import { useAtom } from 'jotai'
import { ComponentProps, useCallback, useState } from 'react'

type StickyNoteHeaderProp = ComponentProps<'div'> & {
  stickyNoteInfo: StickyNoteInfo
}

// Placeholder. The previous code utilize an atom for the sticky note in order to save to it. If we change the sticky note title, we also have to change that atom sticky note so it can be saved to the new place instead of the old place.

export const StickyNoteHeader = ({ stickyNoteInfo, className }: StickyNoteHeaderProp) => {
  const [stickyAtom, setStickyAtom] = useAtom(stickyNoteAtom)

  const [title, setTitle] = useState(stickyNoteInfo.title.replace(/^.*[\\/]/, ''))

  const handleTitleUpdate = useCallback((e) => {
    setTitle(e.target.value)
  }, [])

  const handleTitleChange = useCallback(() => {
    console.log('This has run!')
  }, [title])

  return (
    <div className={className}>
      <input
        className="text-2xl w-full bg-inherit"
        type="text"
        value={title}
        onChange={handleTitleUpdate}
        onBlur={handleTitleChange}
      />
      <h1>{stickyNoteInfo.subtitle}</h1>
    </div>
  )
}
