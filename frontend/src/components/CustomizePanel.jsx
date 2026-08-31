import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useLocation } from 'react-router-dom'
import { useThemeCustomization } from '../context/ThemeContext'
import { BACKGROUND_THEMES, BACKGROUND_THEME_IDS } from '../constants/backgroundThemes'
import { CURSOR_THEMES, CURSOR_THEME_IDS } from '../constants/cursorThemes'
import './CustomizePanel.css'

const CustomizePanel = () => {
  const location = useLocation()
  const {
    customizationMode,
    backgroundId,
    cursorTheme,
    setBackgroundId,
    setCursorTheme,
    resetSettings,
  } = useThemeCustomization()

  if (!customizationMode) return null

  const onGymPage = location.pathname === '/gym'

  return (
    <Box className="customize-panel" component="section" aria-label="Panel de personalización">
      <Typography variant="body2" className="customize-panel-title">
        Personalización
      </Typography>

      <Box className="customize-panel-section customize-panel-section--backgrounds">
        <span className="customize-section-label">Imagen de fondo</span>
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
              <span className="customize-bg-btn__label">{BACKGROUND_THEMES[id].label}</span>
            </button>
          ))}
        </Box>
      </Box>

      <Box className="customize-panel-section">
        <span className="customize-section-label">Luz del mouse</span>
        <Box className="customize-theme-options">
          {CURSOR_THEME_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`customize-theme-btn${cursorTheme === id ? ' customize-theme-btn--active' : ''}`}
              onClick={() => setCursorTheme(id)}
              aria-label={`Color del cursor ${CURSOR_THEMES[id].label}`}
              title={CURSOR_THEMES[id].label}
            >
              <span
                className="customize-theme-swatch"
                style={{ backgroundColor: CURSOR_THEMES[id].swatch }}
              />
              <span>{CURSOR_THEMES[id].label}</span>
            </button>
          ))}
        </Box>
      </Box>

      {onGymPage && (
        <Typography variant="caption" className="customize-gym-hint">
          En Gym puedes editar los pesos directamente en cada ejercicio.
        </Typography>
      )}

      <Button
        size="small"
        variant="outlined"
        onClick={resetSettings}
        className="customize-reset-btn"
      >
        Restaurar
      </Button>
    </Box>
  )
}

export default CustomizePanel
