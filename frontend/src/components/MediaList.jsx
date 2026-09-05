import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { ocioCardsGridSx } from '../styles/ocioCardStyles'
import { isOcioCompletedStatus } from '../utils/ocioStatus'
import ScrollReveal from './ScrollReveal'
import OcioMediaCard from './OcioMediaCard'

export default function MediaList({
  searchTerm = '',
  config,
  items,
  updateStatus,
  deleteItem,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState(null)

  const normalizedSearch = searchTerm.toLowerCase()

  const matchesSearch = (title) => title.toLowerCase().includes(normalizedSearch)

  const activeItems = items.filter(
    (item) => matchesSearch(item.title) && !isOcioCompletedStatus(item.Estado)
  )

  const completedItems = items.filter(
    (item) => matchesSearch(item.title) && isOcioCompletedStatus(item.Estado)
  )

  const handleMenuOpen = (event, title) => {
    setAnchorEl(event.currentTarget)
    setSelectedTitle(title)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedTitle(null)
  }

  const handleStatusChange = (status) => {
    if (selectedTitle) updateStatus(selectedTitle, status)
    handleMenuClose()
  }

  const handleDelete = () => {
    if (selectedTitle) deleteItem(selectedTitle)
    handleMenuClose()
  }

  const renderCard = (item, index) => (
    <OcioMediaCard
      key={item.title}
      item={item}
      index={index}
      config={config}
      onMenuOpen={handleMenuOpen}
    />
  )

  const renderAllCompletedMessage = () => {
    if (activeItems.length > 0 || completedItems.length === 0) return null
    return (
      <ScrollReveal>
        <Typography variant="h5" sx={{ color: '#FFD700', textAlign: 'center', py: 3, fontWeight: 'bold' }}>
          {config.allCompletedMessage}
        </Typography>
      </ScrollReveal>
    )
  }

  const renderGroupedSections = () => (
    <Box>
      {config.activeGroups.map((group) => {
        const groupItems = activeItems.filter((item) => item.Estado === group.status)
        if (groupItems.length === 0) return null

        return (
          <Box key={group.status} sx={{ mb: 5 }}>
            <ScrollReveal delay={0.05}>
              <Typography
                variant="h5"
                sx={{
                  mb: config.cardStyle === 'series' ? 3 : 2,
                  color: group.color,
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {group.label} ({groupItems.length})
              </Typography>
            </ScrollReveal>
            <Box sx={ocioCardsGridSx}>{groupItems.map(renderCard)}</Box>
          </Box>
        )
      })}
      {renderAllCompletedMessage()}
    </Box>
  )

  return (
    <Box id={config.sectionId ?? undefined} sx={{ py: 4 }}>
      <ScrollReveal>
        <Typography variant="h4" component={config.sectionId ? 'h2' : 'h2'} sx={config.titleSx}>
          {config.title}
        </Typography>
      </ScrollReveal>

      {activeItems.length === 0 && completedItems.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', py: 4 }}>
          {searchTerm
            ? `No hay resultados para "${searchTerm}"`
            : `No hay ${config.emptyLabel} en la lista`}
        </Typography>
      ) : searchTerm ? (
        <Box>
          {activeItems.length > 0 && <Box sx={ocioCardsGridSx}>{activeItems.map(renderCard)}</Box>}
          {renderAllCompletedMessage()}
        </Box>
      ) : (
        renderGroupedSections()
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {config.menuItems.map((menuItem) => (
          <MenuItem key={menuItem.status} onClick={() => handleStatusChange(menuItem.status)}>
            {menuItem.label}
          </MenuItem>
        ))}
        {config.allowDelete && (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            Eliminar
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}
