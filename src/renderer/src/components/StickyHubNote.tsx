import { stickyFilesAtom } from '@renderer/store'
import { formateDateFromMs } from '@renderer/utils'
import { StickyNoteInfo } from '@shared/models'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { openStickyNote } from './StickyHub'

export type StickyNoteProps = StickyNoteInfo & ComponentProps<'div'>
export type StickyNoteListProps = ComponentProps<'ul'>

const openStickyNoteFunction = async (stickyNoteInfo: StickyNoteInfo) => {
  await openStickyNote(stickyNoteInfo)
}

// Display a list of sticky notes
export const StickyNoteList = ({ className, ...props }: StickyNoteListProps) => {
  const stickyNotes = useAtomValue(stickyFilesAtom)

  if (!stickyNotes) {
    return
  }

  return (
    <ul className={className} {...props}>
      {stickyNotes.map((note) => (
        <StickyNotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}

// An individual sticky note
export const StickyNotePreview = ({
  title,
  subtitle,
  lastEditTime,
  className,
  content,
  ...props
}: StickyNoteProps) => {
  const date = formateDateFromMs(lastEditTime)

  const processedTitle = title.replace(/^.*[\\/]/, '')

  return (
    <div
      className="bg-amber-200 h-36 rounded-lg flex flex-col cursor-pointer"
      onClick={() => openStickyNoteFunction({ title, subtitle, lastEditTime, content })}
      {...props}
    >
      <div className="flex justify-between">
        <h3 className="ml-2 pt-2 mb-1 font-bold truncate">{processedTitle}</h3>
        <button className="mr-2" onClick={(event) => StickyNoteDelete(event)}>
          Delete
        </button>
      </div>
      <h1 className="ml-2 truncate">{subtitle}</h1>
      <h1 className="ml-2 mt-auto">{date}</h1>
    </div>
  )
}

// Handle deletion of a sticky note
const StickyNoteDelete = (e) => {
  e.stopPropagation()
}
