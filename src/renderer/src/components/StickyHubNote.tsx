import { Icon } from '@renderer/sticky_note/editor/ui/Icon'
import { stickyListAtom } from '@renderer/store'
import { formateDateFromMs } from '@renderer/utils'
import { StickyNoteInfo } from '@shared/models'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

export type StickyNoteProps = StickyNoteInfo & ComponentProps<'div'>
export type StickyNoteListProps = ComponentProps<'ul'>

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
      className="bg-amber-200 h-28 rounded-lg flex flex-col cursor-pointer shadow-md"
      onClick={() => openStickyNoteFunction({ title, subtitle, lastEditTime, content })}
      {...props}
    >
      <div className="flex justify-between">
        <h3 className="ml-2 pt-2 mb-1 font-bold truncate text-white mix-blend-difference">
          {processedTitle}
        </h3>

        <div className="mr-2 pt-2">
          <button
            className="rounded cursor-not-allowed text-white mix-blend-difference hover:text-neutral-500"
            onClick={(event) => {
              StickyNoteDelete(event, title)
              deleteSticky(title)
            }}
          >
            <Icon className="min-w-6 min-h-6" name="Trash2" strokeWidth={2} />
          </button>
        </div>
      </div>

      <h1 className="ml-2 truncate">{subtitle}</h1>
      <h1 className="ml-2 mt-auto text-white mix-blend-difference">{date}</h1>
    </div>
  )
}

// Open a sticky note functionality
const openStickyNoteFunction = async (stickyNoteInfo: StickyNoteInfo) => {
  await openStickyNote(stickyNoteInfo)
}

const openStickyNote = async (stickyNoteInfo: StickyNoteInfo) => {
  const openStickyNote = await window.api.stickyNote(stickyNoteInfo)

  if (!openStickyNote) {
    return
  }
}

// Handle deletion of a sticky note
const StickyNoteDelete = (e, title) => {
  e.stopPropagation()
  console.info(title)
}

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
