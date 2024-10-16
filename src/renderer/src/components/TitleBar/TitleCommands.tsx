// Main functions for the main window
export const useTitleCommands = () => {
  const minimize = () => {
    window.api.appMinimize()
  }

  const close = () => {
    window.api.appClose()
  }

  const openHub = () => {
    window.api.appOpenHub()
  }

  return {
    minimize,
    close,
    openHub
  }
}

// Functions for seperate individual sticky notes
export const useStickyTitleCommands = () => {
  const dropdown = () => {
    window.api.appDropdown()
  }

  return {
    dropdown
  }
}
