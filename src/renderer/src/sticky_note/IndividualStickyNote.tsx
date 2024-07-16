import { StickyNoteInfo } from '@shared/models'

export const StickyNoteHeader = (props: { stickyNoteInfo: StickyNoteInfo }) => {
  const { stickyNoteInfo } = props

  return (
    <div className="bg-amber-200 p-2">
      <h1 className="text-2xl">{stickyNoteInfo.title}</h1>
      <h1>{stickyNoteInfo.subtitle}</h1>
    </div>
  )
}
