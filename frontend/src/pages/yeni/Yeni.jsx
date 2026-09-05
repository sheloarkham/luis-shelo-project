import { useEffect } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { useParticleTheme } from '../../context/ParticleThemeContext'
import BrasilPartyAds from '../../components/BrasilPartyAds'
import ScrollReveal from '../../components/ScrollReveal'
import { whiteStrokeSx } from './yeniData'
import { useRelationshipTimer } from './hooks/useRelationshipTimer'
import { useBrasilAudio } from './hooks/useBrasilAudio'
import YeniTimeCard from './components/YeniTimeCard'
import YeniPhotoGallery from './components/YeniPhotoGallery'
import YeniBrasilSection from './components/YeniBrasilSection'
import '../shared-page.css'
import './Yeni.css'

const Yeni = () => {
  const { runYeniEntrance, resetTheme, yeniContentVisible } = useParticleTheme()
  const timeData = useRelationshipTimer()
  const brasilAudio = useBrasilAudio(yeniContentVisible)

  useEffect(() => {
    runYeniEntrance()
    return () => resetTheme()
  }, [runYeniEntrance, resetTheme])

  return (
    <div className={`page-container yeni-page${yeniContentVisible ? ' yeni-page--visible' : ''}`}>
      <BrasilPartyAds active={brasilAudio.brasilInView && yeniContentVisible} />
      <div className="content">
        <main>
          <Box sx={{ p: 4, minHeight: '100vh' }}>
            <ScrollReveal disabled={!yeniContentVisible}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h2" className="yeni-text-stroke" sx={{ fontWeight: 'bold', mb: 2 }}>
                  💞 Yeni 💞
                </Typography>
                <Typography variant="h5" sx={{ color: '#ff6b9d', fontStyle: 'italic', opacity: 0.9 }}>
                  Nuestra Historia de Amor
                </Typography>

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
                        boxShadow: '0 6px 24px rgba(255, 107, 157, 0.5)',
                      },
                    }}
                  >
                    <Typography variant="body1" sx={{ ...whiteStrokeSx, fontWeight: 600, mb: 0.5, fontSize: '0.95rem' }}>
                      ✨ <strong>Feliz Ricardo:</strong> 21 de marzo, 2024
                    </Typography>
                    <Typography variant="body1" sx={{ ...whiteStrokeSx, fontWeight: 600, fontSize: '0.95rem' }}>
                      ❤️ <strong>Aniversario:</strong> 10 de abril, 2024
                    </Typography>
                  </Box>
                </ScrollReveal>
              </Box>
            </ScrollReveal>

            <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto', justifyContent: 'center' }}>
              <Grid item xs={12} md={5.5}>
                <ScrollReveal disabled={!yeniContentVisible} delay={0.05} direction="left">
                  <YeniTimeCard
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
                  <YeniTimeCard
                    title="Pololeando"
                    emoji="❤️"
                    timeData={timeData.pololeando}
                    color="#c44569"
                    gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                  />
                </ScrollReveal>
              </Grid>
            </Grid>

            <YeniPhotoGallery visible={yeniContentVisible} />

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
                  mx: 'auto',
                }}
              >
                <Typography variant="h6" className="yeni-text-stroke" sx={{ fontStyle: 'italic', lineHeight: 1.8 }}>
                  "Cada segundo contigo es un regalo. Cada minuto, una bendición. Cada día, una nueva razón para
                  amarte más. Te amo, Yeni 💕"
                </Typography>
              </Box>
            </ScrollReveal>

            <YeniBrasilSection visible={yeniContentVisible} {...brasilAudio} />
          </Box>
        </main>
      </div>
    </div>
  )
}

export default Yeni
