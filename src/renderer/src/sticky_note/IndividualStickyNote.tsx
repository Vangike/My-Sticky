import { StickyNoteInfo } from '@shared/models'

export const StickyNoteHeader = (props: { stickyNoteInfo: StickyNoteInfo }) => {
  const { stickyNoteInfo } = props

  const processedTitle = stickyNoteInfo.title.replace(/^.*[\\/]/, '')

  return (
    <div className="bg-amber-200 p-2">
      <h1 className="text-2xl">{processedTitle}</h1>
      <h1>{stickyNoteInfo.subtitle}</h1>
    </div>
  )
}
