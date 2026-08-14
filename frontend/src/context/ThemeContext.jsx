import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'luis-shelo-theme-colors'

/** Colores por defecto del sitio */
export const DEFAULT_THEME = {
  navbarBg: 'rgba(0, 0, 0, 0.55)',
  navbarText: '#d4e4ff',
  pageBg: 'transparent',
  pageText: '#dce8ff',
}

const ThemeContext = createContext(null)

/**
 * Aplica los colores como variables CSS en :root.
 * Cualquier hoja de estilos puede usar var(--color-page-bg), etc.
 */
const applyThemeToDocument = (colors) => {
  const root = document.documentElement
  root.style.setProperty('--color-navbar-bg', colors.navbarBg)
  root.style.setProperty('--color-navbar-text', colors.navbarText)
  root.style.setProperty('--color-page-bg', colors.pageBg)
  root.style.setProperty('--color-page-text', colors.pageText)
}

export function ThemeProvider({ children }) {
  const [customizationMode, setCustomizationMode] = useState(false)
  const [colors, setColors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...DEFAULT_THEME, ...JSON.parse(saved) } : DEFAULT_THEME
    } catch {
      return DEFAULT_THEME
    }
  })

  useEffect(() => {
    applyThemeToDocument(colors)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors))
  }, [colors])

  const toggleCustomizationMode = () => {
    setCustomizationMode((prev) => !prev)
  }

  const updateColor = (key, value) => {
    setColors((prev) => ({ ...prev, [key]: value }))
  }

  const resetColors = () => {
    setColors(DEFAULT_THEME)
  }

  return (
    <ThemeContext.Provider
      value={{
        customizationMode,
        toggleCustomizationMode,
        colors,
        updateColor,
        resetColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

/** Hook para leer/ cambiar el tema desde cualquier componente */
export function useThemeCustomization() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeCustomization debe usarse dentro de ThemeProvider')
  }
  return context
}
