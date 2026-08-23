export const CURSOR_THEMES = {
  blue: {
    id: 'blue',
    label: 'Azul',
    swatch: '#66bbff',
    core: 'rgba(210, 235, 255, 0.95)',
    coreInner: 'rgba(255, 255, 255, 0.9)',
    glowInner: 'rgba(100, 180, 255, 0.5)',
    glowMid: 'rgba(80, 140, 255, 0.22)',
    particle: 'rgba(150, 200, 255, 0.95)',
  },
  pink: {
    id: 'pink',
    label: 'Rosa',
    swatch: '#ff6b9d',
    core: 'rgba(255, 220, 235, 0.95)',
    coreInner: 'rgba(255, 255, 255, 0.9)',
    glowInner: 'rgba(255, 120, 180, 0.5)',
    glowMid: 'rgba(255, 105, 157, 0.22)',
    particle: 'rgba(255, 180, 210, 0.95)',
  },
  black: {
    id: 'black',
    label: 'Negro',
    swatch: '#d1d5db',
    core: 'rgba(240, 240, 240, 0.95)',
    coreInner: 'rgba(255, 255, 255, 0.9)',
    glowInner: 'rgba(180, 180, 180, 0.45)',
    glowMid: 'rgba(120, 120, 120, 0.2)',
    particle: 'rgba(200, 200, 200, 0.9)',
  },
  red: {
    id: 'red',
    label: 'Rojo',
    swatch: '#ff4444',
    core: 'rgba(255, 220, 220, 0.95)',
    coreInner: 'rgba(255, 255, 255, 0.9)',
    glowInner: 'rgba(255, 80, 80, 0.5)',
    glowMid: 'rgba(255, 60, 60, 0.22)',
    particle: 'rgba(255, 150, 150, 0.95)',
  },
  gold: {
    id: 'gold',
    label: 'Dorado',
    swatch: '#ffd700',
    core: 'rgba(255, 255, 230, 0.95)',
    coreInner: 'rgba(255, 255, 255, 0.9)',
    glowInner: 'rgba(255, 248, 210, 0.5)',
    glowMid: 'rgba(255, 200, 80, 0.22)',
    particle: 'rgba(255, 245, 190, 0.95)',
  },
}

export const CURSOR_THEME_IDS = Object.keys(CURSOR_THEMES)

/** Cursor romántico exclusivo de la página Yeni */
export const YENI_HEART_CURSOR = {
  id: 'yeni-heart',
  core: '#ff4d8d',
  coreInner: '#ffc2dc',
  glowInner: 'rgba(255, 105, 157, 0.62)',
  glowMid: 'rgba(255, 140, 190, 0.28)',
  particle: 'rgba(255, 130, 190, 0.92)',
  trail: 'rgba(255, 107, 157, 0.75)',
}

export const getCursorTheme = (id) => CURSOR_THEMES[id] || CURSOR_THEMES.gold
