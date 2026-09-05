import { Box, Card, CardContent, Typography, Grid } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { whiteStrokeSx } from '../yeniData'

export default function YeniTimeCard({ title, emoji, timeData, color, gradient }) {
  return (
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
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ ...whiteStrokeSx, fontWeight: 'bold', mb: 1 }}>
            {emoji} {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            {[...Array(5)].map((_, i) => (
              <FavoriteIcon
                key={i}
                sx={{
                  color,
                  fontSize: 20,
                  animation: `heartbeat ${1 + i * 0.2}s ease-in-out infinite`,
                  '@keyframes heartbeat': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                  },
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
            { value: timeData.seconds, label: 'Segundos', color: '#1dd1a1' },
          ].map(({ value, label, color: cellColor }) => (
            <Grid item xs={4} key={label}>
              <Box
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 3,
                  p: 2,
                  textAlign: 'center',
                  border: `2px solid ${cellColor}40`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: `2px solid ${cellColor}`,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: cellColor, fontWeight: 'bold', textShadow: `0 0 20px ${cellColor}80` }}
                >
                  {value}
                </Typography>
                <Typography variant="body2" sx={{ ...whiteStrokeSx, fontWeight: 'bold', mt: 1 }}>
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
