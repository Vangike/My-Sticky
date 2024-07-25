import { filePathAtom, getListFromFolder, loadFolder, stickyFilesAtom } from '@renderer/store'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

export const newStickyFunction = async (dir: string) => {
  const newSticky = await window.api.newStickyNote(dir)

  if (!newSticky) {
    return
  }
}

export const Header = () => {
  const setStickyFiles = useSetAtom(stickyFilesAtom)
  const [dirPath, setFilePathName] = useAtom(filePathAtom)

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
        onClick={() => newStickyFunction(dirPath)}
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
