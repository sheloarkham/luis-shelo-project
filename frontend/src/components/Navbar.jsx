import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import FolderIcon from '@mui/icons-material/Folder'
import SchoolIcon from '@mui/icons-material/School'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ChatIcon from '@mui/icons-material/Chat'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ocioExpanded, setOcioExpanded] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollTimeout, setScrollTimeout] = useState(null)
  const open = Boolean(anchorEl)
  const location = useLocation()
  const navigate = useNavigate()
  const isYeniPage = location.pathname === '/yeni'
  
  const navbarBackground = '#ffffff'
  const navbarTextColor = '#2c2c2c'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Mostrar navbar al hacer scroll hacia arriba
      if (currentScrollY < lastScrollY) {
        setVisible(true)
      }
      // Ocultar navbar al hacer scroll hacia abajo (después de 100px)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      }

      setLastScrollY(currentScrollY)

      // Limpiar timeout anterior
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Ocultar navbar después de 2 segundos sin actividad
      const timeout = setTimeout(() => {
        if (window.scrollY > 100) {
          setVisible(false)
        }
      }, 2000)

      setScrollTimeout(timeout)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [lastScrollY, scrollTimeout])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleOcioSection = (section) => {
    handleClose()
    setMobileOpen(false)
    if (location.pathname !== '/ocio') {
      navigate('/ocio', { state: { scrollTo: section } })
    } else {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const drawer = (
    <Box sx={{ width: 250, bgcolor: '#1a1a1a', height: '100%', pt: 2 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <HomeIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setOcioExpanded(!ocioExpanded)}>
            <ListItemIcon>
              <SportsEsportsIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Ocio" sx={{ color: 'white' }} />
            {ocioExpanded ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
          </ListItemButton>
        </ListItem>
        
        {ocioExpanded && (
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleOcioSection('anime')}>
              <ListItemText primary="Anime" sx={{ color: '#FFD700' }} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleOcioSection('series')}>
              <ListItemText primary="Series" sx={{ color: '#FFD700' }} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleOcioSection('games')}>
              <ListItemText primary="Videojuegos" sx={{ color: '#FFD700' }} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleOcioSection('books')}>
              <ListItemText primary="Libros" sx={{ color: '#FFD700' }} />
            </ListItemButton>
          </List>
        )}

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/presupuestos" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <AccountBalanceWalletIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Presupuestos" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/proyecto" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <FolderIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="El Proyecto" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/carrera" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <SchoolIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Calificación" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/gym" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <FitnessCenterIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Gym" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/books" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <MenuBookIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Books" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/chat" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <ChatIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Jack" sx={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/yeni" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <FavoriteIcon sx={{ color: '#ff6b9d' }} />
            </ListItemIcon>
            <ListItemText primary="Yeni 💞" sx={{ color: '#ff6b9d' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="fixed" sx={{ 
        background: navbarBackground,
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        transition: 'transform 0.3s ease, background 0.3s ease',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)'
      }}>
        <Toolbar sx={{ maxWidth: '1400px', width: '100%', margin: '0 auto', px: 2 }}>
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h5" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 4 },
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              '&:hover': { transform: 'scale(1.05)' },
              transition: 'transform 0.3s'
            }}
          >
            Luis shelo Project
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flexGrow: 1 }}>
            <Button 
              component={Link} 
              to="/" 
              startIcon={<HomeIcon />}
              sx={{ color: navbarTextColor, '&:hover': { bgcolor: isYeniPage ? 'rgba(255,255,255,0.2)' : '#f5f5f5' } }}
            >
              Home
            </Button>

            <Button
              startIcon={<SportsEsportsIcon />}
              onClick={handleClick}
              sx={{ color: navbarTextColor, '&:hover': { bgcolor: isYeniPage ? 'rgba(255,255,255,0.2)' : '#f5f5f5' } }}
            >
              Ocio
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleOcioSection('anime')}>
                Anime
              </MenuItem>
              <MenuItem onClick={() => handleOcioSection('series')}>
                Series
              </MenuItem>
              <MenuItem onClick={() => handleOcioSection('games')}>
                Videojuegos
              </MenuItem>
              <MenuItem onClick={() => handleOcioSection('books')}>
                Libros
              </MenuItem>
            </Menu>

            <Button 
              component={Link} 
              to="/presupuestos"
              startIcon={<AccountBalanceWalletIcon />}
              sx={{ color: navbarTextColor, '&:hover': { bgcolor: isYeniPage ? 'rgba(255,255,255,0.2)' : '#f5f5f5' } }}
            >
              Presupuestos
            </Button>

            <Button 
              component={Link} 
              to="/proyecto"
              startIcon={<FolderIcon />}
              sx={{ color: navbarTextColor, '&:hover': { bgcolor: isYeniPage ? 'rgba(255,255,255,0.2)' : '#f5f5f5' } }}
            >
              El Proyecto
            </Button>

            <Button 
              component={Link} 
              to="/carrera"
              startIcon={<SchoolIcon />}
              sx={{ color: navbarTextColor, '&:hover': { bgcolor: isYeniPage ? 'rgba(255,255,255,0.2)' : '#f5f5f5' } }}
            >
              Calificación
            </Button>

            <Button 
              component={Link} 
              to="/gym"
              startIcon={<FitnessCenterIcon />}
              sx={{ color: navbarTextColor, '&:hover': { bgcolor: isYeniPage ? 'rgba(255,255,255,0.2)' : '#f5f5f5' } }}
            >
              Gym
            </Button>

            <Button 
              component={Link} 
              to="/books"
              startIcon={<MenuBookIcon />}
              sx={{ color: navbarTextColor, '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              Books
            </Button>

            <Button 
              component={Link} 
              to="/chat"
              startIcon={<ChatIcon />}
              sx={{ color: navbarTextColor, '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              Jack
            </Button>

            <Button 
              component={Link} 
              to="/yeni"
              startIcon={<FavoriteIcon />}
              sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
            >
              Yeni 💞
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Navbar
