export const ESCRITOS_ROUTE = '/proyectos/escritos'
export const YENI_ROUTE = '/yeni'

export const SHADOW_FOLD_CLOSE_MS = 820
export const SHADOW_FOLD_OPEN_MS = 880

export const DISSOLVE_CLOSE_MS = 780
export const DISSOLVE_OPEN_MS = 820

export const PAGE_TRANSITION = {
  NONE: 'none',
  DISSOLVE: 'dissolve',
  SHADOW_FOLD: 'shadow-fold',
}

export const shouldUseShadowFoldTransition = (fromPath, toPath) =>
  fromPath === ESCRITOS_ROUTE || toPath === ESCRITOS_ROUTE

export const shouldSkipPageTransition = (fromPath, toPath) =>
  fromPath === YENI_ROUTE || toPath === YENI_ROUTE

export const getPageTransitionKind = (fromPath, toPath) => {
  if (shouldUseShadowFoldTransition(fromPath, toPath)) {
    return PAGE_TRANSITION.SHADOW_FOLD
  }

  if (shouldSkipPageTransition(fromPath, toPath)) {
    return PAGE_TRANSITION.NONE
  }

  return PAGE_TRANSITION.DISSOLVE
}

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

export function runDissolveClose(setPhase, element) {
  if (element) {
    element.classList.add('page-transition-shell--dissolve-out')
    element.style.pointerEvents = 'none'
  }

  setPhase('closing')

  return wait(DISSOLVE_CLOSE_MS).then(() => {
    if (element) {
      element.classList.remove('page-transition-shell--dissolve-out')
      element.style.pointerEvents = ''
    }
  })
}

export function runDissolveOpen(setPhase) {
  setPhase('opening')

  return wait(DISSOLVE_OPEN_MS).then(() => {
    setPhase(null)
  })
}

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
