import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { DEFAULT_THEME } from './themeDefaults'

const STORAGE_KEY = 'luis-shelo-app-settings'

export const DEFAULT_SETTINGS = {
  particleTheme: 'blue',
  cursorTheme: 'gold',
}

const ThemeContext = createContext(null)

const applyThemeToDocument = () => {
  const root = document.documentElement
  root.style.setProperty('--color-navbar-bg', DEFAULT_THEME.navbarBg)
  root.style.setProperty('--color-navbar-text', DEFAULT_THEME.navbarText)
  root.style.setProperty('--color-page-bg', DEFAULT_THEME.pageBg)
  root.style.setProperty('--color-page-text', DEFAULT_THEME.pageText)
}

const loadSettings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function ThemeProvider({ children }) {
  const [customizationMode, setCustomizationMode] = useState(false)
  const [settings, setSettings] = useState(loadSettings)
  const particleThemeRef = useRef(settings.particleTheme)
  const cursorThemeRef = useRef(settings.cursorTheme)

  useEffect(() => {
    applyThemeToDocument()
  }, [])

  useEffect(() => {
    particleThemeRef.current = settings.particleTheme
    cursorThemeRef.current = settings.cursorTheme
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const toggleCustomizationMode = () => {
    setCustomizationMode((prev) => !prev)
  }

  const setParticleTheme = (theme) => {
    setSettings((prev) => ({ ...prev, particleTheme: theme }))
  }

  const setCursorTheme = (theme) => {
    setSettings((prev) => ({ ...prev, cursorTheme: theme }))
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  return (
    <ThemeContext.Provider
      value={{
        customizationMode,
        toggleCustomizationMode,
        settings,
        particleTheme: settings.particleTheme,
        cursorTheme: settings.cursorTheme,
        particleThemeRef,
        cursorThemeRef,
        setParticleTheme,
        setCursorTheme,
        resetSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeCustomization() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeCustomization debe usarse dentro de ThemeProvider')
  }
  return context
}
