import { Header, StickyNoteList } from '@/components'
import { TitleBar } from './components/TitleBar/TitleBar'

export let port
window.onmessage = (e) => {
  console.log(e.data)
  port = e.ports[0]
}

function App() {
  return (
    <div className="flex flex-col max-h-screen">
      <TitleBar />
      <Header />

      <div id="Body" className="p-2 overflow-y-auto flex-1">
        <StickyNoteList className="space-y-3" />
      </div>
    </div>
  )
}

export default App
