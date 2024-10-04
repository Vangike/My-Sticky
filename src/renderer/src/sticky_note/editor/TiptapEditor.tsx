import { Editor } from '@tiptap/core'
import BulletList from '@tiptap/extension-bullet-list'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { atom, useSetAtom } from 'jotai'
import { debounce } from 'lodash'
import { useRef, useState } from 'react'
import { ExtensionKit } from './ExtensionKit'
import { DivTextMenu } from './menus/TextMenu/TextMenu'

const saveContentAtom = atom(null, async (get, set, fileName: string, newContent: string) => {
  window.api.saveContent(fileName, newContent)
})

const handleSavingDebounce = debounce(async (editor: Editor, fileName: string, saveAtom) => {
  console.info('Auto saving: ' + fileName)
  await saveAtom(fileName, JSON.stringify(editor.getJSON()))
}, 250)

export const TiptapEditor = (props: { fileName: string; stickyNoteContent: string }) => {
  const saveStickyContent = useSetAtom(saveContentAtom)
  const [selected, setSelected] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'tiptap'
      }
    },
    extensions: [...ExtensionKit()],
    content: JSON.parse(props.stickyNoteContent),
    onUpdate({ editor }) {
      handleSavingDebounce(editor, props.fileName, saveStickyContent)
    }
  })

  const handleBlur = (e) => {
    if (menuRef.current && menuRef.current.contains(e.relatedTarget)) {
      return
    }
    setSelected(false)
  }

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="flex flex-col h-full max-h-screen">
        <EditorContent
          editor={editor}
          className="flex-grow overflow-auto"
          onClick={() => setSelected(true)}
          onBlur={handleBlur}
        />
        {selected ? (
          <DivTextMenu className="min-h-4" editor={editor} ref={menuRef} />
        ) : (
          <div className="min-h-4" />
        )}
      </div>
    </>
  )
}
