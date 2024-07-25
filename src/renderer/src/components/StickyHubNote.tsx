import { stickyListAtom } from '@renderer/store'
import { formateDateFromMs } from '@renderer/utils'
import { StickyNoteInfo } from '@shared/models'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

export type StickyNoteProps = StickyNoteInfo & ComponentProps<'div'>
export type StickyNoteListProps = ComponentProps<'ul'>

// Delete functionality
const deleteStickyAtom = atom(null, async (get, set, fileName: string) => {
  const noteList = get(stickyListAtom)

  if (fileName.length == 0 || !noteList) {
    return
  }

  const deleteSticky = await window.api.deleteStickyNote(fileName)

  if (!deleteSticky) {
    return
  }

  set(stickyListAtom, [
    ...noteList.filter((note) => {
      if (note.title == fileName) {
        return
      }
      return note
    })
  ])
})

// Open a sticky note functionality
const openStickyNoteFunction = async (stickyNoteInfo: StickyNoteInfo) => {
  await openStickyNote(stickyNoteInfo)
}

const openStickyNote = async (stickyNote: StickyNoteInfo) => {
  const openStickyNote = await window.api.stickyNote(stickyNote)

  if (!openStickyNote) {
    return
  }
}

// Display a list of sticky notes
export const StickyNoteList = ({ className, ...props }: StickyNoteListProps) => {
  const stickyNotes = useAtomValue(stickyListAtom)

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
  const deleteSticky = useSetAtom(deleteStickyAtom)

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
        <button
          className="mr-2"
          onClick={(event) => {
            StickyNoteDelete(event, title)
            deleteSticky(title)
          }}
        >
          Delete
        </button>
      </div>
      <h1 className="ml-2 truncate">{subtitle}</h1>
      <h1 className="ml-2 mt-auto">{date}</h1>
    </div>
  )
}

// Handle deletion of a sticky note
const StickyNoteDelete = (e, title) => {
  e.stopPropagation()
  console.info(title)
}
