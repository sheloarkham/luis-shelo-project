export const OCIO_CARD_HEIGHT = 200

export const ocioCardsGridSx = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
  gap: 2,
}

export const ocioCardSx = (extra = {}) => ({
  position: 'relative',
  height: OCIO_CARD_HEIGHT,
  overflow: 'hidden',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  ...extra,
})

export const ocioCardMediaSx = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

export const ocioCardOverlaySx = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  p: 1.25,
  pt: 4,
  background:
    'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.55) 55%, transparent 100%)',
}

export const ocioCardTitleSx = {
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.78rem',
  lineHeight: 1.25,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

export const ocioCardMetaSx = {
  color: 'rgba(255, 255, 255, 0.78)',
  display: 'block',
  mt: 0.5,
  fontSize: '0.68rem',
  lineHeight: 1.2,
}

export const ocioCardMenuButtonSx = {
  position: 'absolute',
  top: 4,
  right: 4,
  zIndex: 2,
  bgcolor: 'rgba(0, 0, 0, 0.45)',
  color: '#fff',
  width: 28,
  height: 28,
  '&:hover': {
    bgcolor: 'rgba(0, 0, 0, 0.65)',
  },
}
