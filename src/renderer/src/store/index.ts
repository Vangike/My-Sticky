import { FolderResult, StickyNoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const stickyListAtom = atom<StickyNoteInfo[] | null>(null)
export const filePathAtom = atomWithStorage('filePath', '')

export const stickyNoteAtom = atom<StickyNoteInfo | null>(null)

export const loadFolder = async () => {
  const folderResult: FolderResult = await window.api.loadFolder()
  return folderResult
}

export const getListFromFolder = (folder: FolderResult) => {
  const stickyNoteList = folder.stickyNoteList
  return stickyNoteList?.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

export const getStoredListFromFolder = async (path: string) => {
  const stickyList = await window.api.getStickyNotesInPath(path)
  return stickyList
}

export const readContentFromFile = async (fileName: string) => {
  const content: string = await window.api.readContent(fileName)
  return content
}
