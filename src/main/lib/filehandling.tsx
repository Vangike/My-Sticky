import { FolderResult, StickyNoteInfo } from '@shared/models'
import { dialog } from 'electron'
import { existsSync, readdir, readFile, remove, rename, stat, writeFile } from 'fs-extra'
import path, { normalize } from 'path'

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

// Get the folder path
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

// Get a list of sticky notes from the path
export const getStickyNotesInPath = async (filePath: string) => {
  const stickyNotesNames = await readdir(filePath, {
    encoding: 'utf-8',
    withFileTypes: false
  })

  const notes = stickyNotesNames.filter((fileName) => fileName.endsWith('.json'))

  return Promise.all(notes.map((fileName) => getStickyNoteInfo(filePath, fileName)))
}

export const getStickyNoteInfo = async (path: string, file: string): Promise<StickyNoteInfo> => {
  const stats = await stat(normalize(`${path}/${file}`))
  const content = await readFile(normalize(`${path}/${file}`), { encoding: 'utf-8' })

  return {
    title: normalize(path + '\\' + file.replace(/\.json$/, '')),
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

// Create a new sticky note
export const newStickyNote = async (dirPath: string) => {
  const newFileName = 'newNote'

  let i = 0
  while (existsSync(normalize(`${dirPath}/${newFileName}${i}.json`))) {
    i++
  }

  const newFilePath = `${dirPath}/${newFileName}${i}.json`

  const { name: fileName, dir: parentDir } = path.parse(newFilePath)
  console.info(`Creating Sticky Note: ${fileName} at ${dirPath}`)

  await writeFile(newFilePath, '{"type":"doc","content":[{"type":"paragraph"}]}')

  return fileName
}

// Delete a sticky note
export const deleteStickyNote = async (fileName: string) => {
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Deleting sticky note',
    message: `Delete ${fileName}?`,
    buttons: ['Cancel', 'Delete'],
    defaultId: 0,
    cancelId: 0
  })

  if (response == 0) {
    console.info(`Canceled deleting ${fileName}`)
    return false
  }

  console.info(`Deleting ${fileName}`)
  await remove(`${fileName}.json`)
  return true
}

// Rename a sticky note
export const renameNote = async (filePath: string, newName: string) => {
  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (!filePath) {
    return false
  }

  const newPath = normalize(parentDir + '\\' + newName + '.json')

  return rename(filePath + '.json', newPath)
}
