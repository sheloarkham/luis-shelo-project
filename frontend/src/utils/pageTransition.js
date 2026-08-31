export const YENI_ROUTE = '/yeni'

export const SHADOW_FOLD_CLOSE_MS = 820
export const SHADOW_FOLD_OPEN_MS = 880

export const PAGE_TRANSITION = {
  NONE: 'none',
  SHADOW_FOLD: 'shadow-fold',
}

export const shouldSkipPageTransition = (fromPath, toPath) =>
  fromPath === YENI_ROUTE || toPath === YENI_ROUTE

export const getPageTransitionKind = (fromPath, toPath) => {
  if (shouldSkipPageTransition(fromPath, toPath)) {
    return PAGE_TRANSITION.NONE
  }

  return PAGE_TRANSITION.SHADOW_FOLD
}

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

export function runShadowFoldClose(setPhase) {
  setPhase('closing')
  return wait(SHADOW_FOLD_CLOSE_MS)
}

export function runShadowFoldOpen(setPhase) {
  setPhase('opening')
  return wait(SHADOW_FOLD_OPEN_MS).then(() => {
    setPhase(null)
  })
}
