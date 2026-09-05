import { useEffect } from 'react'

/** Bloquea scroll en html/body (Home hub, Proyectos hub). */
export function useLockBodyScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    document.documentElement.classList.add('home-no-scroll')
    document.body.classList.add('home-no-scroll')

    return () => {
      document.documentElement.classList.remove('home-no-scroll')
      document.body.classList.remove('home-no-scroll')
    }
  }, [enabled])
}
