import { Header, StickyNoteList } from '@/components'
import { TitleBar } from './components/TitleBar'

function App() {
  return (
    <div>
      <TitleBar />

      <div className="flex flex-col max-h-screen">
        <Header />

        <div id="Body" className="p-2 overflow-y-auto flex-1">
          <StickyNoteList className="space-y-3" />
        </div>
      </div>
    </div>
  )
}

export default App
