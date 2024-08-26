import { filePathAtom, stickyNoteAtom } from '@renderer/store'
import { useAtom, useAtomValue } from 'jotai'

import { ComponentProps, useCallback, useState } from 'react'
import { messagePort } from './StickyNoteApp'

// Async function for updating title.
const updateTitle = async (oldName: string, newName: string) => {
  await window.api.renameNote(oldName, newName)
}

export const StickyNoteHeader = ({ className }: ComponentProps<'div'>) => {
  // Atoms for changing title
  const [stickyAtom, setStickyAtom] = useAtom(stickyNoteAtom)
  const [title, setTitle] = useState(stickyAtom!.title.replace(/^.*[\\/]/, ''))
  const filePath = useAtomValue(filePathAtom)

  // Functions to handle onChange & onBlur
  // This function changes the title as users are actively changing
  const handleTitleUpdate = useCallback((e) => {
    setTitle(e.target.value)
  }, [])

  // Once the user focus out of changing the title, the title change occurs
  const handleTitleChange = useCallback(async () => {
    const fileName = stickyAtom!.title.replace(/^.*[\\/]/, '')

    if (title == fileName) {
      return
    }

    const normalizeTitle = await window.api.pathNormalize(filePath + '\\' + title)

    messagePort.postMessage({
      type: 'TitleChange',
      content: { oldTitle: stickyAtom!.title, newTitle: normalizeTitle }
    })

    updateAtomTitle(normalizeTitle)
    // Update the title in the backend
    updateTitle(stickyAtom!.title, title)
  }, [title, stickyAtom])

  // This function updates the title for front end
  const updateAtomTitle = (title: string) => {
    setStickyAtom((prev) => {
      if (prev) {
        return { ...prev, title }
      }
      return prev
    })
  }

  return (
    <div className={className}>
      <input
        className="focus:outline-none text-xl w-full bg-inherit text-ellipsis truncate"
        type="text"
        tabIndex={-1}
        value={title}
        onChange={handleTitleUpdate}
        onBlur={handleTitleChange}
      />
      <h1>{stickyAtom?.subtitle}</h1>
    </div>
  )
}
