import { Editor } from '@tiptap/react'
import { useCallback } from 'react'

export const useTextmenuCommands = (editor: Editor) => {
  const onBold = useCallback(() => editor.chain().focus().toggleBold().run(), [editor])
  const onItalic = useCallback(() => editor.chain().focus().toggleItalic().run(), [editor])
  const onStrike = useCallback(() => editor.chain().focus().toggleStrike().run(), [editor])
  const onUnderline = useCallback(() => editor.chain().focus().toggleUnderline().run(), [editor])
  const onBullet = useCallback(() => editor.chain().focus().toggleBulletList().run(), [editor])
  const onOrdered = useCallback(() => editor.chain().focus().toggleOrderedList().run(), [editor])

  const leftAlign = useCallback(() => editor.chain().focus().setTextAlign('left').run(), [editor])
  const centerAlign = useCallback(
    () => editor.chain().focus().setTextAlign('center').run(),
    [editor]
  )
  const rightAlign = useCallback(() => editor.chain().focus().setTextAlign('right').run(), [editor])

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
    onClearColor,
    onBullet,
    leftAlign,
    centerAlign,
    rightAlign,
    onOrdered
  }
}
