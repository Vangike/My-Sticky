import { Editor } from '@tiptap/react'
import { useCallback } from 'react'

export const useTextmenuCommands = (editor: Editor) => {
  const onBold = useCallback(() => editor.chain().focus().toggleBold().run(), [editor])
  const onItalic = useCallback(() => editor.chain().focus().toggleItalic().run(), [editor])
  const onStrike = useCallback(() => editor.chain().focus().toggleStrike().run(), [editor])
  const onUnderline = useCallback(() => editor.chain().focus().toggleUnderline().run(), [editor])

  const onChangeColor = useCallback(
    (color: string) => editor.chain().setColor(color).run(),
    [editor]
  )
  const onClearColor = useCallback(() => editor.chain().focus().unsetColor().run(), [editor])

  return {
    onBold,
    onItalic,
    onStrike,
    onUnderline,
    onChangeColor,
    onClearColor
  }
}
