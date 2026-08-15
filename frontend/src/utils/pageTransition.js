const FADE_OUT_MS = 350

export function runPageFadeOut(element) {
  if (!element) {
    return Promise.resolve()
  }

  element.classList.add('page-transition-shell--out')
  element.style.pointerEvents = 'none'

  return new Promise((resolve) => {
    window.setTimeout(() => {
      element.classList.remove('page-transition-shell--out')
      element.style.pointerEvents = ''
      resolve()
    }, FADE_OUT_MS)
  })
}
