import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useThemeCustomization } from '../context/ThemeContext'
import './CustomizePanel.css'

const COLOR_OPTIONS = [
  { key: 'navbarBg', label: 'Navbar (fondo)' },
  { key: 'navbarText', label: 'Navbar (texto)' },
  { key: 'pageBg', label: 'Fondo general' },
  { key: 'pageText', label: 'Texto general' },
]

/**
 * Barra superior que aparece en "Modo personalización".
 * Por ahora solo permite cambiar colores; más adelante irán títulos y más opciones.
 */
const CustomizePanel = () => {
  const { customizationMode, colors, updateColor, resetColors } = useThemeCustomization()

  if (!customizationMode) return null

  return (
    <Box className="customize-panel" component="section" aria-label="Panel de personalización">
      <Typography variant="body2" className="customize-panel-title">
        Personalizar colores
      </Typography>

      <Box className="customize-panel-colors">
        {COLOR_OPTIONS.map(({ key, label }) => (
          <label key={key} className="customize-color-field">
            <span>{label}</span>
            <input
              type="color"
              value={colors[key]}
              onChange={(e) => updateColor(key, e.target.value)}
              aria-label={label}
            />
          </label>
        ))}
      </Box>

      <Button
        size="small"
        variant="outlined"
        onClick={resetColors}
        className="customize-reset-btn"
      >
        Restaurar
      </Button>
    </Box>
  )
}

export default CustomizePanel
