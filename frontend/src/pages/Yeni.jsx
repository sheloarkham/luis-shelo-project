import { useState, useEffect, useRef, useCallback } from 'react'
import { Box, Card, CardContent, Typography, Grid, CardMedia, IconButton, Tooltip } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import { useParticleTheme } from '../context/ParticleThemeContext'
import BrasilPartyAds from '../components/BrasilPartyAds'
import ScrollReveal from '../components/ScrollReveal'
import { scrollRevealStagger } from '../utils/scrollRevealStagger'
import './shared-page.css'
import './Yeni.css'

/** Sombra que simula borde negro en texto blanco (para MUI sx) */
const whiteStrokeSx = {
  color: '#ffffff',
  textShadow: `
    -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000,
    0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000, 1px 0 0 #000
  `,
}

/** Los 3 imperdibles de Río de Janeiro */
const IMPERDIBLES = [
  {
    id: 1,
    name: 'Cristo Redentor',
    image: '/images/rio/cristo-redentor.png',
    description: 'El ícono de Río en el Corcovado, con vistas increíbles de toda la ciudad.',
  },
  {
    id: 2,
    name: 'Pan de Azúcar',
    image: '/images/rio/pan-de-azucar.png',
    description: 'Subir en el bondinho y ver la bahía desde las alturas.',
  },
  {
    id: 3,
    name: 'AquaRio',
    image: '/images/rio/aquario.png',
    description: 'El acuario marino más grande de Brasil, con túnel submarino.',
  },
]

/** Otras cosas que podemos hacer en Río */
const OTRAS_ACTIVIDADES = [
  { name: 'Playa de Copacabana', emoji: '🏖️', description: 'Camina por la orilla, mira el atardecer y prueba un açaí.' },
  { name: 'Playa de Ipanema', emoji: '🌊', description: 'Famosa por su ambiente, los morros y el posto de sol.' },
  { name: 'Escadaria Selarón', emoji: '🎨', description: 'Escaleras coloridas en Lapa, perfectas para fotos juntos.' },
  { name: 'Jardim Botânico', emoji: '🌿', description: 'Paseo entre palmeras, orquídeas y naturaleza tropical.' },
  { name: 'Maracaná', emoji: '⚽', description: 'Visitar el templo del fútbol brasileño y sentir la pasión.' },
  { name: 'Feira de São Cristóvão', emoji: '🎶', description: 'Música, comida nordestina y ambiente de fiesta.' },
]

const BRASIL_AUDIO_SRC = '/audio/brasil-bossa.mp3'
const BRASIL_AUDIO_VOLUME = 0.45
const BRASIL_AUDIO_START = 27

const setBrasilAudioStart = (audio) => {
  if (!audio) return
  audio.currentTime = BRASIL_AUDIO_START
}

