const dateFormatter = new Intl.DateTimeFormat(window.api.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const formateDateFromMs = (ms: number) => dateFormatter.format(ms)
