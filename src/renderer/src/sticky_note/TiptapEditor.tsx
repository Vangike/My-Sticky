import { Editor } from '@tiptap/core'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { atom, useSetAtom } from 'jotai'
import { debounce } from 'lodash'

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
        class: 'bg-blue-100 h-96'
      }
    },
    extensions: [StarterKit],
    content: JSON.parse(props.stickyNoteContent),
    onUpdate({ editor }) {
      // handleSaving(editor)
      handleSavingDebounce(editor, props.fileName, saveStickyContent)
    }
  })

  return (
    <>
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>

    // <EditorProvider extensions={extensions} content={props.stickyNoteContent}>
    //   <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
    //   <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    // </EditorProvider>
  )
}
