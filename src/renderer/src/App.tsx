import { Header, StickyNoteList } from '@/components'

function App() {
  return (
    <div className="flex flex-col max-h-screen">
      <Header />

      <div id="Body" className="p-2 overflow-y-auto flex-1">
        <StickyNoteList className="space-y-3" />
      </div>
    </div>
  )
}

export default App
