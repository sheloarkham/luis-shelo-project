import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useThemeCustomization } from '../context/ThemeContext'
import { BACKGROUND_THEMES, BACKGROUND_THEME_IDS } from '../constants/backgroundThemes'
import { CURSOR_THEMES, CURSOR_THEME_IDS } from '../constants/cursorThemes'
import './CustomizePanel.css'

const CustomizePanel = () => {
  const {
    backgroundId,
    cursorTheme,
    setBackgroundId,
    setCursorTheme,
    resetSettings,
  } = useThemeCustomization()

  return (
    <Box className="customize-panel customize-panel--popover" component="section" aria-label="Panel de personalización">
      <Typography variant="caption" className="customize-panel-title">
        Fondo
      </Typography>

      <Box className="customize-background-options">
        {BACKGROUND_THEME_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className={`customize-bg-btn${backgroundId === id ? ' customize-bg-btn--active' : ''}`}
            onClick={() => setBackgroundId(id)}
            aria-label={`Fondo ${BACKGROUND_THEMES[id].label}`}
            title={BACKGROUND_THEMES[id].label}
          >
            <span className="customize-bg-btn__thumb">
              <img src={BACKGROUND_THEMES[id].image} alt="" draggable={false} />
            </span>
          </button>
        ))}
      </Box>

      <Typography variant="caption" className="customize-panel-title customize-panel-title--spaced">
        Cursor
      </Typography>

      <Box className="customize-theme-options customize-theme-options--compact">
        {CURSOR_THEME_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className={`customize-theme-btn customize-theme-btn--compact${cursorTheme === id ? ' customize-theme-btn--active' : ''}`}
            onClick={() => setCursorTheme(id)}
            aria-label={`Cursor ${CURSOR_THEMES[id].label}`}
            title={CURSOR_THEMES[id].label}
          >
            <span
              className="customize-theme-swatch"
              style={{ backgroundColor: CURSOR_THEMES[id].swatch }}
            />
          </button>
        ))}
      </Box>

      <Button size="small" variant="text" onClick={resetSettings} className="customize-reset-btn">
        Restaurar
      </Button>
    </Box>
  )
}

export default CustomizePanel
