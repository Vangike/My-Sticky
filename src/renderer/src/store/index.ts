import { StickyNoteInfo } from '@shared/models'
import { atom } from 'jotai'

export const stickyFilesAtom = atom<StickyNoteInfo[] | null>(null)

export const stickyNoteListAtoms = atom(
  (get) => get(stickyFilesAtom),
  (get, set, list: StickyNoteInfo[] | null) => {
    set(stickyFilesAtom, list)
  }
)

export const loadFolder = async () => {
  const stickyNoteList = await window.api.loadFolder()

  if (!stickyNoteList) {
    return null
  }

  return stickyNoteList?.sort((a, b) => b.lastEditTime - a.lastEditTime)
}
