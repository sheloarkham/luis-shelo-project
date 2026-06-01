import { Box, Typography } from '@mui/material'
import './shared-page.css'

const Gym = () => {
  return (
    <div className="page-container">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" sx={{ 
          color: '#FFD700',
          fontWeight: 'bold',
          mb: 4,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          🏋️ Gym
        </Typography>
        <Typography variant="h6" sx={{ color: 'white', opacity: 0.8 }}>
          Contenido próximamente...
        </Typography>
      </Box>
    </div>
  )
}

export default Gym
