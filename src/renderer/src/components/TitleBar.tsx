import { ComponentProps } from 'react'

const TitleButton = ({ value, ...props }: ComponentProps<'button'>) => {
  return <button className="titlebar-button flex-1 text-base">{value}</button>
}

export const TitleBar = () => {
  return (
    <nav className="titlebar flex flex-row width-full items-center bg-gray-900 text-white justify-between">
      <div>Test</div>
      <div className="flex flex-row w-12 space-x-1">
        <TitleButton value="&minus;" />
        <TitleButton value="&#10006;" />
      </div>
    </nav>
  )
}
