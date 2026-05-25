import { useState, useEffect } from 'react'
import AddSeriePanel from './AddSeriePanel'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { seriesApi } from '../services/seriesApi'
import './SeriesList.css'

const SeriesList = ({ searchTerm = '' }) => {
  const [series, setSeries] = useState([])
  const [showPanel, setShowPanel] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSeriesFromApi()
  }, [])

  const loadSeriesFromApi = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await seriesApi.getAll()
      setSeries(data)
    } catch (err) {
      setError('Error al cargar las series. ¿Está el backend corriendo?')
      console.error('Error loading series:', err)
    } finally {
      setLoading(false)
    }
  }

  const createStars = (rating) => {
    return rating ? '★'.repeat(Math.min(rating, 5)) : '☆☆☆☆☆'
  }

  const handleAddSerie = async (newSerie) => {
    try {
      const createdSerie = await seriesApi.create(newSerie)
      setSeries([...series, createdSerie])
      setShowPanel(false)
    } catch (err) {
      setError('Error al agregar la serie')
      console.error('Error adding serie:', err)
    }
  }

  return (
    <div id="series" className="gh-series-section">
      <div className="gh-series-container">
        <div className="gh-setlist-header">
          <h2 className="gh-setlist-title">📺 Series</h2>
          <Fab 
            color="primary"
            onClick={() => setShowPanel(true)}
            disabled={loading}
            sx={{ 
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#000',
              '&:hover': {
                background: 'linear-gradient(135deg, #FFA500, #FFD700)',
                transform: 'scale(1.1)',
              }
            }}
          >
            <AddIcon />
          </Fab>
        </div>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <CircularProgress />
          </div>
        ) : series.filter(serie => serie.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 1rem',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
            borderRadius: '16px',
            border: '2px dashed rgba(255, 215, 0, 0.3)'
          }}>
            <h3 style={{ color: '#FFD700', marginBottom: '1rem', fontWeight: 'bold' }}>
              😢 No se encontraron series
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {searchTerm ? `No hay resultados para "${searchTerm}"` : 'No hay series en la lista'}
            </p>
          </div>
        ) : (
          <div className="gh-setlist-container">
            {series.filter(serie => serie.title.toLowerCase().includes(searchTerm.toLowerCase())).map((serie) => (
              <div key={serie.id} className="gh-song-row">
                <div className="gh-song-title">{serie.title}</div>
                <div className="gh-song-stars">{createStars(serie.rating)}</div>
                <div className="gh-song-details">
                  {serie.year} • {serie.estado} • {serie.temporadas} temp.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPanel && (
        <AddSeriePanel 
          onClose={() => setShowPanel(false)}
          onAddSerie={handleAddSerie}
        />
      )}
    </div>
  )
}

export default SeriesList
