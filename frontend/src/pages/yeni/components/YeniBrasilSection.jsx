import {
  Box,
  Card,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import ScrollReveal from '../../../components/ScrollReveal'
import { scrollRevealStagger } from '../../../utils/scrollRevealStagger'
import {
  BRASIL_AUDIO_SRC,
  IMPERDIBLES,
  OTRAS_ACTIVIDADES,
  setBrasilAudioStart,
} from '../yeniData'

export default function YeniBrasilSection({
  visible,
  audioRef,
  brasilSectionRef,
  brasilInView,
  audioMuted,
  audioBlocked,
  audioLoadError,
  setAudioLoadError,
  handlePlayBrasilClick,
  toggleBrasilMute,
  handleBrasilAudioEnded,
}) {
  return (
    <>
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
              <Tooltip
                title={audioLoadError ? 'No se pudo cargar la cancion' : 'Toca para escuchar la musica de Brasil'}
              >
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

        <ScrollReveal disabled={!visible}>
          <Typography variant="h3" className="yeni-text-stroke" sx={{ fontWeight: 'bold', mb: 2 }}>
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
              animation: 'gradientShift 3s ease infinite',
              '@keyframes gradientShift': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
              },
              backgroundSize: '200% auto',
              letterSpacing: '0.05em',
            }}
          >
            BRASIL
          </Typography>
        </ScrollReveal>

        <ScrollReveal disabled={!visible} delay={0.1} direction="scale">
          <Card
            sx={{
              background:
                'linear-gradient(135deg, rgba(0, 151, 57, 0.2) 0%, rgba(254, 221, 0, 0.2) 50%, rgba(0, 39, 118, 0.2) 100%)',
              border: '4px solid #009739',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(0, 151, 57, 0.4)',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 20px 60px rgba(254, 221, 0, 0.6)',
                border: '4px solid #FEDD00',
              },
            }}
          >
            <CardMedia
              component="img"
              image="/assetsAmor/brasil.png"
              alt="Brasil - Nuestra próxima aventura"
              sx={{ width: '100%', height: 'auto', maxHeight: 600, objectFit: 'cover' }}
            />
          </Card>
        </ScrollReveal>

        <ScrollReveal disabled={!visible} delay={0.05}>
          <Typography variant="h3" className="yeni-text-stroke" sx={{ fontWeight: 'bold', mt: 6, mb: 3 }}>
            Los 3 imperdibles
          </Typography>
        </ScrollReveal>

        <Box className="rio-imperdibles-row">
          {IMPERDIBLES.map((spot, index) => (
            <ScrollReveal
              key={spot.id}
              disabled={!visible}
              delay={scrollRevealStagger(index, 0.12, 3)}
              className="yeni-rio-spot-reveal"
            >
              <Box className="rio-spot-card">
                <Box className="rio-spot-image-wrap">
                  <CardMedia component="img" image={spot.image} alt={spot.name} />
                </Box>
                <Typography variant="subtitle2" className="yeni-text-stroke rio-spot-title" sx={{ fontWeight: 'bold' }}>
                  {spot.name}
                </Typography>
              </Box>
            </ScrollReveal>
          ))}
        </Box>

        <ScrollReveal disabled={!visible}>
          <Typography variant="h3" className="yeni-text-stroke" sx={{ fontWeight: 'bold', mt: 6, mb: 4 }}>
            Más cosas para hacer en Río
          </Typography>
        </ScrollReveal>

        <Grid container spacing={2} className="rio-activities-bento">
          {OTRAS_ACTIVIDADES.map((actividad, index) => (
            <Grid
              item
              xs={12}
              sm={actividad.layout === 'hero' ? 12 : actividad.layout === 'wide' ? 12 : 6}
              md={
                actividad.layout === 'hero'
                  ? 8
                  : actividad.layout === 'wide'
                    ? 12
                    : actividad.layout === 'tall'
                      ? 4
                      : 4
              }
              key={actividad.name}
              className={`rio-activity-grid-item rio-activity-grid-item--${actividad.layout}`}
            >
              <ScrollReveal
                disabled={!visible}
                delay={scrollRevealStagger(index, 0.08, 6)}
                variant="romantic"
                className="scroll-reveal--fill"
              >
                <Card
                  className={`rio-activity-card rio-activity-card--${actividad.layout}`}
                  sx={{
                    p: actividad.layout === 'hero' ? 3 : 2.5,
                    height: '100%',
                    minHeight:
                      actividad.layout === 'hero' ? 140 : actividad.layout === 'tall' ? 180 : 130,
                    border: '2px solid rgba(0, 151, 57, 0.4)',
                    borderRadius: 3,
                    bgcolor: 'rgba(0, 151, 57, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant={actividad.layout === 'hero' ? 'h4' : 'h5'}
                    className="yeni-text-stroke"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {actividad.emoji} {actividad.name}
                  </Typography>
                  <Typography
                    variant={actividad.layout === 'hero' ? 'body1' : 'body2'}
                    className="yeni-text-stroke"
                    sx={{ opacity: 0.95 }}
                  >
                    {actividad.description}
                  </Typography>
                </Card>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
