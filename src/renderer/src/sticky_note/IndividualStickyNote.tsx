import { StickyNoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

type StickyNoteHeaderProp = ComponentProps<'div'> & {
  stickyNoteInfo: StickyNoteInfo
}

export const StickyNoteHeader = ({ stickyNoteInfo, className }: StickyNoteHeaderProp) => {
  const processedTitle = stickyNoteInfo.title.replace(/^.*[\\/]/, '')

  return (
    <div className={className}>
      <h1 className="text-2xl">{processedTitle}</h1>
      <h1>{stickyNoteInfo.subtitle}</h1>
    </div>
  )
}
