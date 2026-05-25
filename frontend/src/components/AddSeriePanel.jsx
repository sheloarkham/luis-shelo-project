import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Rating from '@mui/material/Rating'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const AddSeriePanel = ({ onClose, onAddSerie }) => {
  const [formData, setFormData] = useState({
    title: '',
    estado: 'Pendiente',
    temporadas: 1,
    rating: 3,
    year: new Date().getFullYear()
  })
  const [isSearching, setIsSearching] = useState(false)

  const searchIMDb = async (title) => {
    if (!title.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=8265bd1c&t=${encodeURIComponent(title)}&type=series`)
      const data = await response.json()

      if (data.Response === 'True') {
        const imdbRating = parseFloat(data.imdbRating)
        const convertedRating = isNaN(imdbRating) ? 3 : Math.round(imdbRating / 2)

        setFormData(prev => ({
          ...prev,
          year: data.Year ? parseInt(data.Year) : prev.year,
          rating: Math.min(Math.max(convertedRating, 1), 5)
        }))
      }
    } catch (error) {
      console.error('Error buscando en IMDb:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddSerie(formData)
  }

  const handleTitleBlur = () => {
    if (formData.title.trim()) {
      searchIMDb(formData.title)
    }
  }

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
          border: '3px solid #FFD700',
          borderRadius: '15px'
        }
      }}
    >
      <DialogTitle sx={{ 
        color: '#FFD700', 
        fontWeight: 700,
        borderBottom: '2px solid #FFD700',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        Agregar Nueva Serie
        <IconButton onClick={onClose} sx={{ color: '#FFD700' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Título de la Serie"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            onBlur={handleTitleBlur}
            placeholder="Ej: Breaking Bad"
            required
            fullWidth
            InputProps={{
              endAdornment: isSearching && <CircularProgress size={20} sx={{ color: '#FFD700' }} />
            }}
            sx={{
              '& .MuiInputLabel-root': { color: '#FFD700' },
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'rgba(255, 215, 0, 0.3)' },
                '&:hover fieldset': { borderColor: '#FFD700' },
                '&.Mui-focused fieldset': { borderColor: '#FFD700' }
              }
            }}
          />
          {isSearching && (
            <Typography variant="caption" sx={{ color: '#FFD700', fontStyle: 'italic' }}>
              Buscando en IMDb...
            </Typography>
          )}

          <TextField
            select
            label="Estado"
            value={formData.estado}
            onChange={(e) => setFormData({...formData, estado: e.target.value})}
            fullWidth
            sx={{
              '& .MuiInputLabel-root': { color: '#FFD700' },
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'rgba(255, 215, 0, 0.3)' },
                '&:hover fieldset': { borderColor: '#FFD700' },
                '&.Mui-focused fieldset': { borderColor: '#FFD700' }
              }
            }}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Viendo">Viendo</MenuItem>
            <MenuItem value="Completada">Completada</MenuItem>
          </TextField>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              type="number"
              label="Temporadas"
              value={formData.temporadas}
              onChange={(e) => setFormData({...formData, temporadas: parseInt(e.target.value)})}
              inputProps={{ min: 1, max: 50 }}
              fullWidth
              sx={{
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255, 215, 0, 0.3)' },
                  '&:hover fieldset': { borderColor: '#FFD700' },
                  '&.Mui-focused fieldset': { borderColor: '#FFD700' }
                }
              }}
            />

            <TextField
              type="number"
              label="Año"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              inputProps={{ min: 1900, max: 2100 }}
              fullWidth
              sx={{
                '& .MuiInputLabel-root': { color: '#FFD700' },
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255, 215, 0, 0.3)' },
                  '&:hover fieldset': { borderColor: '#FFD700' },
                  '&.Mui-focused fieldset': { borderColor: '#FFD700' }
                }
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ color: '#FFD700', mb: 1 }}>Calificación</Typography>
            <Rating
              value={formData.rating}
              onChange={(event, newValue) => setFormData({...formData, rating: newValue})}
              max={5}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': { color: '#FFD700' },
                '& .MuiRating-iconEmpty': { color: 'rgba(255, 215, 0, 0.3)' }
              }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ 
            color: '#888', 
            borderColor: '#888',
            '&:hover': { borderColor: '#aaa', color: '#aaa' }
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{ 
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#000',
            fontWeight: 600,
            '&:hover': { 
              background: 'linear-gradient(135deg, #FFA500, #FFD700)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          Agregar Serie
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddSeriePanel
