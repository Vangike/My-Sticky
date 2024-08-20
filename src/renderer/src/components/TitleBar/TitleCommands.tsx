export const useTitleCommands = () => {
  const minimize = () => {
    window.api.appMinimize()
  }

  const close = () => {
    window.api.appClose()
  }

  return {
    minimize,
    close
  }
}

export const useStickyTitleCommands = () => {
  const dropdown = () => {
    window.api.appDropdown()
  }

  return {
    dropdown
  }
}
