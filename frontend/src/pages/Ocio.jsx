import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ActualmenteEnProgreso from '../components/ActualmenteEnProgreso'
import SeriesList from '../components/SeriesList'
import GamesList from '../components/GamesList'
import BooksList from '../components/BooksList'
import AnimeList from '../components/AnimeList'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import './Ocio.css'

const Ocio = () => {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Scroll a la sección indicada desde el navbar
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location])

  return (
    <div className="ocio-page">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar anime, series, juegos o libros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#667eea' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                fontSize: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.3)',
                  borderWidth: '2px',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 48px rgba(102, 126, 234, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: '2px',
                },
              },
            }}
          />
          {searchTerm && (
            <Box className="search-results-info" sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                🔎 Buscando: "{searchTerm}"
              </Typography>
            </Box>
          )}
        </Box>

        <ActualmenteEnProgreso />
        
        <div id="anime">
          <AnimeList searchTerm={searchTerm} />
        </div>
        
        <div id="series">
          <SeriesList searchTerm={searchTerm} />
        </div>
        
        <div id="games">
          <GamesList searchTerm={searchTerm} />
        </div>
        
        <div id="books">
          <BooksList searchTerm={searchTerm} />
        </div>
      </Container>
    </div>
  )
}

export default Ocio
