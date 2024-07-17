import { loadFolder, stickyNoteListAtoms } from '@renderer/store'
import { newStickyNote, openStickyNote } from '@renderer/utils'
import { StickyNoteInfo } from '@shared/models'
import { useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

export const OpenStickyNoteFunction = async (stickyNoteInfo: StickyNoteInfo) => {
  await openStickyNote(stickyNoteInfo)
}

export const NewStickyNoteFunction = async () => {
  await newStickyNote()
}

export const NewStickyNote = () => {
  const setStickyFiles = useSetAtom(stickyNoteListAtoms)

  const handleLoadFolder = async () => {
    const stickyFiles = await loadFolder()
    setStickyFiles(stickyFiles)
  }

  return (
    <div className="w-full bg-gradient-to-r from-neutral-700 to-neutral-800 flex flex-col items-center">
      <div className="w-11/12 bg-white mt-2 pl-2 rounded" onClick={handleLoadFolder}>
        <h1>Testing</h1>
      </div>

      <div className="w-full">
        <button
          type="button"
          className="text-9xl grow text-white w-full"
          onClick={NewStickyNoteFunction}
        >
          +
        </button>
      </div>
      <SearchBar className="w-11/12 bg-white mt-2 pl-2 rounded mb-2 italic" />
    </div>
  )
}

export const SearchBar = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={className} {...props}>
      Search...
    </div>
  )
}
