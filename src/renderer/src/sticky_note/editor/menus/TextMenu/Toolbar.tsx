import { cn } from '@renderer/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  activeClassname?: string
}

export type ButtonProps = {
  active?: boolean
  activeClassname?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ active, className, activeClassname, disabled, children, ...rest }, ref) => {
    const buttonClassName = cn(
      'flex group items-center justify-center border border-transparent gap-2 text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap',

      cn(
        'text-white bg-black border-black dark:text-black dark:bg-white dark:border-white',
        !disabled &&
          !active &&
          'hover:bg-neutral-800 active:bg-neutral-900 dark:hover:bg-neutral-200 dark:active:bg-neutral-300',
        active && cn('bg-neutral-900 dark:bg-neutral-300', activeClassname)
      ),

      className
    )

    return (
      <button ref={ref} disabled={disabled} className={buttonClassName} {...rest}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ children, className, activeClassname, ...rest }, ref) => {
    const buttonClass = cn('gap-1 min-w-[2rem] px-2 w-auto', className)

    const content = (
      <Button activeClassname={activeClassname} className={buttonClass} ref={ref} {...rest}>
        {children}
      </Button>
    )
    return content
  }
)

ToolbarButton.displayName = 'ToolbarButton'

export const Toolbar = {
  Button: ToolbarButton
}
