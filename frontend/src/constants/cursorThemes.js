export const CURSOR_THEMES = {
  blue: {
    id: 'blue',
    label: 'Azul',
    swatch: '#66bbff',
    dropletCore: 'rgba(220, 245, 255, 0.92)',
    dropletEdge: 'rgba(90, 170, 255, 0.55)',
    rippleStroke: 'rgba(120, 200, 255, 0.45)',
    rippleGlow: 'rgba(80, 160, 255, 0.18)',
    splash: 'rgba(170, 220, 255, 0.7)',
  },
  pink: {
    id: 'pink',
    label: 'Rosa',
    swatch: '#ff6b9d',
    dropletCore: 'rgba(255, 230, 240, 0.92)',
    dropletEdge: 'rgba(255, 120, 180, 0.55)',
    rippleStroke: 'rgba(255, 150, 195, 0.45)',
    rippleGlow: 'rgba(255, 105, 157, 0.18)',
    splash: 'rgba(255, 190, 215, 0.7)',
  },
  black: {
    id: 'black',
    label: 'Negro',
    swatch: '#d1d5db',
    dropletCore: 'rgba(245, 245, 245, 0.9)',
    dropletEdge: 'rgba(160, 160, 160, 0.5)',
    rippleStroke: 'rgba(190, 190, 190, 0.4)',
    rippleGlow: 'rgba(120, 120, 120, 0.16)',
    splash: 'rgba(210, 210, 210, 0.65)',
  },
  red: {
    id: 'red',
    label: 'Rojo',
    swatch: '#ff4444',
    dropletCore: 'rgba(255, 230, 230, 0.92)',
    dropletEdge: 'rgba(255, 90, 90, 0.55)',
    rippleStroke: 'rgba(255, 130, 130, 0.45)',
    rippleGlow: 'rgba(255, 70, 70, 0.18)',
    splash: 'rgba(255, 170, 170, 0.7)',
  },
  gold: {
    id: 'gold',
    label: 'Dorado',
    swatch: '#ffd700',
    dropletCore: 'rgba(255, 250, 225, 0.92)',
    dropletEdge: 'rgba(255, 200, 80, 0.55)',
    rippleStroke: 'rgba(255, 220, 120, 0.45)',
    rippleGlow: 'rgba(255, 190, 60, 0.18)',
    splash: 'rgba(255, 235, 170, 0.7)',
  },
}

export const CURSOR_THEME_IDS = Object.keys(CURSOR_THEMES)

export const getCursorTheme = (id) => CURSOR_THEMES[id] || CURSOR_THEMES.gold
