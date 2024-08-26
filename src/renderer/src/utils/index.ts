import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const dateFormatter = new Intl.DateTimeFormat(window.api.locale, {
  dateStyle: 'short',
  timeStyle: 'short'
})

export const formateDateFromMs = (ms: number) => dateFormatter.format(ms)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
