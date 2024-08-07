import { BubbleMenu, Editor } from '@tiptap/react'
import { Icon } from '../../ui/Icon'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextmenuStates } from './hooks/useTextmenuStates'

export type TextMenuProps = {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)

  const buttonClassName = ''

  return (
    <BubbleMenu editor={editor} tippyOptions={{ popperOptions: { placement: 'top-start' } }}>
      <div className="flex gap-2 p-0.5 border-solid border border-gray-100 shadow-md bg-white rounded">
        <button onClick={commands.onBold} className={states.isBold ? 'is-active' : ''}>
          <Icon name="Bold" />
        </button>
        <button onClick={commands.onItalic} className={states.isItalic ? 'is-active' : ''}>
          <Icon name="Italic" />
        </button>
        <button onClick={commands.onUnderline} className={states.isItalic ? 'is-active' : ''}>
          <Icon name="Underline" />
        </button>
        <button onClick={commands.onStrike} className={states.isStrike ? 'is-active' : ''}>
          <Icon name="Strikethrough" />
        </button>
      </div>
    </BubbleMenu>
  )
}
