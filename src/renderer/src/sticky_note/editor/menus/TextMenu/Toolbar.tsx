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
      'flex group items-center justify-center border border-transparent text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap',

      cn(
        'bg-transparent border-transparent text-neutral-500 dark:text-neutral-400',
        !disabled &&
          !active &&
          'hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:hover:bg-white/10 dark:hover:text-neutral-300 dark:active:text-neutral-200',
        active &&
          cn('bg-black/10 text-neutral-800 dark:bg-white/20 dark:text-neutral-200', activeClassname)
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
    const buttonClass = cn('min-w-4 px-0.5 w-auto', className)

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
