import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SeriesList from '../components/SeriesList'
import GamesList from '../components/GamesList'
import BooksList from '../components/BooksList'
import AnimeList from '../components/AnimeList'
import Container from '@mui/material/Container'
import './Ocio.css'

const Ocio = () => {
  const location = useLocation()

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
        <div id="anime">
          <AnimeList />
        </div>
        
        <div id="series">
          <SeriesList />
        </div>
        
        <div id="games">
          <GamesList />
        </div>
        
        <div id="books">
          <BooksList />
        </div>
      </Container>
    </div>
  )
}

export default Ocio
