import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Chip, Grid } from '@mui/material'

const ActualmenteEnProgreso = () => {
  const [enProgreso, setEnProgreso] = useState({
    anime: [],
    games: [],
    books: [],
    series: []
  })

  useEffect(() => {
    cargarEnProgreso()
  }, [])

  const cargarEnProgreso = () => {
    // Cargar series (Estado: "Viendo")
    const seriesStorage = localStorage.getItem('series-list')
    const series = seriesStorage ? JSON.parse(seriesStorage).filter(s => s.Estado === 'Viendo') : []

    // Cargar anime (Estado: "Viendo")
    const animeStorage = localStorage.getItem('anime-list')
    const anime = animeStorage ? JSON.parse(animeStorage).filter(a => a.Estado === 'Viendo') : []

    // Cargar games (Estado: "Jugando")
    const gamesStorage = localStorage.getItem('games-list')
    const games = gamesStorage ? JSON.parse(gamesStorage).filter(g => g.Estado === 'Jugando') : []

    // Cargar books (Estado: "Leyendo")
    const booksStorage = localStorage.getItem('books-list')
    const books = booksStorage ? JSON.parse(booksStorage).filter(b => b.Estado === 'Leyendo') : []

    setEnProgreso({ anime, games, books, series })
  }

  const total = enProgreso.anime.length + enProgreso.games.length + enProgreso.books.length + enProgreso.series.length

  if (total === 0) {
    return null // No mostrar la sección si no hay nada en progreso
  }

  return (
    <Box sx={{ py: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          mb: 3, 
          fontWeight: 'bold', 
          color: '#4ade80',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        ✨ Actualmente...
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: 3 
      }}>
        {/* Anime en progreso */}
        {enProgreso.anime.map((anime, index) => (
          <Card 
            key={`anime-${index}`}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '2px solid #ff6b6b',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={anime.image}
              alt={anime.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {anime.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Anime • {anime.studio}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {anime.episodes} episodios
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Chip 
                  label="Viendo" 
                  color="primary"
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Juegos en progreso */}
        {enProgreso.games.map((game, index) => (
          <Card 
            key={`game-${index}`}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '2px solid #a78bfa',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={game.image}
              alt={game.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {game.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Videojuego • {game.developer}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {game.duration} horas
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Chip 
                  label="Jugando" 
                  color="primary"
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Libros en progreso */}
        {enProgreso.books.map((book, index) => (
          <Card 
            key={`book-${index}`}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '2px solid #60a5fa',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={book.image}
              alt={book.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Libro • {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {book.pages} páginas
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Chip 
                  label="Leyendo" 
                  color="primary"
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Series en progreso */}
        {enProgreso.series.map((serie, index) => (
          <Card 
            key={`serie-${index}`}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '2px solid #FFD700',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={serie.image}
              alt={serie.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {serie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Serie • {serie.year}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {serie.episodes} episodios
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Chip 
                  label="Viendo" 
                  color="primary"
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default ActualmenteEnProgreso
