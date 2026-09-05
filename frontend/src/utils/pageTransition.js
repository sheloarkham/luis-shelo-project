export const YENI_ROUTE = '/yeni'

export const MIST_CLOSE_MS = 780
export const MIST_OPEN_MS = 860

export const PAGE_TRANSITION = {
  NONE: 'none',
  MIST: 'mist',
}

/** Orden lógico del navbar para decidir dirección del deslizamiento */
const ROUTE_ORDER = [
  '/',
  '/ocio',
  '/presupuestos',
  '/proyectos',
  '/proyectos/fullstack',
  '/proyectos/autito',
  '/proyectos/escritos',
  '/carrera',
  '/gym',
  '/yeni',
  '/chat',
]

export const TRANSITION_DIRECTION = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
}

export const shouldSkipPageTransition = (fromPath, toPath) =>
  fromPath === YENI_ROUTE || toPath === YENI_ROUTE

export const getPageTransitionKind = (fromPath, toPath) => {
  if (shouldSkipPageTransition(fromPath, toPath)) {
    return PAGE_TRANSITION.NONE
  }

  return PAGE_TRANSITION.MIST
}

const getRouteIndex = (path) => {
  const exact = ROUTE_ORDER.indexOf(path)
  if (exact >= 0) return exact

  if (path.startsWith('/proyectos/')) {
    const sub = ROUTE_ORDER.indexOf(path)
    return sub >= 0 ? sub : 3.4
  }

  if (path.startsWith('/proyectos')) return 3

  return ROUTE_ORDER.length
}

export const getTransitionDirection = (fromPath, toPath) => {
  const fromIndex = getRouteIndex(fromPath)
  const toIndex = getRouteIndex(toPath)

  if (toIndex >= fromIndex) {
    return TRANSITION_DIRECTION.FORWARD
  }

  return TRANSITION_DIRECTION.BACKWARD
}
