export const BACKGROUND_THEMES = {
  'car-night': {
    id: 'car-night',
    label: 'Auto nocturno',
    image: '/images/backgrounds/car-night.png',
    position: 'center center',
  },
  'smoke-blue': {
    id: 'smoke-blue',
    label: 'Humo azul',
    image: '/images/backgrounds/smoke-blue.png',
    position: 'center center',
  },
  underwater: {
    id: 'underwater',
    label: 'Océano',
    image: '/images/backgrounds/underwater-ocean.png',
    position: 'center center',
  },
  'pink-clouds': {
    id: 'pink-clouds',
    label: 'Nubes rosadas',
    image: '/images/backgrounds/pink-clouds.png',
    position: 'center center',
  },
}

export const BACKGROUND_THEME_IDS = Object.keys(BACKGROUND_THEMES)

export const DEFAULT_BACKGROUND_ID = 'underwater'

export const getBackgroundTheme = (id) =>
  BACKGROUND_THEMES[id] || BACKGROUND_THEMES[DEFAULT_BACKGROUND_ID]
