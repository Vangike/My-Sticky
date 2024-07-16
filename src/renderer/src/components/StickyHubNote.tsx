import { mockNotes } from '@renderer/store/example'
import { formateDateFromMs } from '@renderer/utils'
import { StickyNoteInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { OpenStickyNoteFunction } from './StickyHub'

export type StickyNoteProps = StickyNoteInfo & ComponentProps<'div'>
export type StickyNoteListProps = ComponentProps<'ul'>

// Display a list of sticky notes
export const StickyNoteList = ({ className, ...props }: StickyNoteListProps) => {
  return (
    <ul className={className} {...props}>
      {mockNotes.map((note, index) => (
        <StickyNotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}

// An individual sticky note
export const StickyNotePreview = ({
  title,
  subtitle,
  content,
  lastEditTime,
  className,
  ...props
}: StickyNoteProps) => {
  const date = formateDateFromMs(lastEditTime)

  return (
    <div
      className="bg-amber-200 h-36 rounded-lg flex flex-col cursor-pointer"
      onClick={() => OpenStickyNoteFunction({ title, subtitle, lastEditTime, content })}
      {...props}
    >
      <div className="flex justify-between">
        <h3 className="ml-2 pt-2 mb-1 font-bold truncate">{title}</h3>
        <button className="mr-2" onClick={(event) => StickyNoteDelete(event)}>
          Delete
        </button>
      </div>
      <h1 className="ml-2 truncate">{subtitle}</h1>
      <p className="ml-2 truncate">{content}</p>
      <h1 className="ml-2 mt-auto">{date}</h1>
    </div>
  )
}

// Handle deletion of a sticky note
const StickyNoteDelete = (e) => {
  e.stopPropagation()
}
