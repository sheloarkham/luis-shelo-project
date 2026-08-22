export const CURSOR_THEMES = {
  blue: {
    id: 'blue',
    label: 'Azul',
    swatch: '#66bbff',
    trailCenter: 'rgba(170, 220, 255, 0.55)',
    trailMid: 'rgba(90, 170, 255, 0.28)',
    trailEdge: 'rgba(60, 130, 220, 0.08)',
    dropletCore: 'rgba(235, 248, 255, 0.95)',
    dropletEdge: 'rgba(120, 190, 255, 0.65)',
  },
  pink: {
    id: 'pink',
    label: 'Rosa',
    swatch: '#ff6b9d',
    trailCenter: 'rgba(255, 190, 215, 0.55)',
    trailMid: 'rgba(255, 120, 175, 0.28)',
    trailEdge: 'rgba(255, 90, 150, 0.08)',
    dropletCore: 'rgba(255, 240, 246, 0.95)',
    dropletEdge: 'rgba(255, 130, 185, 0.65)',
  },
  black: {
    id: 'black',
    label: 'Negro',
    swatch: '#d1d5db',
    trailCenter: 'rgba(220, 220, 220, 0.45)',
    trailMid: 'rgba(170, 170, 170, 0.22)',
    trailEdge: 'rgba(130, 130, 130, 0.08)',
    dropletCore: 'rgba(250, 250, 250, 0.92)',
    dropletEdge: 'rgba(180, 180, 180, 0.55)',
  },
  red: {
    id: 'red',
    label: 'Rojo',
    swatch: '#ff4444',
    trailCenter: 'rgba(255, 170, 170, 0.55)',
    trailMid: 'rgba(255, 90, 90, 0.28)',
    trailEdge: 'rgba(220, 60, 60, 0.08)',
    dropletCore: 'rgba(255, 235, 235, 0.95)',
    dropletEdge: 'rgba(255, 110, 110, 0.65)',
  },
  gold: {
    id: 'gold',
    label: 'Dorado',
    swatch: '#ffd700',
    trailCenter: 'rgba(255, 235, 170, 0.55)',
    trailMid: 'rgba(255, 200, 90, 0.28)',
    trailEdge: 'rgba(220, 160, 40, 0.08)',
    dropletCore: 'rgba(255, 252, 230, 0.95)',
    dropletEdge: 'rgba(255, 210, 90, 0.65)',
  },
}

export const CURSOR_THEME_IDS = Object.keys(CURSOR_THEMES)

export const getCursorTheme = (id) => CURSOR_THEMES[id] || CURSOR_THEMES.gold
