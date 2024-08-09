import { Editor } from '@tiptap/react'

export const useTextmenuStates = (editor: Editor) => {
  return {
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    isStrike: editor.isActive('strike'),
    isUnderline: editor.isActive('underline'),
    currentColor: editor.getAttributes('textStyle')?.color || undefined
  }
}
