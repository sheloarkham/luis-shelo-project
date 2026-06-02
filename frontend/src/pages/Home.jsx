import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material'
import './Home.css'

const StatCard = ({ title, stats, icon, color }) => {
  const { total, porcentajeProgreso } = stats
  
  return (
    <Card sx={{ 
      background: '#ffffff',
      border: `1px solid #e0e0e0`,
      borderRadius: 1,
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
      }
    }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#2c2c2c', 
              fontWeight: 300,
              flex: 1,
              letterSpacing: '0.15em'
            }}
          >
            {icon} {title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={140}
              thickness={2}
              sx={{
                color: '#f5f5f5',
                position: 'absolute'
              }}
            />
            <CircularProgress
              variant="determinate"
              value={porcentajeProgreso || 0}
              size={140}
              thickness={2}
              sx={{
                color: color,
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
              <Typography 
                variant="h3" 
                sx={{ 
                  color: '#2c2c2c', 
                  fontWeight: 300,
                }}
              >
                {porcentajeProgreso || 0}%
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#666',
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  mt: 0.5,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                Progreso
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 3 }}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 2, 
              bgcolor: '#fafafa',
              borderRadius: 1,
              border: `1px solid #e0e0e0`,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ffffff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: color, fontWeight: 300 }}>
              {total}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 400, letterSpacing: '0.05em' }}>
              Total
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 2, 
              bgcolor: '#fafafa',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ffffff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: '#4ade80', fontWeight: 300 }}>
              {stats.completadas || stats.completados || stats.leidos || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 400, letterSpacing: '0.05em' }}>
              Completados
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 2, 
              bgcolor: '#fafafa',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ffffff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: '#fbbf24', fontWeight: 300 }}>
              {stats.viendo || stats.jugando || stats.leyendo || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 400, letterSpacing: '0.05em' }}>
              En progreso
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 2, 
              bgcolor: '#fafafa',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ffffff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 300 }}>
              {stats.pendientes || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 400, letterSpacing: '0.05em' }}>
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
      
      // Calcular estadísticas locales para todas las categorías
      const seriesStats = calculateLocalStats('series-list', 'Completado', 'Viendo')
      const animeStats = calculateLocalStats('anime-list', 'Completado', 'Viendo')
      const gamesStats = calculateLocalStats('games-list', 'Completado', 'Jugando')
      const booksStats = calculateLocalStats('books-list', 'Leido', 'Leyendo')
      
      // Combinar todas las estadísticas
      setStats({
        series: seriesStats,
        anime: animeStats,
        games: gamesStats,
        books: booksStats
      })
    } catch (err) {
      setError('Error al cargar estadísticas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: '#fafafa' }}>
        <CircularProgress sx={{ color: '#2c2c2c' }} size={60} thickness={2} />
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
      <Box sx={{ p: 4, minHeight: '100vh' }}>
        <Box 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              color: '#2c2c2c',
              fontWeight: 300,
              mb: 2,
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}
          >
            Mi Tiempo Libre
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#666',
              fontWeight: 300,
              letterSpacing: '0.1em',
              fontSize: '0.9rem'
            }}
          >
            Proyecto Luis Shelo
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ maxWidth: 1400, mx: 'auto' }}>
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
