import { Editor } from '@tiptap/react'

export const useTextmenuStates = (editor: Editor) => {
  return {
    isBold: editor.isActive('bold'),
    isItalic: editor.isActive('italic'),
    isStrike: editor.isActive('strike'),
    isUnderline: editor.isActive('underline'),
    isBullet: editor.isActive('bulletList'),
    isOrdered: editor.isActive('orderedList'),

    isLeft: editor.isActive({ textAlign: 'left' }),
    isCenter: editor.isActive({ textAlign: 'center' }),
    isRight: editor.isActive({ textAlign: 'right' }),

    currentColor: editor.getAttributes('textStyle')?.color || undefined
  }
}
