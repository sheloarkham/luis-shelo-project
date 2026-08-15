/** Estilos glass reutilizables para MUI (coinciden con variables CSS globales). */
export const glassTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(0, 10, 30, 0.48)',
    color: '#dce8ff',
    '& fieldset': { borderColor: 'rgba(80, 150, 255, 0.22)' },
    '&:hover fieldset': { borderColor: 'rgba(100, 180, 255, 0.38)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(140, 184, 255, 0.55)' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(200, 220, 255, 0.72)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(200, 220, 255, 0.88)' },
}

export const glassTabsSx = {
  mb: 2.5,
  '& .MuiTab-root': {
    color: 'rgba(200, 220, 255, 0.65)',
    fontWeight: 400,
    letterSpacing: '0.08em',
    fontSize: '0.85rem',
  },
  '& .Mui-selected': {
    color: 'rgba(180, 215, 255, 0.98) !important',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: 'rgba(140, 184, 255, 0.85)',
    height: 2,
  },
}

export const glassSearchFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(0, 10, 30, 0.48)',
    color: '#dce8ff',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    '& fieldset': { borderColor: 'rgba(80, 150, 255, 0.22)' },
    '&:hover fieldset': { borderColor: 'rgba(100, 180, 255, 0.38)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(140, 184, 255, 0.55)' },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(200, 220, 255, 0.45)',
    opacity: 1,
  },
}
