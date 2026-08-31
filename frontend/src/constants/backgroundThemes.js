export const BACKGROUND_THEMES = {
  'night-sky': {
    id: 'night-sky',
    label: 'Cielo estrellado',
    image: '/images/backgrounds/night-sky-milky-way.png',
    position: 'center center',
  },
  underwater: {
    id: 'underwater',
    label: 'Océano',
    image: '/images/backgrounds/underwater-ocean.png',
    position: 'center center',
  },
  knight: {
    id: 'knight',
    label: 'Caballero',
    image: '/images/backgrounds/knight-field.png',
    position: 'center center',
  },
  'car-night': {
    id: 'car-night',
    label: 'Auto nocturno',
    image: '/images/backgrounds/car-night.png',
    position: 'center center',
  },
  subway: {
    id: 'subway',
    label: 'Metro',
    image: '/images/backgrounds/subway-tunnel.png',
    position: 'center center',
  },
  forest: {
    id: 'forest',
    label: 'Bosque',
    image: '/images/backgrounds/forest-road.png',
    position: 'center center',
  },
}

export const BACKGROUND_THEME_IDS = Object.keys(BACKGROUND_THEMES)

export const DEFAULT_BACKGROUND_ID = 'night-sky'

export const getBackgroundTheme = (id) =>
  BACKGROUND_THEMES[id] || BACKGROUND_THEMES[DEFAULT_BACKGROUND_ID]
