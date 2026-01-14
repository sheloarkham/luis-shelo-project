import { useState, useEffect } from 'react'
import AddSeriePanel from './AddSeriePanel'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import './SeriesList.css'

const SeriesList = () => {
  const [series, setSeries] = useState([])
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    loadSavedSeries()
  }, [])

  const loadSavedSeries = () => {
    const savedSeries = localStorage.getItem('userSeries')
    if (savedSeries) {
      setSeries(JSON.parse(savedSeries))
    } else {
      // Series iniciales
      const initialSeries = [
        {
          title: "Mayans M.C.",
          rating: 5,
          Estado: "Completada",
          temporadas: 5,
          year: 2018
        },
        {
          title: "Daredevil: Born Again",
          rating: 5,
          Estado: "Viendo",
          temporadas: 1,
          year: 2025
        },
        {
          title: "Black Mirror T7",
          rating: 5,
          Estado: "Pendiente",
          temporadas: 7,
          year: 2025
        },
        {
          title: "Secret Level",
          rating: 5,
          Estado: "Viendo",
          temporadas: 1,
          year: 2024
        }
      ]
      setSeries(initialSeries)
      localStorage.setItem('userSeries', JSON.stringify(initialSeries))
    }
  }

  const createStars = (rating) => {
    return rating ? '★'.repeat(Math.min(rating, 5)) : '☆☆☆☆☆'
  }

  const handleAddSerie = (newSerie) => {
    const updatedSeries = [...series, newSerie]
    setSeries(updatedSeries)
    localStorage.setItem('userSeries', JSON.stringify(updatedSeries))
    setShowPanel(false)
  }

  return (
    <div id="series" className="gh-series-section">
      <div className="gh-series-container">
        <div className="gh-setlist-header">
          <h2 className="gh-setlist-title">📺 Series</h2>
          <Fab 
            color="primary"
            onClick={() => setShowPanel(true)}
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

        <div className="gh-setlist-container">
          {series.map((serie, index) => (
            <div key={index} className="gh-song-row">
              <div className="gh-song-title">{serie.title}</div>
              <div className="gh-song-stars">{createStars(serie.rating)}</div>
              <div className="gh-song-details">
                {serie.year} • {serie.Estado} • {serie.temporadas} temp.
              </div>
            </div>
          ))}
        </div>
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
