import { cn } from '@renderer/utils'
import { HTMLProps } from 'react'
import { TitleButton } from './TitleButton'
import { useStickyTitleCommands, useTitleCommands } from './TitleCommands'

type TitleBarProps = HTMLProps<HTMLDivElement> & {
  isStickyNote?: boolean
}

// Title bar addon for individual sticky notes
const StickyNoteTitleBar = () => {
  const stickyTitleCommands = useStickyTitleCommands()

  return (
    <>
      <TitleButton value="&#94;" onClick={stickyTitleCommands.dropdown} title="Dropdown" />
    </>
  )
}

// Standard title bar
export const TitleBar = ({ className, isStickyNote = false, ...props }: TitleBarProps) => {
  const titleCommands = useTitleCommands()
  const titleBarStyle = cn(
    className,
    'titlebar flex flex-row width-full items-center bg-inherit backdrop-brightness-50 text-white justify-between'
  )

  return (
    <div className={titleBarStyle} {...props}>
      <div>
        {isStickyNote && (
          <TitleButton isIcon={true} onClick={titleCommands.openHub} value="NotebookText" />
        )}
      </div>

      <div className="flex flex-row w-auto">
        {isStickyNote && <StickyNoteTitleBar />}

        <TitleButton value="&minus;" onClick={titleCommands.minimize} title="Minimize" />
        <TitleButton isRed={true} value="&#10006;" onClick={titleCommands.close} title="Close" />
      </div>
    </div>
  )
}
