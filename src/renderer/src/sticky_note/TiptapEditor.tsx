import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]

declare global {
  interface TipTap {
    editor: Editor | null
  }
}

export const TiptapEditor = (props: { stickyNoteContent: string }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'bg-blue-100 h-96'
      }
    },
    extensions: [StarterKit],
    content: `${props.stickyNoteContent}`
  })

  return (
    <>
      <EditorContent editor={editor} />
    </>

    // <EditorProvider extensions={extensions} content={props.stickyNoteContent}>
    //   <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
    //   <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    // </EditorProvider>
  )
}
