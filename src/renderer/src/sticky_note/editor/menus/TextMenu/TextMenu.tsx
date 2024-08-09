import * as Popover from '@radix-ui/react-popover'
import { BubbleMenu, Editor } from '@tiptap/react'
import { memo } from 'react'
import { Icon } from '../../ui/Icon'
import { ColorPicker } from './Color'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextmenuStates } from './hooks/useTextmenuStates'
import { Surface } from './Surface'
import { Toolbar } from './Toolbar'

const MemoButton = memo(Toolbar.Button)
const MemoColorPicker = memo(ColorPicker)

export type TextMenuProps = {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)

  return (
    <BubbleMenu editor={editor} tippyOptions={{ popperOptions: { placement: 'top-start' } }}>
      <div className="flex flex-row gap-1 p-0.5 border-solid border border-gray-100 shadow-md bg-white rounded">
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
            <MemoButton>
              <Icon name="Palette" />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side="top" sideOffset={8} asChild>
            <Surface className="p-1">
              <MemoColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
            </Surface>
          </Popover.Content>
        </Popover.Root>
      </div>
    </BubbleMenu>
  )
}
