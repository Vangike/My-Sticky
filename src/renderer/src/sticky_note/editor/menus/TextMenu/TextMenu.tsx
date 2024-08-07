import * as Popover from '@radix-ui/react-popover'
import { BubbleMenu, Editor } from '@tiptap/react'
import { memo } from 'react'
import { Icon } from '../../ui/Icon'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextmenuStates } from './hooks/useTextmenuStates'
import { Toolbar } from './Toolbar'

const MemoButton = memo(Toolbar.Button)

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
        <MemoButton onClick={commands.onBold} active={states.isBold}>
          <Icon name="Bold" />
        </MemoButton>
        <MemoButton onClick={commands.onItalic} active={states.isItalic}>
          <Icon name="Italic" />
        </MemoButton>
        <MemoButton onClick={commands.onUnderline} active={states.isUnderline}>
          <Icon name="Underline" />
        </MemoButton>
        <MemoButton onClick={commands.onStrike} active={states.isStrike}>
          <Icon name="Strikethrough" />
        </MemoButton>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button>
              <Icon name="Palette" />
            </button>
          </Popover.Trigger>
          <Popover.Content side="top" sideOffset={8} asChild></Popover.Content>
        </Popover.Root>
      </div>
    </BubbleMenu>
  )
}
