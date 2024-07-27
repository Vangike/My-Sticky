import { BubbleMenu, Editor } from '@tiptap/react'
import { Icon } from '../../ui/Icon'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'

export type TextMenuProps = {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor)

  const buttonClassName = ''

  return (
    <BubbleMenu editor={editor} tippyOptions={{ popperOptions: { placement: 'top-start' } }}>
      <div className="flex gap-2 p-0.5 border-solid border border-gray-100 shadow-md bg-white rounded">
        <button onClick={commands.onBold} className={editor.isActive('bold') ? 'is-active' : ''}>
          <Icon name="Bold" />
        </button>
        <button
          onClick={commands.onItalic}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Icon name="Italic" />
        </button>
        <button
          onClick={commands.onUnderline}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <Icon name="Underline" />
        </button>
        <button
          onClick={commands.onStrike}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <Icon name="Strikethrough" />
        </button>
      </div>
    </BubbleMenu>
  )
}
