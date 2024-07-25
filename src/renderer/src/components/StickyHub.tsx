import { filePathAtom, getListFromFolder, loadFolder, stickyListAtom } from '@renderer/store'
import { StickyNoteInfo } from '@shared/models'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

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

export const Header = () => {
  const setStickyFiles = useSetAtom(stickyListAtom)
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
        dir={dirPath}
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

const SearchBar = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={className} {...props}>
      Search...
    </div>
  )
}
