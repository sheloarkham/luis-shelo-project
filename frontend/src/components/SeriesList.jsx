import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const STORAGE_KEY = 'series-list'

const initialSeriesData = [
  { title: "Mayans M.C.", episodes: 50, year: 2018, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Percy Jackson and the Olympians", episodes: 8, year: 2023, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Viendo" },
  { title: "Daredevil: Born Again", episodes: 9, year: 2025, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Black Mirror T7", episodes: 6, year: 2025, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Secret Level", episodes: 15, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Love, Death & Robots T3", episodes: 9, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "The Pitt", episodes: 15, year: 2025, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Efectos Colaterales", episodes: 10, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Tierra de Mafia", episodes: 10, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "The Bear T4", episodes: 10, year: 2025, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Viendo" },
  { title: "El Eternauta", episodes: 6, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Adolescencia", episodes: 4, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "The White Lotus T3", episodes: 7, year: 2025, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "El Juego del Calamar T2 & T3", episodes: 13, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Murderbot", episodes: 10, year: 2025, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "The Penguin", episodes: 8, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Creature Commandos", episodes: 7, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Sandman T2", episodes: 12, year: 2025, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Twilight of the Gods", episodes: 8, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Dune: Prophecy", episodes: 6, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "3 Body Problem", episodes: 8, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Berlin", episodes: 8, year: 2023, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Severance", episodes: 9, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Ted Lasso", episodes: 34, year: 2020, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "House of the Dragon T2", episodes: 8, year: 2024, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Casa de Papel Korea", episodes: 12, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Night Sky", episodes: 8, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Resident Evil", episodes: 8, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Russian Doll", episodes: 14, year: 2019, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Archive 81", episodes: 8, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Los Anillos de Poder", episodes: 8, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "El Paciente", episodes: 10, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Tokyo Vice", episodes: 18, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Andor T2", episodes: 12, year: 2025, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Pendiente" },
  { title: "Irma Vep", episodes: 8, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Under the Banner of Heaven", episodes: 7, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "Pachinko", episodes: 8, year: 2022, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" },
  { title: "For All Mankind", episodes: 40, year: 2019, image: "/Ocio/assets/serie-placeholder.jpg", Estado: "Completado" }
]

const SeriesList = ({ searchTerm = '' }) => {
  const [series, setSeries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialSeriesData
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedSerie, setSelectedSerie] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setSeries(JSON.parse(saved))
      }
      setIsLoaded(true)
    }
  }, [isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(series))
    }
  }, [series, isLoaded])

  const handleMenuOpen = (event, serie) => {
    setAnchorEl(event.currentTarget)
    setSelectedSerie(serie)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedSerie(null)
  }

  const handleStatusChange = (newStatus) => {
    if (selectedSerie) {
      setSeries(series.map(s => 
        s.title === selectedSerie.title ? { ...s, Estado: newStatus } : s
      ))
    }
    handleMenuClose()
  }

  const handleDelete = () => {
    if (selectedSerie) {
      setSeries(series.filter(s => s.title !== selectedSerie.title))
    }
    handleMenuClose()
  }

  const filteredSeries = series.filter(serie => 
    serie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupByStatus = () => {
    const viendo = filteredSeries.filter(s => s.Estado === 'Viendo')
    const pendiente = filteredSeries.filter(s => s.Estado === 'Pendiente')
    const completado = filteredSeries.filter(s => s.Estado === 'Completado')
    return { viendo, pendiente, completado }
  }

  const getCardBackground = (estado) => {
    switch(estado) {
      case 'Viendo':
        return 'linear-gradient(135deg, rgba(255, 0, 150, 0.2), rgba(0, 204, 255, 0.2))'
      case 'Pendiente':
        return 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.2))'
      case 'Completado':
        return 'linear-gradient(135deg, rgba(0, 255, 127, 0.2), rgba(0, 128, 255, 0.2))'
      default:
        return 'rgba(255, 255, 255, 0.05)'
    }
  }

  const renderCard = (serie) => (
    <Card 
      key={serie.title}
      sx={{
        background: getCardBackground(serie.Estado),
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(255, 215, 0, 0.4)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={serie.image}
        alt={serie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ color: '#FFD700', fontWeight: 'bold', flex: 1 }}>
            {serie.title}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => handleMenuOpen(e, serie)}
            sx={{ color: '#FFD700' }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
          {serie.year} • {serie.episodes} episodios
        </Typography>
        <Chip 
          label={serie.Estado} 
          size="small"
          sx={{
            background: serie.Estado === 'Completado' ? 'linear-gradient(135deg, #00FF7F, #0080FF)' :
                       serie.Estado === 'Viendo' ? 'linear-gradient(135deg, #FF0096, #00CCFF)' :
                       'linear-gradient(135deg, #FFD700, #FF8C00)',
            color: '#000',
            fontWeight: 'bold'
          }}
        />
      </CardContent>
    </Card>
  )

  const { viendo, pendiente, completado } = groupByStatus()

  return (
    <Box id="series" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Series
      </Typography>

      {filteredSeries.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          padding: '3rem 1rem',
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
          borderRadius: '16px',
          border: '2px dashed rgba(255, 215, 0, 0.3)'
        }}>
          <Typography variant="h5" sx={{ color: '#FFD700', mb: 2, fontWeight: 'bold' }}>
            No se encontraron series
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {searchTerm ? `No hay resultados para "${searchTerm}"` : 'No hay series en la lista'}
          </Typography>
        </Box>
      ) : searchTerm ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
          {filteredSeries.map(renderCard)}
        </Box>
      ) : (
        <Box>
          {viendo.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ color: '#FFD700', mb: 3, fontWeight: 'bold' }}>
                Viendo ({viendo.length})
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                {viendo.map(renderCard)}
              </Box>
            </Box>
          )}

          {pendiente.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ color: '#FFD700', mb: 3, fontWeight: 'bold' }}>
                Pendiente ({pendiente.length})
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                {pendiente.map(renderCard)}
              </Box>
            </Box>
          )}

          {completado.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ color: '#FFD700', mb: 3, fontWeight: 'bold' }}>
                Completado ({completado.length})
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                {completado.map(renderCard)}
              </Box>
            </Box>
          )}
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange('Viendo')}>Marcar como Viendo</MenuItem>
        <MenuItem onClick={() => handleStatusChange('Pendiente')}>Marcar como Pendiente</MenuItem>
        <MenuItem onClick={() => handleStatusChange('Completado')}>Marcar como Completado</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Eliminar</MenuItem>
      </Menu>
    </Box>
  )
}

export default SeriesList
