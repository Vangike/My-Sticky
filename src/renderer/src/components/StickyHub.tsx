import { filePathAtom, getListFromFolder, loadFolder, stickyListAtom } from '@renderer/store'
import { cn } from '@renderer/utils'
import { StickyNoteInfo } from '@shared/models'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

// Handle new sticky note functionality
type NewStickyNoteProp = ComponentProps<'div'> & {
  dir: string
}

const newStickyAtom = atom(null, async (get, set, dir: string) => {
  const noteList = get(stickyListAtom)

  if (dir.length == 0 || !noteList) {
    return
  }

  const newSticky = await window.api.newStickyNote(dir)

  if (!newSticky) {
    return
  }

  const newNote: StickyNoteInfo = {
    title: dir + '\\' + newSticky,
    subtitle: '',
    content: '',
    lastEditTime: Date.now()
  }

  set(stickyListAtom, [newNote, ...noteList.filter((note) => note.title !== newNote.title)])
})

// Header component for the Sticky Note application
export const Header = ({ className, ...props }: ComponentProps<'div'>) => {
  const setStickyFiles = useSetAtom(stickyListAtom)
  const [dirPath, setFilePathName] = useAtom(filePathAtom)

  const headerStyle = cn(
    className,
    'w-full flex flex-col items-center border-b-4 border-neutral-100/95'
  )

  const handleLoadFolder = async () => {
    const folderResult = await loadFolder()
    const stickyFiles = getListFromFolder(folderResult)
    setStickyFiles(stickyFiles)
    setFilePathName(folderResult.path)
  }

  return (
    <div className={headerStyle} {...props}>
      <LoadFolder
        className="w-11/12 bg-white mt-2 pl-2 rounded cursor-pointer text-xl"
        onClick={handleLoadFolder}
      />

      <NewStickyNote
        className="text-center text-7xl grow text-white w-full cursor-cell"
        dir={dirPath}
      />
    </div>
  )
}

// Loadfolder component
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

// Create a new sticky note component
const NewStickyNote = ({ className, dir, ...props }: NewStickyNoteProp) => {
  const createNew = useSetAtom(newStickyAtom)

  const newStickyFunction = async (dir) => {
    await createNew(dir)
  }

  return (
    <div className={className} onClick={() => newStickyFunction(dir)} {...props}>
      +
    </div>
  )
}
