import { NewStickyNote, StickyNoteList } from '@/components'

function App() {
  return (
    <div className="flex flex-col max-h-screen">
      <NewStickyNote />

      <div id="Body" className="p-2 space-y-2 overflow-y-auto flex-1">
        <StickyNoteList className="space-y-2" />
      </div>
    </div>
  )
}

export default App
