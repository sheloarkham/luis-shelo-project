import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  getPageTransitionKind,
  getTransitionDirection,
  MIST_CLOSE_MS,
  MIST_OPEN_MS,
  PAGE_TRANSITION,
} from '../utils/pageTransition'

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

const nextFrame = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clearShellClasses = (shell) => {
  shell?.classList.remove(
    'page-transition-shell--enter-forward',
    'page-transition-shell--enter-backward',
    'page-transition-shell--exit-forward',
    'page-transition-shell--exit-backward'
  )
}

export function usePageTransition(contentRef) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [mistPhase, setMistPhase] = useState(null)

  const displayLocationRef = useRef(displayLocation)

  displayLocationRef.current = displayLocation

  useEffect(() => {
    const target = location
    const current = displayLocationRef.current

    if (target.pathname === current.pathname && target.key === current.key) {
      return undefined
    }

    let cancelled = false

    const animateTo = async (fromLoc, toLoc) => {
      const fromPath = fromLoc.pathname
      const toPath = toLoc.pathname
      const transitionKind = prefersReducedMotion()
        ? PAGE_TRANSITION.NONE
        : getPageTransitionKind(fromPath, toPath)

      const shell = contentRef.current

      if (transitionKind === PAGE_TRANSITION.NONE) {
        clearShellClasses(shell)
        window.scrollTo(0, 0)
        setDisplayLocation(toLoc)
        displayLocationRef.current = toLoc
        return
      }

      const direction = getTransitionDirection(fromPath, toPath)
      const exitClass = `page-transition-shell--exit-${direction}`
      const enterClass = `page-transition-shell--enter-${direction}`

      try {
        clearShellClasses(shell)
        shell?.classList.add(exitClass)
        void shell?.offsetHeight

        setMistPhase({ stage: 'closing', direction })
        await wait(MIST_CLOSE_MS)
        if (cancelled) return

        shell?.classList.remove(exitClass)
        window.scrollTo(0, 0)
        setDisplayLocation(toLoc)
        displayLocationRef.current = toLoc

        await nextFrame()
        if (cancelled) return

        shell?.classList.add(enterClass)
        void shell?.offsetHeight

        setMistPhase({ stage: 'opening', direction })
        await wait(MIST_OPEN_MS)
        if (cancelled) return
      } finally {
        clearShellClasses(shell)
        setMistPhase(null)
      }
    }

    const run = async () => {
      await animateTo(current, target)
    }

    run()

    return () => {
      cancelled = true
    }
  }, [location, contentRef])

  return { displayLocation, mistPhase }
}
