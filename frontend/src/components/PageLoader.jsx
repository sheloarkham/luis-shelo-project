import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function PageLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
        py: 8,
      }}
    >
      <CircularProgress sx={{ color: '#8ecae6' }} size={48} thickness={2} />
    </Box>
  )
}
