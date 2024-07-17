import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const TiptapEditor = (props: { name: string; stickyNoteContent: string }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'bg-blue-100 h-96'
      }
    },
    extensions: [StarterKit],
    content: `${props.stickyNoteContent}`,
    onUpdate({ editor }) {
      console.info(editor.getJSON())
    }
  })

  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
    </>

    // <EditorProvider extensions={extensions} content={props.stickyNoteContent}>
    //   <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
    //   <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    // </EditorProvider>
  )
}
