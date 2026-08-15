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

import './PageDisintegration.css'

const Layout = ({ contentRef, pageEntering = false }) => {
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
      <Box
        ref={contentRef}
        className={`page-transition-shell${pageEntering ? ' page-transition-main--enter' : ''}`}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          mt: mainTopMargin,
        }}
      >
        <Box component="main" className="page-transition-main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        {!chromeHidden && <Footer />}
      </Box>
      </Box>
    </Box>
  )
}

export default Layout
