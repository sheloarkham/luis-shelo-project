import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomizePanel from './CustomizePanel'
import Box from '@mui/material/Box'
import { useThemeCustomization } from '../context/ThemeContext'

const Layout = () => {
  const { customizationMode } = useThemeCustomization()

  // Más espacio arriba cuando el panel de colores está visible
  const mainTopMargin = customizationMode
    ? { xs: '108px', md: '116px' }
    : { xs: '56px', md: '64px' }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
