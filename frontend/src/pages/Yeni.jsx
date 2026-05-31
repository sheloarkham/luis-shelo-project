import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, Grid } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import './shared-page.css'

const Yeni = () => {
  const [timeData, setTimeData] = useState({
    conocidos: { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
    pololeando: { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  })

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
              color: 'white',
              fontWeight: 'bold',
              mb: 1,
              textShadow: `0 2px 8px ${color}80`
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
                    color: 'white',
                    fontWeight: 'bold',
                    mt: 1,
                    opacity: 0.9
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
    <div className="page-container">
      <div className="content">
        <main>
          <Box sx={{ p: 4, minHeight: '100vh' }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  mb: 2,
                  textShadow: '0 4px 12px rgba(255, 107, 157, 0.5)',
                  background: 'linear-gradient(45deg, #ff6b9d, #c44569, #ff6b9d)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient 3s ease infinite',
                  '@keyframes gradient': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                  }
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
            </Box>

            <Grid container spacing={4} sx={{ maxWidth: 1400, mx: 'auto' }}>
              <Grid item xs={12} md={6}>
                <TimeCard
                  title="Desde que nos conocimos"
                  emoji="✨"
                  timeData={timeData.conocidos}
                  color="#ff6b9d"
                  gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimeCard
                  title="Pololeando"
                  emoji="❤️"
                  timeData={timeData.pololeando}
                  color="#c44569"
                  gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                />
              </Grid>
            </Grid>

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
                sx={{
                  color: 'white',
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                  opacity: 0.9
                }}
              >
                "Cada segundo contigo es un regalo. Cada minuto, una bendición.
                Cada día, una nueva razón para amarte más. Te amo, Yeni 💕"
              </Typography>
            </Box>
          </Box>
        </main>
      </div>
    </div>
  )
}

export default Yeni
