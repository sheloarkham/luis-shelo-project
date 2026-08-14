import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useThemeCustomization } from '../context/ThemeContext'

const Footer = () => {
  const { customizationMode, toggleCustomizationMode } = useThemeCustomization()

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

        {/* Activa/desactiva el modo personalización */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            onClick={toggleCustomizationMode}
            sx={{
              color: customizationMode ? '#ff6b9d' : 'var(--color-page-text)',
              textTransform: 'none',
              letterSpacing: '0.06em',
              fontSize: '0.95rem',
              textDecoration: 'underline',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            {customizationMode ? 'Modo: normal' : 'Modo personalización'}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
