import { filePathAtom, stickyNoteAtom } from '@renderer/store'
import { StickyNoteInfo } from '@shared/models'
import { useAtom, useAtomValue } from 'jotai'

import { ComponentProps, useCallback, useState } from 'react'

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
  const handleTitleUpdate = useCallback((e) => {
    setTitle(e.target.value)
  }, [])

  const handleTitleChange = useCallback(() => {
    const fileName = stickyAtom!.title.replace(/^.*[\\/]/, '')

    if (title == fileName) {
      return
    }

    updateAtomTitle(filePath + '\\' + title)
    updateTitle(stickyAtom!.title, title)
  }, [title, stickyAtom])

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
        className="text-2xl w-full bg-inherit"
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
