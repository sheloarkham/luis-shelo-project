import { useState, useEffect, useLayoutEffect } from 'react'
import { Box, CircularProgress, Alert } from '@mui/material'
import HomeForestIntro from '../components/HomeForestIntro'
import CustomizeToggle from '../components/CustomizeToggle'
import PageHeader from '../components/PageHeader'
import { useIsDesktop } from '../hooks/useIsDesktop'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import '../styles/futuristicPage.css'
import './Home.css'

const StatCard = ({ title, stats, color }) => {
  const { porcentajeProgreso } = stats

  return (
    <article className="neo-stat-card home-stat-card">
      <div className="neo-stat-card__glow" style={{ background: color }} aria-hidden="true" />

      <div className="neo-stat-card__header">
        <h3 className="neo-stat-card__title">{title}</h3>
      </div>

      <div className="neo-stat-card__ring-wrap">
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={110}
            thickness={2.5}
            sx={{ color: 'rgba(255,255,255,0.08)', position: 'absolute' }}
          />
          <CircularProgress
            variant="determinate"
            value={porcentajeProgreso || 0}
            size={110}
            thickness={2.5}
            sx={{ color }}
          />
          <div className="neo-stat-card__ring-center">
            <p className="neo-stat-card__ring-pct">{porcentajeProgreso || 0}%</p>
            <p className="neo-stat-card__ring-label">Progreso</p>
          </div>
        </Box>
      </div>

      <div className="neo-stat-card__tiles">
        <div className="neo-stat-tile">
          <span className="neo-stat-tile__value" style={{ color: '#a7f3d0' }}>
            {stats.completadas || stats.completados || stats.leidos || 0}
          </span>
          <span className="neo-stat-tile__label">Completados</span>
        </div>
        <div className="neo-stat-tile">
          <span className="neo-stat-tile__value" style={{ color: '#fca5a5' }}>
            {stats.pendientes || 0}
          </span>
          <span className="neo-stat-tile__label">Pendientes</span>
        </div>
      </div>
    </article>
  )
}

const Home = () => {
  const isDesktop = useIsDesktop()
  const [showIntro, setShowIntro] = useState(() => isDesktop)
  const [introComplete, setIntroComplete] = useState(() => !isDesktop)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useLayoutEffect(() => {
    if (!isDesktop) {
      setShowIntro(false)
      setIntroComplete(true)
      return
    }

    setShowIntro(true)
    setIntroComplete(false)
  }, [isDesktop])

  useEffect(() => {
    loadStats()
  }, [])

  useLockBodyScroll()

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

      const seriesStats = calculateLocalStats('series-list', 'Completado', 'Viendo')
      const animeStats = calculateLocalStats('anime-list', 'Completado', 'Viendo')
      const gamesStats = calculateLocalStats('games-list', 'Completado', 'Jugando')
      const booksStats = calculateLocalStats('books-list', 'Leido', 'Leyendo')

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
          <CircularProgress sx={{ color: '#8ecae6' }} size={60} thickness={2} />
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

    const allStats = [stats?.series, stats?.anime, stats?.games, stats?.books].filter(Boolean)
    const avgProgress = allStats.length
      ? Math.round(allStats.reduce((sum, s) => sum + (s.porcentajeProgreso || 0), 0) / allStats.length)
      : 0

    return (
      <Box className="home-page__content" sx={{ px: { xs: 2, md: 3 }, py: { xs: 1, md: 0 } }}>
        <div className="home-stats-stack">
          <PageHeader
            subtitle="Cosas para hacer en mi tiempo libre"
            className="home-stats-header"
          >
            <div className="home-total-progress">
              <span className="home-total-progress__value">{avgProgress}%</span>
              <span className="home-total-progress__label">Progreso total</span>
            </div>
          </PageHeader>

          <Box className="home-stats-grid">
          <StatCard
            title="Series"
            stats={stats?.series || {}}
            color="#FFD700"
          />
          <StatCard
            title="Anime"
            stats={stats?.anime || {}}
            color="#ff6b6b"
          />
          <StatCard
            title="Juegos"
            stats={stats?.games || {}}
            color="#a78bfa"
          />
          <StatCard
            title="Libros"
            stats={stats?.books || {}}
            color="#60a5fa"
          />
          </Box>
        </div>
      </Box>
    )
  }

  return (
    <div className="home-page" style={{ flex: 1, minHeight: 0 }}>
      <CustomizeToggle />
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
