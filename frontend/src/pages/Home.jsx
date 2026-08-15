import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material'
import HomeForestIntro, { hasSeenHomeIntro } from '../components/HomeForestIntro'
import { useIsDesktop } from '../hooks/useIsDesktop'
import './Home.css'

const StatCard = ({ title, stats, icon, color }) => {
  const { total, porcentajeProgreso } = stats
  
  return (
    <Card className="home-stat-card" sx={{ 
      background: 'rgba(8, 16, 32, 0.72)',
      border: '1px solid rgba(80, 150, 255, 0.28)',
      borderRadius: 1,
      height: '100%',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 28px rgba(0, 40, 120, 0.35)',
        borderColor: 'rgba(100, 180, 255, 0.45)',
      }
    }}>
      <CardContent sx={{ p: { xs: 2.5, md: 2 }, px: { md: 1.75 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 1.5 } }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#e8f0ff', 
              fontWeight: 300,
              flex: 1,
              letterSpacing: '0.12em',
              fontSize: { xs: '1.25rem', md: '1.05rem' },
            }}
          >
            {icon} {title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: { xs: 3, md: 2 } }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={110}
              thickness={2.5}
              sx={{
                color: '#f5f5f5',
                position: 'absolute'
              }}
            />
            <CircularProgress
              variant="determinate"
              value={porcentajeProgreso || 0}
              size={110}
              thickness={2.5}
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
                variant="h4" 
                sx={{ 
                  color: '#e8f0ff', 
                  fontWeight: 300,
                  fontSize: { xs: '2rem', md: '1.65rem' },
                }}
              >
                {porcentajeProgreso || 0}%
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(200, 220, 255, 0.75)',
                  fontWeight: 400,
                  fontSize: { xs: '0.75rem', md: '0.68rem' },
                  mt: 0.25,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                Progreso
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: { xs: 1.5, md: 1 }, mt: { xs: 2, md: 1.5 } }}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: { xs: 1.5, md: 1.1 }, 
              bgcolor: 'rgba(0, 10, 30, 0.45)',
              border: '1px solid rgba(80, 150, 255, 0.18)',
              borderRadius: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(10, 30, 60, 0.55)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 60, 180, 0.2)'
              }
            }}
          >
            <Typography variant="h6" sx={{ color: color, fontWeight: 300, fontSize: { md: '1.05rem' } }}>
              {total}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(200, 220, 255, 0.75)', fontWeight: 400, letterSpacing: '0.05em', fontSize: { md: '0.68rem' } }}>
              Total
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: { xs: 1.5, md: 1.1 }, 
              bgcolor: 'rgba(0, 10, 30, 0.45)',
              borderRadius: 1,
              border: '1px solid rgba(80, 150, 255, 0.18)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(10, 30, 60, 0.55)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 60, 180, 0.2)'
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#4ade80', fontWeight: 300, fontSize: { md: '1.05rem' } }}>
              {stats.completadas || stats.completados || stats.leidos || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(200, 220, 255, 0.75)', fontWeight: 400, letterSpacing: '0.05em', fontSize: { md: '0.68rem' } }}>
              Completados
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: { xs: 1.5, md: 1.1 }, 
              bgcolor: 'rgba(0, 10, 30, 0.45)',
              borderRadius: 1,
              border: '1px solid rgba(80, 150, 255, 0.18)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(10, 30, 60, 0.55)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 60, 180, 0.2)'
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#fbbf24', fontWeight: 300, fontSize: { md: '1.05rem' } }}>
              {stats.viendo || stats.jugando || stats.leyendo || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(200, 220, 255, 0.75)', fontWeight: 400, letterSpacing: '0.05em', fontSize: { md: '0.68rem' } }}>
              En progreso
            </Typography>
          </Box>
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: { xs: 1.5, md: 1.1 }, 
              bgcolor: 'rgba(0, 10, 30, 0.45)',
              borderRadius: 1,
              border: '1px solid rgba(80, 150, 255, 0.18)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(10, 30, 60, 0.55)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 60, 180, 0.2)'
              }
            }}
          >
            <Typography variant="h6" sx={{ color: '#ef4444', fontWeight: 300, fontSize: { md: '1.05rem' } }}>
              {stats.pendientes || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(200, 220, 255, 0.75)', fontWeight: 400, letterSpacing: '0.05em', fontSize: { md: '0.68rem' } }}>
              Pendientes
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const Home = () => {
  const isDesktop = useIsDesktop()
  const [showIntro, setShowIntro] = useState(
    () => isDesktop && !hasSeenHomeIntro()
  )
  const [introComplete, setIntroComplete] = useState(
    () => !isDesktop || hasSeenHomeIntro()
  )
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isDesktop) {
      setShowIntro(false)
      setIntroComplete(true)
      return
    }

    const seen = hasSeenHomeIntro()
    setShowIntro(!seen)
    setIntroComplete(seen)
  }, [isDesktop])

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

  const handleIntroComplete = () => {
    setShowIntro(false)
    setIntroComplete(true)
  }

  const renderMainContent = () => {
    if (loading) {
      return (
        <Box
          className="home-page__content"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            bgcolor: 'transparent',
          }}
        >
          <CircularProgress sx={{ color: '#66bbff' }} size={60} thickness={2} />
        </Box>
      )
    }

    if (error) {
      return (
        <Box className="home-page__content" sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      )
    }

    return (
      <Box className="home-page__content" sx={{ p: 4, minHeight: '100vh' }}>
        <Box 
          className="home-page__header"
          sx={{ 
            mb: 6, 
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h2" 
            className="home-page__title"
            sx={{ 
              color: '#e8f0ff',
              fontWeight: 300,
              mb: 2,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textShadow: '0 2px 18px rgba(0, 40, 120, 0.5)',
            }}
          >
            Mi Tiempo Libre
          </Typography>
          <Typography 
            variant="h6" 
            className="home-page__subtitle"
            sx={{ 
              color: 'rgba(180, 210, 255, 0.82)',
              fontWeight: 300,
              letterSpacing: '0.1em',
              fontSize: '0.9rem',
              textShadow: '0 1px 10px rgba(0, 40, 120, 0.35)',
            }}
          >
            Proyecto Luis Shelo
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 2 }} className="home-stats-grid">
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Series"
              stats={stats?.series || {}}
              icon="📺"
              color="#FFD700"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Anime"
              stats={stats?.anime || {}}
              icon="🎌"
              color="#ff6b6b"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Juegos"
              stats={stats?.games || {}}
              icon="🎮"
              color="#a78bfa"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Libros"
              stats={stats?.books || {}}
              icon="📚"
              color="#60a5fa"
            />
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <div className="home-page">
      <Box
        className={`home-page__stage${introComplete ? ' home-page__stage--visible' : ''}`}
      >
        {renderMainContent()}
      </Box>
      {showIntro && <HomeForestIntro onComplete={handleIntroComplete} />}
    </div>
  )
}

export default Home
