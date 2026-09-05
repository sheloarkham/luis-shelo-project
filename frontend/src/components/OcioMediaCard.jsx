import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import {
  ocioCardSx,
  ocioCardMediaSx,
  ocioCardOverlaySx,
  ocioCardTitleSx,
  ocioCardMetaSx,
  ocioCardMenuButtonSx,
} from '../styles/ocioCardStyles'
import ScrollReveal from './ScrollReveal'
import { scrollRevealStagger } from '../utils/scrollRevealStagger'

const defaultChipSx = {
  mt: 0.75,
  height: 20,
  fontSize: '0.65rem',
  bgcolor: 'rgba(255,255,255,0.28)',
  color: 'white',
  fontWeight: 'bold',
}

const solidCardSx = {
  color: 'white',
  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
  },
}

export default function OcioMediaCard({ item, index, config, onMenuOpen }) {
  const { cardStyle, getCardBackground, getChipSx, getMetaLines, getCardExtraSx, titleColor, menuButtonColor } =
    config

  const metaLines = getMetaLines(item)
  const cardBackground = getCardBackground(item.Estado)
  const extraSx =
    cardStyle === 'series'
      ? getCardExtraSx?.(item) ?? {}
      : cardStyle === 'solid' || cardStyle === 'book'
        ? solidCardSx
        : {}

  const titleSx =
    cardStyle === 'series' ? { ...ocioCardTitleSx, color: titleColor ?? '#fff' } : ocioCardTitleSx

  const menuSx =
    cardStyle === 'series'
      ? { ...ocioCardMenuButtonSx, color: menuButtonColor ?? '#fff' }
      : ocioCardMenuButtonSx

  return (
    <ScrollReveal
      key={item.title}
      delay={scrollRevealStagger(index)}
      className="scroll-reveal--fill"
    >
      <Card
        sx={ocioCardSx({
          background: cardBackground,
          ...extraSx,
        })}
      >
        {cardStyle === 'book' ? (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              pt: 1,
              pb: 6,
              pointerEvents: 'none',
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{
                maxWidth: '68%',
                maxHeight: '70%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        ) : (
          <CardMedia component="img" image={item.image} alt={item.title} sx={ocioCardMediaSx} />
        )}

        <IconButton size="small" onClick={(e) => onMenuOpen(e, item.title)} sx={menuSx}>
          <MoreVertIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Box sx={ocioCardOverlaySx}>
          <Typography variant="subtitle2" sx={titleSx}>
            {item.title}
          </Typography>
          {metaLines.map((line) => (
            <Typography key={line} variant="caption" sx={ocioCardMetaSx}>
              {line}
            </Typography>
          ))}
          <Chip
            label={item.Estado}
            size="small"
            sx={getChipSx ? getChipSx(item.Estado) : defaultChipSx}
          />
        </Box>
      </Card>
    </ScrollReveal>
  )
}
