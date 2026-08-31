import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material'
import HomeForestIntro, { hasSeenHomeIntro } from '../components/HomeForestIntro'
import { useIsDesktop } from '../hooks/useIsDesktop'
import './Home.css'

const statTileSx = {
  textAlign: 'center',
  p: { xs: 1.5, md: 1.1 },
  bgcolor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.09)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.18)',
  },
}

const StatCard = ({ title, stats, icon, color }) => {
  const { total, porcentajeProgreso } = stats
  
  return (
    <Card className="home-stat-card" sx={{ 
      background: 'rgba(8, 16, 32, 0.24)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: 2,
      height: '100%',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 14px 36px rgba(0, 0, 0, 0.24)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        background: 'rgba(10, 20, 40, 0.32)',
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
          <Box sx={statTileSx}>
            <Typography variant="h6" sx={{ color: color, fontWeight: 300, fontSize: { md: '1.05rem' } }}>
              {total}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(200, 220, 255, 0.75)', fontWeight: 400, letterSpacing: '0.05em', fontSize: { md: '0.68rem' } }}>
              Total
            </Typography>
          </Box>
          <Box sx={statTileSx}>
            <Typography variant="h6" sx={{ color: '#4ade80', fontWeight: 300, fontSize: { md: '1.05rem' } }}>
              {stats.completadas || stats.completados || stats.leidos || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(200, 220, 255, 0.75)', fontWeight: 400, letterSpacing: '0.05em', fontSize: { md: '0.68rem' } }}>
              Completados
            </Typography>
          </Box>
          <Box sx={statTileSx}>
            <Typography variant="h6" sx={{ color: '#fbbf24', fontWeight: 300, fontSize: { md: '1.05rem' } }}>
              {stats.viendo || stats.jugando || stats.leyendo || 0}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(200, 220, 255, 0.75)', fontWeight: 400, letterSpacing: '0.05em', fontSize: { md: '0.68rem' } }}>
              En progreso
            </Typography>
          </Box>
          <Box sx={statTileSx}>
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

  useEffect(() => {
    const html = document.documentElement
    html.classList.add('home-no-scroll')
    document.body.classList.add('home-no-scroll')
    return () => {
      html.classList.remove('home-no-scroll')
      document.body.classList.remove('home-no-scroll')
    }
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
            flex: 1,
            bgcolor: 'transparent',
          }}
        >
          <CircularProgress sx={{ color: '#c4ccd8' }} size={60} thickness={2} />
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
      <Box className="home-page__content" sx={{ px: { xs: 2, md: 3 }, py: { xs: 1, md: 0 } }}>
        <Box 
          className="home-page__header"
          sx={{ 
            mb: { xs: 2, md: 2.5 }, 
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h2" 
            className="home-page__title"
            sx={{ 
              color: '#e8f0ff',
              fontWeight: 300,
              letterSpacing: '0.06em',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.85rem' },
              lineHeight: 1.35,
              textShadow: '0 2px 18px rgba(0, 40, 120, 0.5)',
            }}
          >
            Cosas para hacer en mi tiempo libre
          </Typography>
        </Box>

        <Box className="home-stats-grid">
          <StatCard
            title="Series"
            stats={stats?.series || {}}
            icon="📺"
            color="#FFD700"
          />
          <StatCard
            title="Anime"
            stats={stats?.anime || {}}
            icon="🎌"
            color="#ff6b6b"
          />
          <StatCard
            title="Juegos"
            stats={stats?.games || {}}
            icon="🎮"
            color="#a78bfa"
          />
          <StatCard
            title="Libros"
            stats={stats?.books || {}}
            icon="📚"
            color="#60a5fa"
          />
        </Box>
      </Box>
    )
  }

  return (
    <div className="home-page" style={{ flex: 1, minHeight: 0 }}>
      <Box
        className={`home-page__stage${introComplete ? ' home-page__stage--visible' : ''}`}
        sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        {renderMainContent()}
      </Box>
      {showIntro && <HomeForestIntro onComplete={handleIntroComplete} />}
    </div>
  )
}

export default Home
