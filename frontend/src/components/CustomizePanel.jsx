import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useLocation } from 'react-router-dom'
import { useThemeCustomization } from '../context/ThemeContext'
import { PARTICLE_THEMES, PARTICLE_THEME_IDS } from '../constants/particleThemes'
import { CURSOR_THEMES, CURSOR_THEME_IDS } from '../constants/cursorThemes'
import './CustomizePanel.css'

const CustomizePanel = () => {
  const location = useLocation()
  const {
    customizationMode,
    particleTheme,
    cursorTheme,
    setParticleTheme,
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

      <Box className="customize-panel-section">
        <span className="customize-section-label">Fondo de partículas</span>
        <Box className="customize-theme-options">
          {PARTICLE_THEME_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`customize-theme-btn${particleTheme === id ? ' customize-theme-btn--active' : ''}`}
              onClick={() => setParticleTheme(id)}
              aria-label={`Tema de partículas ${PARTICLE_THEMES[id].label}`}
              title={PARTICLE_THEMES[id].label}
            >
              <span
                className="customize-theme-swatch"
                style={{ backgroundColor: PARTICLE_THEMES[id].swatch }}
              />
              <span>{PARTICLE_THEMES[id].label}</span>
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
