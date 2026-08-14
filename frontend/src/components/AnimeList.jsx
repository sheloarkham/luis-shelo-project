import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import {
  ocioCardsGridSx,
  ocioCardSx,
  ocioCardMediaSx,
  ocioCardOverlaySx,
  ocioCardTitleSx,
  ocioCardMetaSx,
  ocioCardMenuButtonSx,
} from '../styles/ocioCardStyles'

const STORAGE_KEY = 'anime-list'

const initialAnimeData = [
  {
    title: "Re:Zero",
    episodes: 75,
    studio: "White Fox",
    year: 2016,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Frieren: Beyond Journey's End",
    episodes: 28,
    studio: "Madhouse",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Fairy Tail",
    episodes: 353,
    studio: "A-1 Pictures",
    year: 2009,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Danmachi",
    episodes: 70,
    studio: "J.C.Staff",
    year: 2015,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Bungo Stray Dogs",
    episodes: 60,
    studio: "Bones",
    year: 2016,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "To Your Eternity",
    episodes: 40,
    studio: "Brain's Base",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Shangri-La Frontier",
    episodes: 50,
    studio: "C2C",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Overlord",
    episodes: 52,
    studio: "Madhouse",
    year: 2015,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ace of Diamond",
    episodes: 178,
    studio: "Madhouse / Production I.G",
    year: 2013,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Classroom of the Elite",
    episodes: 38,
    studio: "Lerche",
    year: 2017,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Daily Life of the Immortal King",
    episodes: 60,
    studio: "Haoliners Animation",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Log Horizon",
    episodes: 62,
    studio: "Satelight / Studio Deen",
    year: 2013,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Magi",
    episodes: 63,
    studio: "A-1 Pictures",
    year: 2012,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Detective Conan",
    episodes: 1130,
    studio: "TMS Entertainment",
    year: 1996,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Fire Force",
    episodes: 72,
    studio: "David Production",
    year: 2019,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Record of Ragnarok",
    episodes: 27,
    studio: "Graphinica",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "The Great Pretender",
    episodes: 23,
    studio: "Wit Studio",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Edens Zero",
    episodes: 50,
    studio: "J.C.Staff",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Trigun Stampede",
    episodes: 12,
    studio: "Orange",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Solo Leveling",
    episodes: 24,
    studio: "A-1 Pictures",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Dr. Stone",
    episodes: 58,
    studio: "TMS Entertainment",
    year: 2019,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Sakamoto Days",
    episodes: 12,
    studio: "TMS Entertainment",
    year: 2025,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Zenshu",
    episodes: 12,
    studio: "MAPPA",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "I Have a Crush at Work",
    episodes: 12,
    studio: "Unknown",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Medalist",
    episodes: 12,
    studio: "ENGI",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Orb: On the Movements of the Earth",
    episodes: 25,
    studio: "Madhouse",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Hell's Paradise",
    episodes: 13,
    studio: "MAPPA",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "My Hero Academia",
    episodes: 159,
    studio: "Bones",
    year: 2016,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Claymore",
    episodes: 26,
    studio: "Madhouse",
    year: 2007,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Kokkoku",
    episodes: 12,
    studio: "Geno Studio",
    year: 2018,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Noein: To Your Other Self",
    episodes: 24,
    studio: "Satelight",
    year: 2005,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ninja Kamui",
    episodes: 13,
    studio: "E&H Production",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Future Diary",
    episodes: 26,
    studio: "Asread",
    year: 2011,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Zom 100",
    episodes: 12,
    studio: "Bug Films",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Dan Da Dan",
    episodes: 12,
    studio: "Science SARU",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Blue Exorcist",
    episodes: 50,
    studio: "A-1 Pictures",
    year: 2011,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Blue Box",
    episodes: 25,
    studio: "Telecom Animation Film",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "No. 6",
    episodes: 11,
    studio: "Bones",
    year: 2011,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Dragon Ball Daima",
    episodes: 20,
    studio: "Toei Animation",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Trillion Game",
    episodes: 24,
    studio: "Madhouse",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Übel Blatt",
    episodes: 12,
    studio: "LIDENFILMS",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Wistoria: Wand and Sword",
    episodes: 12,
    studio: "Actas / Bandai Namco Pictures",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "The Unwanted Undead Adventurer",
    episodes: 12,
    studio: "CONNECT",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Eden of the East",
    episodes: 11,
    studio: "Production I.G",
    year: 2009,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Honey Lemon Soda",
    episodes: 12,
    studio: "J.C.Staff",
    year: 2025,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Unnamed Memory",
    episodes: 12,
    studio: "ENGI",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Texhnolyze",
    episodes: 22,
    studio: "Madhouse",
    year: 2003,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Grimgar of Fantasy and Ash",
    episodes: 12,
    studio: "A-1 Pictures",
    year: 2016,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Berserk of Gluttony",
    episodes: 12,
    studio: "A.C.G.T.",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "The Kingdom of Ruin",
    episodes: 12,
    studio: "Yokohama Animation Lab",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ragna Crimson",
    episodes: 24,
    studio: "Silver Link",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Plunderer",
    episodes: 24,
    studio: "Geek Toys",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Headhunter to Another World",
    episodes: 12,
    studio: "Unknown",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Baccano!",
    episodes: 16,
    studio: "Brain's Base",
    year: 2007,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "86 - Eighty Six",
    episodes: 23,
    studio: "A-1 Pictures",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Seraph of the End",
    episodes: 24,
    studio: "Wit Studio",
    year: 2015,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Arifureta",
    episodes: 38,
    studio: "Asread / MOTHER",
    year: 2019,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ao Ashi",
    episodes: 24,
    studio: "Production I.G",
    year: 2022,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Noblesse",
    episodes: 13,
    studio: "Production I.G",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "The Devil is a Part-Timer!",
    episodes: 37,
    studio: "White Fox / Studio 3Hz",
    year: 2013,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Spy x Family",
    episodes: 37,
    studio: "Wit Studio / CloverWorks",
    year: 2022,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Moriarty the Patriot",
    episodes: 24,
    studio: "Production I.G",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "World's Finest Assassin",
    episodes: 12,
    studio: "Silver Link / Studio Palette",
    year: 2021,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Even Given the Worthless 'Appraiser' Class",
    episodes: 12,
    studio: "Okuruto Noboru",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Toilet-Bound Hanako-kun",
    episodes: 12,
    studio: "Lerche",
    year: 2020,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Golden Kamuy",
    episodes: 49,
    studio: "Geno Studio",
    year: 2018,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Ishura",
    episodes: 12,
    studio: "Passione",
    year: 2024,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  },
  {
    title: "Mashle",
    episodes: 24,
    studio: "A-1 Pictures",
    year: 2023,
    image: "/anime-card.jpg",
    Estado: "Pendiente"
  }
]

