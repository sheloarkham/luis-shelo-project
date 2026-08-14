import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomizePanel from './CustomizePanel'
import LightCursor from './LightCursor'
import ParticleBackground from './ParticleBackground'
import Box from '@mui/material/Box'
import { useThemeCustomization } from '../context/ThemeContext'
import { useParticleTheme } from '../context/ParticleThemeContext'
import { useIsDesktop } from '../hooks/useIsDesktop'

const Layout = () => {
  const { customizationMode } = useThemeCustomization()
  const { chromeHidden } = useParticleTheme()
  const isDesktop = useIsDesktop()

  const mainTopMargin = chromeHidden
    ? { xs: 0, md: 0 }
    : customizationMode
      ? { xs: '108px', md: '116px' }
      : { xs: '56px', md: '64px' }

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ParticleBackground />
      {isDesktop && !chromeHidden && <LightCursor />}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!chromeHidden && <Navbar />}
      {!chromeHidden && <CustomizePanel />}
      <Box component="main" sx={{ flexGrow: 1, mt: mainTopMargin }}>
        <Outlet />
      </Box>
      {!chromeHidden && <Footer />}
      </Box>
    </Box>
  )
}

export default Layout
