import SettingsIcon from '@mui/icons-material/Settings'
import { useThemeCustomization } from '../context/ThemeContext'
import CustomizePanel from './CustomizePanel'
import './CustomizeToggle.css'

const CustomizeToggle = () => {
  const { customizationMode, toggleCustomizationMode } = useThemeCustomization()

  return (
    <div className="customize-toggle">
      {customizationMode && <CustomizePanel />}
      <button
        type="button"
        className={`customize-toggle__btn${customizationMode ? ' customize-toggle__btn--active' : ''}`}
        onClick={toggleCustomizationMode}
        aria-label={customizationMode ? 'Cerrar personalización' : 'Personalizar fondo'}
        title={customizationMode ? 'Cerrar' : 'Personalizar'}
      >
        <SettingsIcon sx={{ fontSize: 18 }} />
      </button>
    </div>
  )
}

export default CustomizeToggle
