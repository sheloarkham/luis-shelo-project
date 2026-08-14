import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomizePanel from './CustomizePanel'
import LightCursor from './LightCursor'
import Box from '@mui/material/Box'
import { useThemeCustomization } from '../context/ThemeContext'
import { useIsDesktop } from '../hooks/useIsDesktop'

const Layout = () => {
  const { customizationMode } = useThemeCustomization()
  const isDesktop = useIsDesktop()

  // Más espacio arriba cuando el panel de colores está visible
  const mainTopMargin = customizationMode
    ? { xs: '108px', md: '116px' }
    : { xs: '56px', md: '64px' }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isDesktop && <LightCursor />}
      <Navbar />
      <CustomizePanel />
      <Box component="main" sx={{ flexGrow: 1, mt: mainTopMargin }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
