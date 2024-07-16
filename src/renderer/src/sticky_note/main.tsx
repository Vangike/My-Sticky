import '../assets/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { StickyNoteApp } from './StickyNoteApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StickyNoteApp />
  </React.StrictMode>
)
