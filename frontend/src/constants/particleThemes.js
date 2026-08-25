export const PARTICLE_THEMES = {
  blue: {
    id: 'blue',
    label: 'Azul',
    swatch: '#66bbff',
    bgInner: '#001a33',
    bgMid: '#000814',
    particle: '#66bbff',
    glow: { r: 80, g: 170, b: 255, a: 0.45 },
    line: { r: 51, g: 153, b: 255, a: 0.18 },
    wave: '#3399ff',
  },
  pink: {
    id: 'pink',
    label: 'Rosa',
    swatch: '#ff6b9d',
    bgInner: '#3a0a28',
    bgMid: '#1a0512',
    particle: '#ff6b9d',
    glow: { r: 255, g: 120, b: 180, a: 0.5 },
    line: { r: 255, g: 105, b: 180, a: 0.2 },
    wave: '#ff6b9d',
  },
  black: {
    id: 'black',
    label: 'Negro',
    swatch: '#b8c0cc',
    bgInner: '#0a0a0c',
    bgMid: '#030303',
    particle: '#c4ccd8',
    glow: { r: 190, g: 198, b: 215, a: 0.24 },
    line: { r: 130, g: 140, b: 160, a: 0.09 },
    wave: '#2a3038',
  },
  red: {
    id: 'red',
    label: 'Rojo',
    swatch: '#ff4444',
    bgInner: '#2a0808',
    bgMid: '#140404',
    particle: '#ff5555',
    glow: { r: 255, g: 80, b: 80, a: 0.45 },
    line: { r: 255, g: 60, b: 60, a: 0.2 },
    wave: '#cc3333',
  },
  gold: {
    id: 'gold',
    label: 'Dorado',
    swatch: '#ffd700',
    bgInner: '#2a2008',
    bgMid: '#141008',
    particle: '#ffd700',
    glow: { r: 255, g: 200, b: 80, a: 0.45 },
    line: { r: 255, g: 180, b: 60, a: 0.2 },
    wave: '#daa520',
  },
}

export const PARTICLE_THEME_IDS = Object.keys(PARTICLE_THEMES)

/** Tema oscuro elegante usado en todo el sitio excepto Yeni */
export const ELEGANT_DARK_PARTICLE_ID = 'black'

export const getParticleTheme = (id) => PARTICLE_THEMES[id] || PARTICLE_THEMES.black