const Yeni = () => {
  const { runYeniEntrance, resetTheme, yeniContentVisible } = useParticleTheme()
  const brasilSectionRef = useRef(null)
  const audioRef = useRef(null)
  const audioUnlockedRef = useRef(false)
  const brasilInViewRef = useRef(false)
  const audioMutedRef = useRef(false)
  const [brasilInView, setBrasilInView] = useState(false)
  const [audioMuted, setAudioMuted] = useState(false)
  const [audioBlocked, setAudioBlocked] = useState(false)
  const [audioLoadError, setAudioLoadError] = useState(false)
  const [timeData, setTimeData] = useState({
    conocidos: { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
    pololeando: { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  })

  const photos = [
    { id: 1, src: '/assetsAmor/IMG-20250223-WA0022.jpg', caption: 'Nuestros momentos juntos 💕' },
    { id: 2, src: '/assetsAmor/IMG-20250711-WA0013.jpg', caption: 'Siempre felices 🥰' },
    { id: 3, src: '/assetsAmor/IMG_20240404_171933.jpg', caption: 'Te amo cada día más ❤️' },
    { id: 4, src: '/assetsAmor/IMG-20240509-WA0023.jpg', caption: 'Recuerdos inolvidables 💖' },
    { id: 5, src: '/assetsAmor/IMG-20240509-WA0061.jpg', caption: 'Juntos para siempre 🌟' },
    { id: 6, src: '/assetsAmor/IMG-20241112-WA0024.jpg', caption: 'Amor verdadero 💞' },
    { id: 7, src: '/assetsAmor/IMG-20241112-WA0025.jpg', caption: 'Nuestra felicidad 😊' },
    { id: 8, src: '/assetsAmor/IMG-20241117-WA0012.jpg', caption: 'Momentos especiales 🥰' },
    { id: 9, src: '/assetsAmor/IMG-20250122-WA0002.jpg', caption: 'Siempre unidos 💑' },
    { id: 10, src: '/assetsAmor/IMG-20250316-WA0009.jpg', caption: 'Mi amor por ti crece 🌹' },
    { id: 11, src: '/assetsAmor/IMG-20250504-WA0034.jpg', caption: 'Contigo todo es mejor 💝' },
    { id: 12, src: '/assetsAmor/IMG_20240328_235414_003.jpg', caption: 'Eres mi todo 💫' },
    { id: 13, src: '/assetsAmor/IMG_20240404_171408.jpg', caption: 'Te amaré por siempre 💗' }
  ]

  const calculateTimeDifference = (startDate) => {
    const now = new Date()
    const start = new Date(startDate)
    const diff = now - start

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    // Cálculo más preciso de años y meses
    let years = now.getFullYear() - start.getFullYear()
    let months = now.getMonth() - start.getMonth()
    let remainingDays = now.getDate() - start.getDate()

    if (remainingDays < 0) {
      months--
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      remainingDays += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    return {
      years,
      months,
      days: remainingDays,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60
    }
  }

  useEffect(() => {
    runYeniEntrance()
    return () => {
      resetTheme()
    }
  }, [runYeniEntrance, resetTheme])

  useEffect(() => {
    const updateTime = () => {
      setTimeData({
        conocidos: calculateTimeDifference('2024-03-21T00:00:00'),
        pololeando: calculateTimeDifference('2024-04-10T00:00:00')
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  brasilInViewRef.current = brasilInView
  audioMutedRef.current = audioMuted

  const playBrasilAudio = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || audioMutedRef.current || !brasilInViewRef.current) return false

    audio.volume = BRASIL_AUDIO_VOLUME
    if (audio.currentTime < BRASIL_AUDIO_START) {
      setBrasilAudioStart(audio)
    }
    try {
      await audio.play()
      setAudioBlocked(false)
      return true
    } catch {
      setAudioBlocked(true)
      return false
    }
  }, [])

  const unlockBrasilAudio = useCallback(async () => {
    if (audioUnlockedRef.current) return true

    const audio = audioRef.current
    if (!audio) return false

    audio.volume = BRASIL_AUDIO_VOLUME
    setBrasilAudioStart(audio)
    try {
      await audio.play()
      audio.pause()
      setBrasilAudioStart(audio)
      audioUnlockedRef.current = true
      setAudioBlocked(false)
      return true
    } catch {
      setAudioBlocked(true)
      return false
    }
  }, [])

  const handleBrasilAudioEnded = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !brasilInViewRef.current || audioMutedRef.current) return

    setBrasilAudioStart(audio)
    audio.play().catch(() => setAudioBlocked(true))
  }, [])

  useEffect(() => {
    const handleInteract = async () => {
      const unlocked = await unlockBrasilAudio()
      if (unlocked && brasilInViewRef.current && !audioMutedRef.current) {
        await playBrasilAudio()
      }
    }

    window.addEventListener('pointerdown', handleInteract, { passive: true })
    window.addEventListener('keydown', handleInteract)
    window.addEventListener('wheel', handleInteract, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', handleInteract)
      window.removeEventListener('keydown', handleInteract)
      window.removeEventListener('wheel', handleInteract)
    }
  }, [unlockBrasilAudio, playBrasilAudio])

  useEffect(() => {
    if (!yeniContentVisible) return

    const section = brasilSectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setBrasilInView(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [yeniContentVisible])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (brasilInView && !audioMuted) {
      if (audioUnlockedRef.current) {
        playBrasilAudio()
      } else {
        setAudioBlocked(true)
      }
    } else {
      audio.pause()
      if (!brasilInView) setBrasilAudioStart(audio)
    }
  }, [brasilInView, audioMuted, playBrasilAudio])

  useEffect(() => () => audioRef.current?.pause(), [])

  const handlePlayBrasilClick = async () => {
    await unlockBrasilAudio()
    await playBrasilAudio()
  }

  const toggleBrasilMute = () => {
    setAudioMuted((prev) => {
      const next = !prev
      audioMutedRef.current = next
      const audio = audioRef.current
      if (audio) {
        audio.muted = next
        if (!next && brasilInViewRef.current) playBrasilAudio()
      }
      return next
    })
  }

  const TimeCard = ({ title, emoji, timeData, color, gradient }) => (
    <Card
      sx={{
        background: gradient,
        border: `3px solid ${color}`,
        borderRadius: 4,
        boxShadow: `0 8px 32px ${color}40`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-10px) scale(1.02)',
          boxShadow: `0 12px 48px ${color}60`,
        }
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              ...whiteStrokeSx,
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            {emoji} {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {[...Array(5)].map((_, i) => (
              <FavoriteIcon
                key={i}
                sx={{
                  color: color,
                  fontSize: 20,
                  animation: `heartbeat ${1 + i * 0.2}s ease-in-out infinite`,
                  '@keyframes heartbeat': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' }
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={2}>
          {[
            { value: timeData.years, label: 'Años', color: '#ff6b9d' },
            { value: timeData.months, label: 'Meses', color: '#c44569' },
            { value: timeData.days, label: 'Días', color: '#f7b731' },
            { value: timeData.hours, label: 'Horas', color: '#5f27cd' },
            { value: timeData.minutes, label: 'Minutos', color: '#00d2d3' },
            { value: timeData.seconds, label: 'Segundos', color: '#1dd1a1' }
          ].map(({ value, label, color }) => (
            <Grid item xs={4} key={label}>
              <Box
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 3,
                  p: 2,
                  textAlign: 'center',
                  border: `2px solid ${color}40`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: `2px solid ${color}`,
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: color,
                    fontWeight: 'bold',
                    textShadow: `0 0 20px ${color}80`
                  }}
                >
                  {value}
                </Typography>
          <Typography
            variant="body2"
            sx={{
              ...whiteStrokeSx,
              fontWeight: 'bold',
              mt: 1,
            }}
          >
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )

  return (
    <div className={`page-container yeni-page${yeniContentVisible ? ' yeni-page--visible' : ''}`}>
      <BrasilPartyAds active={brasilInView && yeniContentVisible} />
      <div className="content">
        <main>
          <Box sx={{ p: 4, minHeight: '100vh' }}>
            <ScrollReveal disabled={!yeniContentVisible}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h2"
                className="yeni-text-stroke"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                💞 Yeni 💞
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#ff6b9d',
                  fontStyle: 'italic',
                  opacity: 0.9
                }}
              >
                Nuestra Historia de Amor
              </Typography>

              {/* Burbuja de Fechas Importantes */}
              <ScrollReveal disabled={!yeniContentVisible} delay={0.08}>
              <Box
                sx={{
                  mt: 3,
                  display: 'inline-block',
                  bgcolor: 'rgba(255, 107, 157, 0.15)',
                  border: '2px solid rgba(255, 107, 157, 0.4)',
                  borderRadius: 4,
                  px: 3,
                  py: 2,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(255, 107, 157, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 107, 157, 0.25)',
                    border: '2px solid rgba(255, 107, 157, 0.6)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 24px rgba(255, 107, 157, 0.5)'
                  }
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    ...whiteStrokeSx,
                    fontWeight: 600,
                    mb: 0.5,
                    fontSize: '0.95rem',
                  }}
                >
                  ✨ <strong>Feliz Ricardo:</strong> 21 de marzo, 2024
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    ...whiteStrokeSx,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  ❤️ <strong>Aniversario:</strong> 10 de abril, 2024
                </Typography>
              </Box>
              </ScrollReveal>
            </Box>
            </ScrollReveal>

            <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto', justifyContent: 'center' }}>
              <Grid item xs={12} md={5.5}>
                <ScrollReveal disabled={!yeniContentVisible} delay={0.05} direction="left">
                <TimeCard
                  title="Desde que nos conocimos"
                  emoji="✨"
                  timeData={timeData.conocidos}
                  color="#ff6b9d"
                  gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                />
                </ScrollReveal>
              </Grid>
              <Grid item xs={12} md={5.5}>
                <ScrollReveal disabled={!yeniContentVisible} delay={0.05} direction="right">
                <TimeCard
                  title="Pololeando"
                  emoji="❤️"
                  timeData={timeData.pololeando}
                  color="#c44569"
                  gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                />
                </ScrollReveal>
              </Grid>
            </Grid>

            {/* Galería de Fotos */}
            <Box sx={{ mt: 6, maxWidth: 1400, mx: 'auto' }}>
              <ScrollReveal disabled={!yeniContentVisible}>
              <Typography
                variant="h3"
                className="yeni-text-stroke"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  mb: 4,
                }}
              >
                 Nuestros Recuerdos
              </Typography>
              </ScrollReveal>

              <Grid container spacing={4}>
                {photos.map((photo, index) => (
                  <Grid item xs={12} md={4} key={photo.id}>
                    <ScrollReveal
                      disabled={!yeniContentVisible}
                      delay={scrollRevealStagger(index, 0.08, 6)}
                      className="scroll-reveal--fill"
                    >
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 69, 105, 0.2) 100%)',
                        border: '3px solid rgba(255, 107, 157, 0.3)',
                        borderRadius: 4,
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-15px) scale(1.05)',
                          boxShadow: '0 20px 60px rgba(255, 107, 157, 0.5)',
                          border: '3px solid #ff6b9d',
                          '& .photo-overlay': {
                            opacity: 1
                          },
                          '& img': {
                            transform: 'scale(1.1)'
                          }
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          image={photo.src}
                          alt={photo.caption}
                          sx={{
                            height: 350,
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease'
                          }}
                        />
                        <Box
                          className="photo-overlay"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to top, rgba(255, 107, 157, 0.9) 0%, transparent 50%)',
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            p: 3
                          }}
                        >
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {[...Array(3)].map((_, i) => (
                              <FavoriteIcon
                                key={i}
                                sx={{
                                  color: 'white',
                                  fontSize: 28,
                                  animation: `pulse ${0.8 + i * 0.2}s ease-in-out infinite`,
                                  '@keyframes pulse': {
                                    '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                                    '50%': { transform: 'scale(1.3)', opacity: 0.7 }
                                  }
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Box>
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Typography
                          variant="h6"
                          className="yeni-text-stroke"
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                          {photo.caption}
                        </Typography>
                      </CardContent>
                    </Card>
                    </ScrollReveal>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <ScrollReveal disabled={!yeniContentVisible} direction="scale">
            <Box
              sx={{
                mt: 6,
                textAlign: 'center',
                p: 4,
                bgcolor: 'rgba(255, 107, 157, 0.1)',
                borderRadius: 4,
                border: '2px solid rgba(255, 107, 157, 0.3)',
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              <Typography
                variant="h6"
                className="yeni-text-stroke"
                sx={{
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                }}
              >
                "Cada segundo contigo es un regalo. Cada minuto, una bendición.
                Cada día, una nueva razón para amarte más. Te amo, Yeni 💕"
              </Typography>
            </Box>
            </ScrollReveal>

            {/* Sección Brasil */}
            <audio
              ref={audioRef}
              src={BRASIL_AUDIO_SRC}
              preload="auto"
              onLoadedMetadata={(event) => setBrasilAudioStart(event.currentTarget)}
              onEnded={handleBrasilAudioEnded}
              onError={() => setAudioLoadError(true)}
            />

            <Box
              ref={brasilSectionRef}
              className="yeni-brasil-section"
              sx={{ mt: 8, textAlign: 'center', maxWidth: 1000, mx: 'auto', position: 'relative' }}
            >
              {brasilInView && (
                <Box className="yeni-brasil-audio-controls">
                  {(audioBlocked || audioLoadError) && !audioMuted && (
                    <Tooltip title={audioLoadError ? 'No se pudo cargar la cancion' : 'Toca para escuchar la musica de Brasil'}>
                      <IconButton
                        className="yeni-brasil-audio-btn yeni-brasil-audio-btn--hint"
                        onClick={handlePlayBrasilClick}
                        aria-label="Reproducir musica de Brasil"
                      >
                        <MusicNoteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title={audioMuted ? 'Activar música' : 'Silenciar música'}>
                    <IconButton
                      className="yeni-brasil-audio-btn"
                      onClick={toggleBrasilMute}
                      aria-label={audioMuted ? 'Activar música de Brasil' : 'Silenciar música de Brasil'}
                    >
                      {audioMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <ScrollReveal disabled={!yeniContentVisible}>
              <Typography
                variant="h3"
                className="yeni-text-stroke"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Nuestra próxima aventura:
              </Typography>
              
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  fontSize: { xs: '4rem', md: '6rem' },
                  background: 'linear-gradient(135deg, #009739 0%, #FEDD00 35%, #FEDD00 65%, #002776 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: 'none',
                  animation: 'gradientShift 3s ease infinite',
                  '@keyframes gradientShift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                  },
                  backgroundSize: '200% auto',
                  letterSpacing: '0.05em'
                }}
              >
                 BRASIL 
              </Typography>
              </ScrollReveal>

              <ScrollReveal disabled={!yeniContentVisible} delay={0.1} direction="scale">
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(0, 151, 57, 0.2) 0%, rgba(254, 221, 0, 0.2) 50%, rgba(0, 39, 118, 0.2) 100%)',
                  border: '4px solid #009739',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 12px 48px rgba(0, 151, 57, 0.4)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 20px 60px rgba(254, 221, 0, 0.6)',
                    border: '4px solid #FEDD00'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image="/assetsAmor/brasil.png"
                  alt="Brasil - Nuestra próxima aventura"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 600,
                    objectFit: 'cover'
                  }}
                />
              </Card>
              </ScrollReveal>

              {/* Los 3 imperdibles — cuadrados en fila */}
              <ScrollReveal disabled={!yeniContentVisible} delay={0.05}>
              <Typography
                variant="h3"
                className="yeni-text-stroke"
                sx={{ fontWeight: 'bold', mt: 6, mb: 3 }}
              >
                Los 3 imperdibles
              </Typography>
              </ScrollReveal>

              <Box className="rio-imperdibles-row">
                {IMPERDIBLES.map((spot, index) => (
                  <ScrollReveal
                    key={spot.id}
                    disabled={!yeniContentVisible}
                    delay={scrollRevealStagger(index, 0.12, 3)}
                    className="yeni-rio-spot-reveal"
                  >
                  <Box className="rio-spot-card">
                    <Box className="rio-spot-image-wrap">
                      <CardMedia
                        component="img"
                        image={spot.image}
                        alt={spot.name}
                      />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      className="yeni-text-stroke rio-spot-title"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {spot.name}
                    </Typography>
                  </Box>
                  </ScrollReveal>
                ))}
              </Box>

              {/* Más cosas para hacer en Río */}
              <ScrollReveal disabled={!yeniContentVisible}>
              <Typography
                variant="h3"
                className="yeni-text-stroke"
                sx={{ fontWeight: 'bold', mt: 6, mb: 4 }}
              >
                Más cosas para hacer en Río
              </Typography>
              </ScrollReveal>

              <Grid container spacing={2}>
                {OTRAS_ACTIVIDADES.map((actividad, index) => (
                  <Grid item xs={12} sm={6} md={4} key={actividad.name}>
                    <ScrollReveal
                      disabled={!yeniContentVisible}
                      delay={scrollRevealStagger(index, 0.07, 6)}
                      className="scroll-reveal--fill"
                    >
                    <Card
                      className="rio-activity-card"
                      sx={{
                        p: 2.5,
                        height: '100%',
                        border: '2px solid rgba(0, 151, 57, 0.4)',
                        borderRadius: 3,
                        bgcolor: 'rgba(0, 151, 57, 0.08)',
                      }}
                    >
                      <Typography variant="h5" className="yeni-text-stroke" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {actividad.emoji} {actividad.name}
                      </Typography>
                      <Typography variant="body2" className="yeni-text-stroke">
                        {actividad.description}
                      </Typography>
                    </Card>
                    </ScrollReveal>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </main>
      </div>
    </div>
  )
}



export default Yeni
