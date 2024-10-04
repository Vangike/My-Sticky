import BulletList from '@tiptap/extension-bullet-list'
import { Color } from '@tiptap/extension-color'
import ListKeymap from '@tiptap/extension-list-keymap'
import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

export const ExtensionKit = () => [
  StarterKit,
  BulletList.configure({
    HTMLAttributes: {
      class: 'list-disc pl-4'
    }
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: 'list-decimal pl-7'
    }
  }),
  ListKeymap,
  Underline,
  Color,
  TextStyle,
  TextAlign.configure({
    types: ['paragraph']
  }),
  Typography
]
