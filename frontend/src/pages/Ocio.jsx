import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ActualmenteEnProgreso from '../components/ActualmenteEnProgreso'
import OcioCompletedArchive from '../components/OcioCompletedArchive'
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
import { glassSearchFieldSx } from '../styles/glassTheme'
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
      <Container maxWidth="xl" sx={{ py: 0, px: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar anime, series, juegos o libros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(140, 184, 255, 0.75)' }} />
                </InputAdornment>
              ),
            }}
            sx={glassSearchFieldSx}
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

        <OcioCompletedArchive />
      </Container>
    </div>
  )
}

export default Ocio
