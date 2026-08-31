import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { DEFAULT_THEME } from './themeDefaults'
import { DEFAULT_BACKGROUND_ID } from '../constants/backgroundThemes'

const STORAGE_KEY = 'luis-shelo-app-settings'

export const DEFAULT_SETTINGS = {
  backgroundId: DEFAULT_BACKGROUND_ID,
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

    const parsed = JSON.parse(saved)
    return {
      ...DEFAULT_SETTINGS,
      backgroundId: parsed.backgroundId || DEFAULT_BACKGROUND_ID,
      cursorTheme: parsed.cursorTheme || DEFAULT_SETTINGS.cursorTheme,
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function ThemeProvider({ children }) {
  const [customizationMode, setCustomizationMode] = useState(false)
  const [settings, setSettings] = useState(loadSettings)
  const cursorThemeRef = useRef(settings.cursorTheme)

  useEffect(() => {
    applyThemeToDocument()
  }, [])

  useEffect(() => {
    cursorThemeRef.current = settings.cursorTheme
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const toggleCustomizationMode = () => {
    setCustomizationMode((prev) => !prev)
  }

  const setBackgroundId = (backgroundId) => {
    setSettings((prev) => ({ ...prev, backgroundId }))
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
        backgroundId: settings.backgroundId,
        cursorTheme: settings.cursorTheme,
        cursorThemeRef,
        setBackgroundId,
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
