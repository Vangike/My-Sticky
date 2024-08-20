import { cn } from '@renderer/utils'
import { HTMLProps } from 'react'

export type TitleButtonProps = HTMLProps<HTMLButtonElement> & {
  withRed?: boolean
}

export const TitleButton = ({
  className,
  value,
  withRed = false,
  onClick,
  ...props
}: TitleButtonProps) => {
  const titleClass = cn(
    className,
    'titlebar-button flex-1 text-base transition ease-in-out duration-100 w-6',
    withRed ? 'hover:bg-red-500' : 'hover:bg-neutral-500'
  )

  return (
    <button className={titleClass} onClick={onClick}>
      {value}
    </button>
  )
}
