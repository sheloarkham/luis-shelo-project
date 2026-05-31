import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material'
import './Home.css'

const StatCard = ({ title, stats, icon, color }) => {
  const { total, porcentajeProgreso } = stats
  
  return (
    <Card sx={{ 
      background: `linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%)`,
      backdropFilter: 'blur(10px)',
      border: `2px solid ${color}`,
      borderRadius: 4,
      height: '100%',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
        transition: 'left 0.5s ease'
      },
      '&:hover': {
        transform: 'translateY(-12px) scale(1.02)',
        boxShadow: `0 20px 60px ${color}50, 0 0 40px ${color}30`,
        border: `2px solid ${color}`,
        '&::before': {
          left: '100%'
        }
      }
    }}>
      <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color, 
              fontWeight: 800,
              flex: 1,
              textShadow: `0 0 20px ${color}80`,
              letterSpacing: '0.5px'
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
              thickness={3}
              sx={{
                color: `${color}20`,
                position: 'absolute'
              }}
            />
            <CircularProgress
              variant="determinate"
              value={porcentajeProgreso || 0}
              size={140}
              thickness={3}
              sx={{
                color: color,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                  filter: `drop-shadow(0 0 8px ${color})`
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
              <Typography 
                variant="h3" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 900,
                  textShadow: `0 0 20px ${color}80`
                }}
              >
                {porcentajeProgreso || 0}%
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: color,
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  mt: 0.5
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
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: 3,
              border: `1px solid ${color}30`,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: `${color}10`,
                border: `1px solid ${color}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: color, fontWeight: 800 }}>
              {total}
            </Typography>
            <Typography variant="caption" sx={{ color: '#aaa', fontWeight: 600 }}>
              Total
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 2, 
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: 3,
              border: '1px solid #4ade8030',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#4ade8010',
                border: '1px solid #4ade80',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: '#4ade80', fontWeight: 800 }}>
              {stats.completadas || stats.completados || stats.leidos || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#aaa', fontWeight: 600 }}>
              Completados
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 2, 
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: 3,
              border: '1px solid #fbbf2430',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#fbbf2410',
                border: '1px solid #fbbf24',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: '#fbbf24', fontWeight: 800 }}>
              {stats.viendo || stats.jugando || stats.leyendo || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#aaa', fontWeight: 600 }}>
              En progreso
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 2, 
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: 3,
              border: '1px solid #ef444430',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ef444410',
                border: '1px solid #ef4444',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 800 }}>
              {stats.pendientes || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: '#aaa', fontWeight: 600 }}>
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
      <Box sx={{ p: 4, minHeight: '100vh' }}>
        <Box 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 4,
              background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
              borderRadius: 2
            }
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              color: '#FFD700',
              fontWeight: 900,
              mb: 1,
              textShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 4px 12px rgba(255, 215, 0, 0.3)',
              letterSpacing: '1px',
              background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease infinite',
              '@keyframes gradientShift': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' }
              }
            }}
          >
            📊 Dashboard de Progreso
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#aaa',
              fontWeight: 500,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }}
          >
            Proyecto Luis & Shelo
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
