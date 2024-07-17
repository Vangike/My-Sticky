import { FolderResult, StickyNoteInfo } from '@shared/models'
import { atom } from 'jotai'

export const stickyFilesAtom = atom<StickyNoteInfo[] | null>(null)
export const filePathAtom = atom<string>('')

export const stickyNoteListAtoms = atom(
  (get) => get(stickyFilesAtom),
  (get, set, list: StickyNoteInfo[] | null) => {
    set(stickyFilesAtom, list)
  }
)

export const loadFolder = async () => {
  const folderResult: FolderResult = await window.api.loadFolder()

  // if (!folderResult) {
  //   return null
  // }

  return folderResult
}

export const getStickyNoteFromFolder = (folder: FolderResult) => {
  const stickyNoteList = folder.stickyNoteList
  return stickyNoteList?.sort((a, b) => b.lastEditTime - a.lastEditTime)
}
