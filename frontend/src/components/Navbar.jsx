import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import HomeIcon from '@mui/icons-material/Home'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import FolderIcon from '@mui/icons-material/Folder'
import SchoolIcon from '@mui/icons-material/School'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const location = useLocation()
  const navigate = useNavigate()
  const isYeniPage = location.pathname === '/yeni'
  
  const navbarBackground = isYeniPage 
    ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOcioSection = (section) => {
    handleClose()
    // Navegar a /ocio si no estamos ahí
    if (location.pathname !== '/ocio') {
      navigate('/ocio', { state: { scrollTo: section } })
    } else {
      // Ya estamos en /ocio, solo hacer scroll
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <AppBar position="fixed" sx={{ 
      background: navbarBackground,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transition: 'background 0.3s ease'
    }}>
      <Toolbar sx={{ maxWidth: '1400px', width: '100%', margin: '0 auto', px: 2 }}>
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 0,
            mr: 4,
            fontWeight: 700,
            color: 'white',
            textDecoration: 'none',
            '&:hover': { transform: 'scale(1.05)' },
            transition: 'transform 0.3s'
          }}
        >
          Luis shelo Project
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
          <Button 
            component={Link} 
            to="/" 
            startIcon={<HomeIcon />}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            Home
          </Button>

          <Button
            startIcon={<SportsEsportsIcon />}
            onClick={handleClick}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            Ocio
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleOcioSection('series')}>
              📺 Series
            </MenuItem>
            <MenuItem onClick={() => handleOcioSection('games')}>
              🎮 Videojuegos
            </MenuItem>
            <MenuItem onClick={() => handleOcioSection('books')}>
              📚 Libros
            </MenuItem>
          </Menu>

          <Button 
            component={Link} 
            to="/presupuestos"
            startIcon={<AccountBalanceWalletIcon />}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            Presupuestos
          </Button>

          <Button 
            component={Link} 
            to="/proyecto"
            startIcon={<FolderIcon />}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            El Proyecto
          </Button>

          <Button 
            component={Link} 
            to="/carrera"
            startIcon={<SchoolIcon />}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            Carrera
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
  )
}

export default Navbar
