import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material'
import { statsApi } from '../services/statsApi'
import './Home.css'

const StatCard = ({ title, stats, icon, color }) => {
  const { total, porcentajeProgreso } = stats
  
  return (
    <Card sx={{ 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      border: `2px solid ${color}`,
      borderRadius: 3,
      height: '100%',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 8px 24px ${color}40`
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ color, fontWeight: 'bold', flex: 1 }}>
            {icon} {title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={porcentajeProgreso || 0}
              size={120}
              thickness={4}
              sx={{
                color: color,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                }
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                {porcentajeProgreso || 0}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#888' }}>
                Progreso
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#1a1a1a', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: color, fontWeight: 'bold' }}>
              {total}
            </Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>
              Total
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#1a1a1a', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#4ade80', fontWeight: 'bold' }}>
              {stats.completadas || stats.completados || stats.leidos || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>
              Completados
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#1a1a1a', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#fbbf24', fontWeight: 'bold' }}>
              {stats.viendo || stats.jugando || stats.leyendo || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>
              En progreso
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#1a1a1a', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
              {stats.pendientes || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#888' }}>
              Pendientes
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const Home = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadStats()
  }, [])

  const calculateLocalStats = (storageKey, completedStatus, inProgressStatus) => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (!saved) return { total: 0, completados: 0, viendo: 0, pendientes: 0, porcentajeProgreso: 0 }
      
      const items = JSON.parse(saved)
      const total = items.length
      const completados = items.filter(item => item.Estado === completedStatus).length
      const inProgress = items.filter(item => item.Estado === inProgressStatus).length
      const pendientes = items.filter(item => item.Estado === 'Pendiente').length
      const porcentajeProgreso = total > 0 ? Math.round(((completados + inProgress) / total) * 100) : 0
      
      return {
        total,
        completados,
        [inProgressStatus.toLowerCase()]: inProgress,
        pendientes,
        porcentajeProgreso
      }
    } catch (err) {
      console.error(`Error calculating stats for ${storageKey}:`, err)
      return { total: 0, completados: 0, viendo: 0, pendientes: 0, porcentajeProgreso: 0 }
    }
  }

  const loadStats = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Cargar estadísticas del backend (solo series)
      const backendData = await statsApi.getAll()
      
      // Calcular estadísticas locales
      const animeStats = calculateLocalStats('anime-list', 'Completado', 'Viendo')
      const gamesStats = calculateLocalStats('games-list', 'Completado', 'Jugando')
      const booksStats = calculateLocalStats('books-list', 'Leido', 'Leyendo')
      
      // Combinar todas las estadísticas
      setStats({
        series: backendData.series,
        anime: animeStats,
        games: gamesStats,
        books: booksStats
      })
    } catch (err) {
      setError('Error al cargar estadísticas. ¿Está el backend corriendo?')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: '#FFD700' }} size={60} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    )
  }

  return (
    <div className="home-page">
      <Box sx={{ p: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: '#FFD700', fontWeight: 'bold', mb: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: '#888' }}>
            Proyecto Luis & Shelo
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StatCard
              title="Series"
              stats={stats?.series || {}}
              icon="📺"
              color="#FFD700"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StatCard
              title="Anime"
              stats={stats?.anime || {}}
              icon="🎌"
              color="#ff6b6b"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StatCard
              title="Juegos"
              stats={stats?.games || {}}
              icon="🎮"
              color="#a78bfa"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StatCard
              title="Libros"
              stats={stats?.books || {}}
              icon="📚"
              color="#60a5fa"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Home
