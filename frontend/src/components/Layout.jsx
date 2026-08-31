import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import LightCursor from './LightCursor'
import SiteBackground from './SiteBackground'
import Box from '@mui/material/Box'
import { useParticleTheme } from '../context/ParticleThemeContext'
import { useIsDesktop } from '../hooks/useIsDesktop'

import './PageTransition.css'

const Layout = ({ contentRef, enterDirection = null }) => {
  const { chromeHidden } = useParticleTheme()
  const isDesktop = useIsDesktop()
  const pathname = useLocation().pathname
  const isHome = pathname === '/'
  const isProyectosHub = pathname === '/proyectos'
  const isFixedPage = isHome || isProyectosHub

  const mainTopMargin = chromeHidden ? { xs: 0, md: 0 } : { xs: '56px', md: '64px' }

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh', ...(isFixedPage ? { height: '100dvh', overflow: 'hidden' } : {}) }}>
      <SiteBackground />
      {isDesktop && !chromeHidden && <LightCursor />}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!chromeHidden && <Navbar />}
      <Box
        ref={contentRef}
        className={[
          'page-transition-shell',
          enterDirection ? `page-transition-shell--enter-${enterDirection}` : '',
        ].filter(Boolean).join(' ')}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          mt: mainTopMargin,
          ...(isFixedPage ? { minHeight: 0, overflow: 'hidden' } : {}),
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, ...(isFixedPage ? { minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' } : {}) }}>
          <Outlet />
        </Box>
        {!chromeHidden && !isFixedPage && <Footer />}
      </Box>
      </Box>
    </Box>
  )
}

export default Layout
