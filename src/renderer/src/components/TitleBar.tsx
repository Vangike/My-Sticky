import { useTextmenuCommands } from '@renderer/sticky_note/editor/menus/TextMenu/hooks/useTextmenuCommands'
import { cn } from '@renderer/utils'
import { ComponentProps, HTMLProps, useCallback } from 'react'

type TitleButtonProps = HTMLProps<HTMLButtonElement> & {
  withRed?: boolean
}

const TitleButton = ({
  className,
  value,
  withRed = false,
  onClick,
  ...props
}: TitleButtonProps) => {
  const titleClass = cn(
    className,
    'titlebar-button flex-1 text-base transition ease-in-out duration-100',
    withRed ? 'hover:bg-red-500' : 'hover:bg-neutral-500'
  )

  return (
    <button className={titleClass} onClick={onClick}>
      {value}
    </button>
  )
}

const useTitleCommands = () => {
  const minimize = async () => {
    window.api.appMinimize()
  }

  const close = async () => {
    window.api.appClose()
  }

  return {
    minimize,
    close
  }
}

export const TitleBar = () => {
  const titleCommands = useTitleCommands()

  return (
    <nav className="titlebar flex flex-row width-full items-center bg-neutral-800 text-white justify-between">
      <div></div>
      <div className="flex flex-row w-12 space-x-1">
        <TitleButton value="&minus;" onClick={titleCommands.minimize} />
        <TitleButton withRed={true} value="&#10006;" onClick={titleCommands.close} />
      </div>
    </nav>
  )
}
