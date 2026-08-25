/** Estilos glass reutilizables para MUI (coinciden con variables CSS globales). */

export const glassTextFieldSx = {

  '& .MuiOutlinedInput-root': {

    bgcolor: 'rgba(0, 0, 0, 0.72)',

    color: '#e8eaef',

    '& fieldset': { borderColor: 'rgba(150, 160, 180, 0.22)' },

    '&:hover fieldset': { borderColor: 'rgba(180, 190, 210, 0.36)' },

    '&.Mui-focused fieldset': { borderColor: 'rgba(200, 208, 220, 0.52)' },

  },

  '& .MuiInputLabel-root': { color: 'rgba(200, 205, 215, 0.72)' },

  '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(220, 224, 232, 0.88)' },

}



export const glassTabsSx = {

  mb: 2.5,

  '& .MuiTab-root': {

    color: 'rgba(200, 205, 215, 0.65)',

    fontWeight: 400,

    letterSpacing: '0.08em',

    fontSize: '0.85rem',

  },

  '& .Mui-selected': {

    color: 'rgba(232, 234, 239, 0.98) !important',

  },

  '& .MuiTabs-indicator': {

    backgroundColor: 'rgba(184, 196, 216, 0.85)',

    height: 2,

  },

}



export const glassSearchFieldSx = {

  '& .MuiOutlinedInput-root': {

    bgcolor: 'rgba(0, 0, 0, 0.72)',

    color: '#e8eaef',

    borderRadius: '12px',

    backdropFilter: 'blur(10px)',

    WebkitBackdropFilter: 'blur(10px)',

    '& fieldset': { borderColor: 'rgba(150, 160, 180, 0.22)' },

    '&:hover fieldset': { borderColor: 'rgba(180, 190, 210, 0.36)' },

    '&.Mui-focused fieldset': { borderColor: 'rgba(200, 208, 220, 0.52)' },

  },

  '& .MuiInputBase-input::placeholder': {

    color: 'rgba(200, 205, 215, 0.45)',

    opacity: 1,

  },

}

