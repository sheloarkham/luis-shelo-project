import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardMedia, Chip } from '@mui/material'
import {
  ocioCardsGridSx,
  ocioCardSx,
  ocioCardMediaSx,
  ocioCardOverlaySx,
  ocioCardTitleSx,
  ocioCardMetaSx,
} from '../styles/ocioCardStyles'

import { OCIO_LIST_UPDATED_EVENT } from './OcioCompletedArchive'

const renderCompactCard = ({ key, image, title, metaLines, chipLabel, borderColor, chipColor = 'primary' }) => (
  <Card
    key={key}
    sx={ocioCardSx({
      border: `2px solid ${borderColor}`,
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
    })}
  >
    <CardMedia component="img" image={image} alt={title} sx={ocioCardMediaSx} />
    <Box sx={ocioCardOverlaySx}>
      <Typography variant="subtitle2" sx={ocioCardTitleSx}>
        {title}
      </Typography>
      {metaLines.map((line) => (
        <Typography key={line} variant="caption" sx={ocioCardMetaSx}>
          {line}
        </Typography>
      ))}
      <Chip label={chipLabel} color={chipColor} size="small" sx={{ mt: 0.75, height: 20, fontSize: '0.65rem' }} />
    </Box>
  </Card>
)

const ActualmenteEnProgreso = () => {
  const [enProgreso, setEnProgreso] = useState({
    anime: [],
    games: [],
    books: [],
    series: [],
  })

  useEffect(() => {
    cargarEnProgreso()
    window.addEventListener(OCIO_LIST_UPDATED_EVENT, cargarEnProgreso)
    return () => window.removeEventListener(OCIO_LIST_UPDATED_EVENT, cargarEnProgreso)
  }, [])

  const cargarEnProgreso = () => {
    const seriesStorage = localStorage.getItem('series-list')
    const series = seriesStorage ? JSON.parse(seriesStorage).filter(s => s.Estado === 'Viendo') : []

    const animeStorage = localStorage.getItem('anime-list')
    const anime = animeStorage ? JSON.parse(animeStorage).filter(a => a.Estado === 'Viendo') : []

    const gamesStorage = localStorage.getItem('games-list')
    const games = gamesStorage ? JSON.parse(gamesStorage).filter(g => g.Estado === 'Jugando') : []

    const booksStorage = localStorage.getItem('books-list')
    const books = booksStorage ? JSON.parse(booksStorage).filter(b => b.Estado === 'Leyendo') : []

    setEnProgreso({ anime, games, books, series })
  }

  const total = enProgreso.anime.length + enProgreso.games.length + enProgreso.books.length + enProgreso.series.length

  if (total === 0) {
    return null
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
          gap: 1,
        }}
      >
        ✨ Actualmente...
      </Typography>

      <Box sx={ocioCardsGridSx}>
        {enProgreso.anime.map((anime, index) =>
          renderCompactCard({
            key: `anime-${index}`,
            image: anime.image,
            title: anime.title,
            metaLines: [`Anime • ${anime.studio}`, `${anime.episodes} episodios`],
            chipLabel: 'Viendo',
            borderColor: '#ff6b6b',
          })
        )}

        {enProgreso.games.map((game, index) =>
          renderCompactCard({
            key: `game-${index}`,
            image: game.image,
            title: game.title,
            metaLines: [`Videojuego • ${game.developer}`, `${game.duration} horas`],
            chipLabel: 'Jugando',
            borderColor: '#a78bfa',
          })
        )}

        {enProgreso.books.map((book, index) =>
          renderCompactCard({
            key: `book-${index}`,
            image: book.image,
            title: book.title,
            metaLines: [`Libro • ${book.author}`, `${book.pages} páginas`],
            chipLabel: 'Leyendo',
            borderColor: '#60a5fa',
          })
        )}

        {enProgreso.series.map((serie, index) =>
          renderCompactCard({
            key: `serie-${index}`,
            image: serie.image,
            title: serie.title,
            metaLines: [`Serie • ${serie.year}`, `${serie.episodes} episodios`],
            chipLabel: 'Viendo',
            borderColor: '#FFD700',
          })
        )}
      </Box>
    </Box>
  )
}

export default ActualmenteEnProgreso
