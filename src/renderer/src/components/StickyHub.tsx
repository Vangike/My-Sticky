import { filePathAtom, getListFromFolder, loadFolder, stickyFilesAtom } from '@renderer/store'
import { StickyNoteInfo } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

export const NewStickyNoteFunction = async () => {
  await newStickyNoteFuc()
}

export const openStickyNote = async (stickyNote: StickyNoteInfo) => {
  const openStickyNote = await window.api.stickyNote(stickyNote)

  if (!openStickyNote) {
    return
  }
}

export const newStickyNoteFuc = async () => {
  const newStickyNote: StickyNoteInfo = {
    title: '',
    subtitle: '',
    lastEditTime: Date.now(),
    content: '{}'
  }
  const stickyNote = await window.api.stickyNote(newStickyNote)

  if (!stickyNote) {
    return
  }
}

export const Header = () => {
  const setStickyFiles = useSetAtom(stickyFilesAtom)
  const setFilePathName = useSetAtom(filePathAtom)

  const handleLoadFolder = async () => {
    const folderResult = await loadFolder()
    const stickyFiles = getListFromFolder(folderResult)
    setStickyFiles(stickyFiles)
    setFilePathName(folderResult.path)
  }

  return (
    <div className="w-full bg-gradient-to-r from-neutral-700 to-neutral-800 flex flex-col items-center">
      <LoadFolder
        className="w-11/12 bg-white mt-2 pl-2 rounded cursor-cell"
        onClick={handleLoadFolder}
      />

      <NewStickyNote
        className="text-center text-9xl grow text-white w-full cursor-pointer"
        onClick={newStickyNoteFuc}
      />

      <SearchBar className="w-11/12 bg-white mt-2 pl-2 rounded mb-2 italic" />
    </div>
  )
}

const LoadFolder = ({ className, onClick, ...props }: ComponentProps<'div'>) => {
  const filePathName = useAtomValue(filePathAtom)
  const processedTitle = filePathName.replace(/^.*[\\/]/, '')

  return (
    <div className={className} onClick={onClick} {...props}>
      {filePathName ? (
        <h1>{processedTitle}</h1>
      ) : (
        <h1 className="italic">Click here to load in a folder</h1>
      )}
    </div>
  )
}

const NewStickyNote = ({ className, onClick, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={className} onClick={onClick} {...props}>
      +
    </div>
  )
}

const SearchBar = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={className} {...props}>
      Search...
    </div>
  )
}
