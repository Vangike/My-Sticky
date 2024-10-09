import { Icon } from '@renderer/sticky_note/editor/ui/Icon'
import { cn } from '@renderer/utils'
import { icons } from 'lucide-react'
import { HTMLProps } from 'react'

export type TitleButtonProps = HTMLProps<HTMLButtonElement> & {
  isRed?: boolean
  isIcon?: boolean
}

export const TitleButton = ({
  className,
  value,
  isRed = false,
  isIcon = false,
  onClick,
  title
}: TitleButtonProps) => {
  const titleClass = cn(
    className,
    'titlebar-button flex-1 text-base transition ease-in-out duration-100 w-6 mix-blend-difference',
    isRed ? 'hover:bg-red-500' : !isIcon && 'hover:bg-neutral-500',
    isIcon ? 'w-6 h-6 flex items-center justify-center hover:bg-neutral-800' : ''
  )

  return (
    <button className={titleClass} onClick={onClick} title={title}>
      {isIcon ? <Icon name={value as keyof typeof icons} /> : <div>{value}</div>}
    </button>
  )
}
