import { filePathAtom, getListFromFolder, loadFolder, stickyFilesAtom } from '@renderer/store'
import { newStickyNote, openStickyNote } from '@renderer/utils'
import { StickyNoteInfo } from '@shared/models'
import { useAtom, useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

export const OpenStickyNoteFunction = async (stickyNoteInfo: StickyNoteInfo) => {
  await openStickyNote(stickyNoteInfo)
}

export const NewStickyNoteFunction = async () => {
  await newStickyNote()
}

export const NewStickyNote = () => {
  const setStickyFiles = useSetAtom(stickyFilesAtom)
  const [filePathName, setFilePathName] = useAtom(filePathAtom)

  const handleLoadFolder = async () => {
    const folderResult = await loadFolder()
    const stickyFiles = getListFromFolder(folderResult)
    setStickyFiles(stickyFiles)
    setFilePathName(folderResult.path)
  }

  const processedTitle = filePathName.replace(/^.*[\\/]/, '')

  return (
    <div className="w-full bg-gradient-to-r from-neutral-700 to-neutral-800 flex flex-col items-center">
      <div className="w-11/12 bg-white mt-2 pl-2 rounded" onClick={handleLoadFolder}>
        {filePathName ? (
          <h1>{processedTitle}</h1>
        ) : (
          <h1 className="italic">Click here to load in a folder</h1>
        )}
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
