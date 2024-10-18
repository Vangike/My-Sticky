import { Header, StickyNoteList } from '@/components'
import { useEffect, useState } from 'react'
import { TitleBar } from './components/TitleBar/TitleBar'

export let messagePort
window.onmessage = (e) => {
  console.log(e.data)
  messagePort = e.ports[0]
}

function App() {
  const [isFocused, setFocused] = useState(false)

  return (
    <div
      className="flex flex-col max-h-screen"
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="bg-gradient-to-r from-neutral-600 to-neutral-700">
        {isFocused ? <TitleBar /> : <div className="w-full h-6"></div>}

        <Header />
      </div>

      <div id="Body" className="p-2 overflow-y-auto flex-1">
        <StickyNoteList className="space-y-3" />
      </div>
    </div>
  )
}

export default App
