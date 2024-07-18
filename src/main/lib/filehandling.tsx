import { FolderResult, StickyNoteInfo } from '@shared/models'
import { dialog } from 'electron'
import { readdir, readFile, stat, writeFile } from 'fs-extra'

// This section handles loading in a folder and return a FolderResult object containing the list of sticky notes and filepath
export const loadFolder = async (): Promise<FolderResult | null> => {
  const folderPath = await getFolderPath()

  if (!folderPath) {
    return null
  }

  const stickyNoteResult = await getStickyNotesInPath(folderPath)

  return {
    path: folderPath,
    stickyNoteList: stickyNoteResult
  }
}

export const getFolderPath = async () => {
  const { filePaths, canceled } = await dialog.showOpenDialog({ properties: ['openDirectory'] })

  if (canceled) {
    console.info('canceled')
    return null
  }

  const filePath = filePaths[0]

  console.info(filePath)

  return filePath
}

export const getStickyNotesInPath = async (filePath: string) => {
  const stickyNotesNames = await readdir(filePath, {
    encoding: 'utf-8',
    withFileTypes: false
  })

  const notes = stickyNotesNames.filter((fileName) => fileName.endsWith('.json'))

  return Promise.all(notes.map((fileName) => getStickyNoteInfo(filePath, fileName)))
}

export const getStickyNoteInfo = async (path: string, file: string): Promise<StickyNoteInfo> => {
  const stats = await stat(`${path}/${file}`)
  const content = await readFile(`${path}/${file}`, { encoding: 'utf-8' })

  return {
    title: path + '\\' + file.replace(/\.json$/, ''),
    subtitle: '',
    lastEditTime: stats.mtimeMs,
    content: content
  }
}

// Save functionality
export const saveContent = async (filename: string, content: string) => {
  return writeFile(`${filename}.json`, content, { encoding: 'utf-8' })
}

// Read sticky note content

export const readContent = async (filename: string) => {
  return readFile(`${filename}.json`, { encoding: 'utf-8' })
}
