import { StickyNoteInfo } from '@shared/models'
import { ComponentProps, useCallback, useState } from 'react'

type StickyNoteHeaderProp = ComponentProps<'div'> & {
  stickyNoteInfo: StickyNoteInfo
}

export const StickyNoteHeader = ({ stickyNoteInfo, className }: StickyNoteHeaderProp) => {
  const [title, setTitle] = useState(stickyNoteInfo.title.replace(/^.*[\\/]/, ''))

  const handleTitleUpdate = useCallback((e) => {
    setTitle(e.target.value)
    console.log(title)
  }, [])

  return (
    <div className={className}>
      <input
        className="text-2xl w-full bg-inherit"
        type="text"
        value={title}
        onChange={handleTitleUpdate}
      />
      <h1>{stickyNoteInfo.subtitle}</h1>
    </div>
  )
}
