import { Box, Card, CardContent, Typography, Grid } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ScrollReveal from '../../../components/ScrollReveal'
import LazyRevealImage from '../../../components/LazyRevealImage'
import { scrollRevealStagger } from '../../../utils/scrollRevealStagger'
import { YENI_PHOTOS } from '../yeniData'

export default function YeniPhotoGallery({ visible }) {
  return (
    <Box sx={{ mt: 6, maxWidth: 1400, mx: 'auto' }}>
      <ScrollReveal disabled={!visible}>
        <Typography
          variant="h3"
          className="yeni-text-stroke"
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
        >
          Nuestros Recuerdos
        </Typography>
      </ScrollReveal>

      <Grid container spacing={4}>
        {YENI_PHOTOS.map((photo, index) => (
          <Grid item xs={12} md={4} key={photo.id}>
            <ScrollReveal
              disabled={!visible}
              delay={scrollRevealStagger(index, 0.1, 6)}
              variant="romantic"
              className="scroll-reveal--fill"
            >
              <Card
                sx={{
                  background:
                    'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 69, 105, 0.2) 100%)',
                  border: '3px solid rgba(255, 107, 157, 0.3)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-15px) scale(1.05)',
                    boxShadow: '0 20px 60px rgba(255, 107, 157, 0.5)',
                    border: '3px solid #ff6b9d',
                    '& .photo-overlay': { opacity: 1 },
                    '& .lazy-reveal-image__img': { transform: 'scale(1.1)' },
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <LazyRevealImage src={photo.src} alt={photo.caption} height={350} />
                  <Box
                    className="photo-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(to top, rgba(255, 107, 157, 0.9) 0%, transparent 50%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      p: 3,
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
                              '50%': { transform: 'scale(1.3)', opacity: 0.7 },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" className="yeni-text-stroke" sx={{ fontWeight: 'bold' }}>
                    {photo.caption}
                  </Typography>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
