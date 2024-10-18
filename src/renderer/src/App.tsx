import { Header, StickyNoteList } from '@/components'
import { TitleBar } from './components/TitleBar/TitleBar'

export let messagePort
window.onmessage = (e) => {
  console.log(e.data)
  messagePort = e.ports[0]
}

function App() {
  return (
    <div className="flex flex-col max-h-screen">
      <div className="bg-gradient-to-r from-neutral-600 to-neutral-700">
        <TitleBar />

        <Header />
      </div>

      <div id="Body" className="p-2 overflow-y-auto flex-1">
        <StickyNoteList className="space-y-3" />
      </div>
    </div>
  )
}

export default App
