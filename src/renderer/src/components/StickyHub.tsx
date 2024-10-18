import { filePathAtom, getListFromFolder, loadFolder, stickyListAtom } from '@renderer/store'
import { cn } from '@renderer/utils'
import { StickyNoteInfo } from '@shared/models'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps, useEffect } from 'react'

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
  const dirPath = useAtomValue(filePathAtom)
  const headerStyle = cn(
    className,
    'w-full flex flex-col items-center border-b-4 border-neutral-100/95'
  )

  return (
    <div className={headerStyle} {...props}>
      <LoadFolder className="w-11/12 bg-white mt-2 pl-2 rounded cursor-pointer text-xl" />

      <NewStickyNote
        className="text-center text-7xl grow text-white w-full cursor-cell"
        dir={dirPath}
      />
    </div>
  )
}

// Loadfolder component
const LoadFolder = ({ className, ...props }: ComponentProps<'div'>) => {
  const [filePathName, setFilePathName] = useAtom(filePathAtom)
  const processedTitle = filePathName.replace(/^.*[\\/]/, '')

  const setStickyFiles = useSetAtom(stickyListAtom)

  // Hook to auto load in folder
  useEffect(() => {
    const autoLoad = async () => {
      if (filePathName) {
        console.log('Auto load has triggered!')
        const folderResult = await loadFolder({ filePath: filePathName })
        const stickyFiles = getListFromFolder(folderResult)
        setStickyFiles(stickyFiles)
      }
    }

    autoLoad()
  }, [filePathName])

  // Manually load in folder function
  const handleLoadFolder = async () => {
    const folderResult = await loadFolder({ filePath: '' })
    const stickyFiles = getListFromFolder(folderResult)
    setStickyFiles(stickyFiles)
    setFilePathName(folderResult.path)
  }

  return (
    <div className={className} onClick={handleLoadFolder} {...props}>
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
