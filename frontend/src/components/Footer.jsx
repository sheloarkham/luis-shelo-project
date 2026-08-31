import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        background: 'transparent',
        color: 'var(--color-page-text)',
        borderTop: '1px solid rgba(80, 150, 255, 0.15)',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          Luis & Shelo Project © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Hecho con ❤️ usando React + Material-UI
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
