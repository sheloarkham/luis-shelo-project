import { createContext, useContext, useRef, useCallback, useState } from 'react'

const ParticleThemeContext = createContext(null)

const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

const animateBlend = (blendRef, from, to, duration) =>
  new Promise((resolve) => {
    const start = performance.now()

    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = progress * progress * (3 - 2 * progress)
      blendRef.current = from + (to - from) * eased

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        resolve()
      }
    }

    requestAnimationFrame(step)
  })

export function ParticleThemeProvider({ children }) {
  const pinkBlendRef = useRef(0)
  const entranceLockRef = useRef(false)
  const [chromeHidden, setChromeHidden] = useState(false)
  const [yeniContentVisible, setYeniContentVisible] = useState(false)

  const resetTheme = useCallback(async () => {
    entranceLockRef.current = false
    setChromeHidden(false)
    setYeniContentVisible(false)
    await animateBlend(pinkBlendRef, pinkBlendRef.current, 0, 700)
  }, [])

  const runYeniEntrance = useCallback(async () => {
    if (entranceLockRef.current) return
    entranceLockRef.current = true

    setYeniContentVisible(false)
    setChromeHidden(true)
    pinkBlendRef.current = 0

    await wait(450)
    await animateBlend(pinkBlendRef, 0, 1, 1800)
    await wait(350)

    setYeniContentVisible(true)
    setChromeHidden(false)
  }, [])

  return (
    <ParticleThemeContext.Provider
      value={{
        pinkBlendRef,
        chromeHidden,
        yeniContentVisible,
        runYeniEntrance,
        resetTheme,
      }}
    >
      {children}
    </ParticleThemeContext.Provider>
  )
}

export function useParticleTheme() {
  const context = useContext(ParticleThemeContext)
  if (!context) {
    throw new Error('useParticleTheme debe usarse dentro de ParticleThemeProvider')
  }
  return context
}