const AnimeList = ({ searchTerm = '' }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedAnime, setSelectedAnime] = useState(null)
  const [animes, setAnimes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialAnimeData
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar datos guardados al montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setAnimes(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  // Guardar cambios en localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animes))
    }
  }, [animes, isLoaded])

  const handleMenuOpen = (event, anime) => {
    setAnchorEl(event.currentTarget)
    setSelectedAnime(anime)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedAnime(null)
  }

  const handleEstadoChange = (newEstado) => {
    setAnimes(prevAnimes =>
      prevAnimes.map(anime =>
        anime.title === selectedAnime.title
          ? { ...anime, Estado: newEstado }
          : anime
      )
    )
    handleMenuClose()
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completado':
        return 'success'
      case 'Viendo':
        return 'primary'
      case 'Pendiente':
        return 'default'
      default:
        return 'default'
    }
  }

  // Filtrar animes por término de búsqueda
  const filteredAnimes = animes.filter(anime =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Agrupar anime por estado
  const groupByStatus = () => {
    const viendo = filteredAnimes.filter(a => a.Estado === 'Viendo')
    const pendiente = filteredAnimes.filter(a => a.Estado === 'Pendiente')
    const completado = filteredAnimes.filter(a => a.Estado === 'Completado')
    return { viendo, pendiente, completado }
  }

  const { viendo, pendiente, completado } = groupByStatus()

  // Función para obtener color de tarjeta según estado
  const getCardBackground = (estado) => {
    switch(estado) {
      case 'Viendo': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      case 'Pendiente': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      case 'Completado': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      default: return 'rgba(255, 255, 255, 0.9)'
    }
  }

  const renderAnimeCard = (anime) => (
    <Card 
      key={anime.title} 
      sx={ocioCardSx({
        background: getCardBackground(anime.Estado),
        color: 'white',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
        },
      })}
    >
      <CardMedia
        component="img"
        image={anime.image}
        alt={anime.title}
        sx={ocioCardMediaSx}
      />
      <IconButton
        size="small"
        onClick={(e) => handleMenuOpen(e, anime)}
        sx={ocioCardMenuButtonSx}
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <Box sx={ocioCardOverlaySx}>
        <Typography variant="subtitle2" sx={ocioCardTitleSx}>
          {anime.title}
        </Typography>
        <Typography variant="caption" sx={ocioCardMetaSx}>
          {anime.studio} • {anime.year}
        </Typography>
        <Typography variant="caption" sx={ocioCardMetaSx}>
          {anime.episodes} episodios
        </Typography>
        <Chip 
          label={anime.Estado} 
          sx={{ mt: 0.75, height: 20, fontSize: '0.65rem', bgcolor: 'rgba(255,255,255,0.28)', color: 'white', fontWeight: 'bold' }}
          size="small"
        />
      </Box>
    </Card>
  )

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: '#ff6b6b' }}>
        Anime
      </Typography>
      
      {filteredAnimes.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          px: 3,
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 107, 107, 0.05))',
          borderRadius: 4,
          border: '2px dashed rgba(255, 107, 107, 0.3)'
        }}>
          <Typography variant="h5" sx={{ color: '#ff6b6b', mb: 2, fontWeight: 'bold' }}>
            No se encontraron animes
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {searchTerm ? `No hay resultados para "${searchTerm}"` : 'No hay animes en la lista'}
          </Typography>
        </Box>
      ) : searchTerm ? (
        /* Cuando hay búsqueda, mostrar solo resultados sin agrupar */
        <Box sx={ocioCardsGridSx}>
          {filteredAnimes.map(renderAnimeCard)}
        </Box>
      ) : (
        /* Cuando NO hay búsqueda, mostrar agrupado por estado */
        <Box>
          {/* Sección Viendo */}
          {viendo.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#667eea', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Viendo ({viendo.length})
              </Typography>
              <Box sx={ocioCardsGridSx}>
                {viendo.map(renderAnimeCard)}
              </Box>
            </Box>
          )}

          {/* Sección Pendiente */}
          {pendiente.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#f5576c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Pendiente ({pendiente.length})
              </Typography>
              <Box sx={ocioCardsGridSx}>
                {pendiente.map(renderAnimeCard)}
              </Box>
            </Box>
          )}

          {/* Sección Completado */}
          {completado.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#00f2fe', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Completado ({completado.length})
              </Typography>
              <Box sx={ocioCardsGridSx}>
                {completado.map(renderAnimeCard)}
              </Box>
            </Box>
          )}
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEstadoChange('Pendiente')}>
          Pendiente
        </MenuItem>
        <MenuItem onClick={() => handleEstadoChange('Viendo')}>
          Viendo
        </MenuItem>
        <MenuItem onClick={() => handleEstadoChange('Completado')}>
          Completado
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default AnimeList


