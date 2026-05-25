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
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
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
