import { Editor } from '@tiptap/core'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { atom, useSetAtom } from 'jotai'
import { debounce } from 'lodash'
import { DivTextMenu, TextMenu } from './menus/TextMenu/TextMenu'

const saveContentAtom = atom(null, async (get, set, fileName: string, newContent: string) => {
  window.api.saveContent(fileName, newContent)
})

const handleSavingDebounce = debounce(async (editor: Editor, fileName: string, saveAtom) => {
  console.info('Auto saving: ' + fileName)
  await saveAtom(fileName, JSON.stringify(editor.getJSON()))
}, 250)

export const TiptapEditor = (props: { fileName: string; stickyNoteContent: string }) => {
  const saveStickyContent = useSetAtom(saveContentAtom)

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'tiptap'
      }
    },
    extensions: [StarterKit, Underline, Color, TextStyle],
    content: JSON.parse(props.stickyNoteContent),
    onUpdate({ editor }) {
      handleSavingDebounce(editor, props.fileName, saveStickyContent)
    }
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="flex flex-col h-full max-h-screen">
        <EditorContent editor={editor} className="flex-grow overflow-auto" />
        <DivTextMenu editor={editor} />
      </div>
    </>
  )
}
