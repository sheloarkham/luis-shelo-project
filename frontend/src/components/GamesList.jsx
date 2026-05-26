import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const STORAGE_KEY = 'games-list'

const initialGamesData = [
  {
    title: "Hi-Fi RUSH",
    releaseYear: 2023,
    developer: "Tango Gameworks",
    duration: 12,
    image: "/Ocio/assets/hifi.jpg",
    synopsis: "Un juego de acción rítmica donde Chai, un aspirante a rockstar con un brazo robótico, debe derrotar a una corporación malvada al ritmo de la música. Combina combate hack-and-slash con mecánicas musicales únicas.",
    Estado: "Jugando"
  },
  {
    title: "Assassin's Creed Valhalla",
    releaseYear: 2020,
    developer: "Ubisoft Montreal",
    duration: 60,
    image: "/Ocio/assets/valhalla.jpg",
    synopsis: "Encarna a Eivor, un guerrero vikingo que lidera su clan desde Noruega hasta Inglaterra en el siglo IX. Construye asentamientos, forma alianzas y lucha contra sajones y templarios en una épica aventura nórdica.",
    Estado: "Pendiente"
  },
  {
    title: "Dead Space Remake",
    releaseYear: 2023,
    developer: "Motive Studio",
    duration: 12,
    image: "/Ocio/assets/deadspace.jpg",
    synopsis: "Isaac Clarke, ingeniero de sistemas, debe sobrevivir en una estación espacial infestada de criaturas alienígenas llamadas Necromorphs. Un remake del clásico survival horror con gráficos modernos y terror psicológico.",
    Estado: "Pendiente"
  },
  {
    title: "Dragon Age 2",
    releaseYear: 2011,
    developer: "BioWare",
    duration: 25,
    image: "/Ocio/assets/dragonage2.jpg",
    synopsis: "Hawke escapa de la destrucción de Lothering y se convierte en el Campeón de Kirkwall. Una historia centrada en las tensiones entre magos y templarios que cambiará el destino del mundo de Thedas para siempre.",
    Estado: "Completado"
  },
  {
    title: "Dragon Age: Inquisition",
    releaseYear: 2014,
    developer: "BioWare",
    duration: 45,
    image: "/Ocio/assets/dragonageinquisition.jpg",
    synopsis: "Como Inquisidor, debes cerrar una brecha en el cielo que amenaza con destruir el mundo. Lidera la Inquisición, forja alianzas políticas y enfrenta al misterioso Corifeo en esta épica aventura de fantasía.",
    Estado: "Completado"
  },
  {
    title: "Gris",
    releaseYear: 2018,
    developer: "Nomada Studio",
    duration: 4,
    image: "/Ocio/assets/gris.jpg",
    synopsis: "Una joven despierta en un mundo sin color tras perder su voz. Un hermoso viaje emocional a través de etapas del duelo, donde la protagonista debe restaurar el color y la vida a su mundo mediante puzles y plataformas.",
    Estado: "Completado"
  },
  {
    title: "Kona",
    releaseYear: 2017,
    developer: "Parabole",
    duration: 4,
    image: "/Ocio/assets/kona.jpg",
    synopsis: "Carl Faubert, un detective privado, llega a un pueblito de Quebec en 1970 para investigar actos de vandalismo. Pero una tormenta de nieve sobrenatural lo atrapa en un misterio que desafía la realidad.",
    Estado: "Completado"
  },
  {
    title: "Kona II: Brume",
    releaseYear: 2023,
    developer: "Parabole",
    duration: 6,
    image: "/Ocio/assets/kona 2.jpg",
    synopsis: "Carl Faubert regresa para investigar una misteriosa bruma que ha envuelto el norte de Canadá. Con nuevos aliados y más misterios sobrenaturales, deberá descubrir la verdad detrás de los extraños fenómenos.",
    Estado: "Completado"
  },
  {
    title: "Ghostbusters: The Video Game Remastered",
    releaseYear: 2019,
    developer: "Saber Interactive",
    duration: 10,
    image: "/Ocio/assets/ghostbusters.jpg",
    synopsis: "Únete a los Cazafantasmas originales como un nuevo recluta en 1991. Experimenta una nueva aventura con las voces originales del reparto de la película, enfrentando fantasmas con equipos auténticos en Nueva York.",
    Estado: "Completado"
  },
  {
    title: "Exoprimal",
    releaseYear: 2023,
    developer: "Capcom",
    duration: 15,
    image: "/Ocio/assets/exoprimal.jpg",
    synopsis: "En 2040, los dinosaurios aparecen misteriosamente através de portales. Como piloto de un exosuit de última generación, debes trabajar en equipo para completar misiones y descubrir la verdad detrás de estos brotes de dinosaurios.",
    Estado: "Completado"
  },
  {
    title: "Harold Halibut",
    releaseYear: 2024,
    developer: "Slow Bros",
    duration: 12,
    image: "/Ocio/assets/harol.png",
    synopsis: "Harold vive en una nave espacial que ha estado sumergida en un océano alienígena por décadas. Una aventura narrativa hecha completamente con modelos físicos y stop-motion sobre amistad, propósito y encontrar tu lugar en el mundo.",
    Estado: "Pendiente ver en yotube"
  },
  {
    title: "Star Wars Jedi: Survivor",
    releaseYear: 2023,
    developer: "Respawn Entertainment",
    duration: 20,
    image: "/Ocio/assets/jedisur.jpg",
    synopsis: "Cal Kestis continúa su viaje como Jedi superviviente cinco años después de los eventos de Fallen Order. Explora nuevos planetas, domina nuevas habilidades de la Fuerza y enfrenta al Imperio en esta secuela épica.",
    Estado: "Pendiente"
  },
  {
    title: "Too Human",
    releaseYear: 2008,
    developer: "Silicon Knights",
    duration: 10,
    image: "/Ocio/assets/toohuman.png",
    synopsis: "Baldur, un cyber-guerrero nórdico, debe defender a la humanidad de una invasión de máquinas en un mundo donde la mitología nórdica se mezcla con la ciencia ficción. Un RPG de acción que reimagina a los dioses como cyborgs.",
    Estado: "Completado"
  },
  {
    title: "South Park: The Fractured But Whole",
    releaseYear: 2017,
    developer: "Ubisoft San Francisco",
    duration: 20,
    image: "/Ocio/assets/south.jpg",
    synopsis: "Los niños de South Park se convierten en superhéroes para salvar su ciudad. Un RPG lleno del humor irreverente característico de la serie, con combate por turnos y una historia que parodia el género superheroico.",
    Estado: "Completado"
  },
  {
    title: "Super Meat Boy",
    releaseYear: 2010,
    developer: "Team Meat",
    duration: 15,
    image: "/Ocio/assets/meet.jpg",
    synopsis: "Meat Boy debe rescatar a su novia Bandage Girl del malvado Dr. Fetus. Un plataformas indie súper desafiante que requiere precisión perfecta y reflejos rápidos, con niveles que ponen a prueba hasta el jugador más hábil.",
    Estado: "Completado"
  },
  {
    title: "Crackdown",
    releaseYear: 2007,
    developer: "Realtime Worlds",
    duration: 12,
    image: "/Ocio/assets/crackdown.png",
    synopsis: "Como un super agente genéticamente modificado, debes limpiar Pacific City de tres organizaciones criminales. Un sandbox de acción con habilidades que evolucionan y la libertad de abordar cada situación como quieras.",
    Estado: "Completado"
  },
  {
    title: "Tales from the Borderlands",
    releaseYear: 2014,
    developer: "Telltale Games",
    duration: 10,
    image: "/Ocio/assets/talesfrom.jpg",
    synopsis: "Rhys y Fiona buscan una misteriosa bóveda en el planeta Pandora. Una aventura narrativa episódica que combina el humor de Borderlands con el storytelling de Telltale Games, llena de decisiones que afectan la historia.",
    Estado: "Completado"
  },
  {
    title: "Alan Wake 2",
    releaseYear: 2023,
    developer: "Remedy Entertainment",
    duration: 20,
    image: "/Ocio/assets/alanwake.jpg",
    synopsis: "Trece años después de su desaparición, Alan Wake lucha por escapar del Dark Place mientras la agente del FBI Saga Anderson investiga una serie de asesinatos rituales. Un thriller psicológico que mezcla realidad y pesadilla.",
    Estado: "Pendiente"
  },
  {
    title: "Game of Thrones: A Telltale Games Series",
    releaseYear: 2014,
    developer: "Telltale Games",
    duration: 15,
    image: "/Ocio/assets/juegotronos.jpg",
    synopsis: "Sigue la historia de la Casa Forrester, vassallos de los Stark, durante los eventos de la serie de TV. Toma decisiones difíciles que determinaran el destino de la familia en este juego narrativo basado en el universo de George R.R. Martin.",
    Estado: "Pendiente"
  },
  {
    title: "Resident Evil 4 Remake",
    releaseYear: 2023,
    developer: "Capcom",
    duration: 16,
    image: "/Ocio/assets/re4remake.jpeg",
    synopsis: "Leon S. Kennedy, agente especial del gobierno, debe rescatar a la hija del presidente de un pueblo rural europeo infectado por un parásito misterioso. Un remake moderno del clásico survival horror con gráficos de nueva generación.",
    Estado: "Completado"
  }
]

const GamesList = ({ searchTerm = '' }) => {
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialGamesData
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedGame, setSelectedGame] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar datos guardados al montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setGames(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  // Guardar cambios en localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
    }
  }, [games, isLoaded])

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget)
    setSelectedGame(index)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedGame(null)
  }

  const changeStatus = (status) => {
    const updatedGames = [...games]
    updatedGames[selectedGame].Estado = status
    setGames(updatedGames)
    handleMenuClose()
  }

  // Filtrar juegos por término de búsqueda
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Agrupar juegos por estado
  const groupByStatus = () => {
    const jugando = filteredGames.filter(g => g.Estado === 'Jugando')
    const pendiente = filteredGames.filter(g => g.Estado === 'Pendiente')
    const completado = filteredGames.filter(g => g.Estado === 'Completado')
    return { jugando, pendiente, completado }
  }

  const { jugando, pendiente, completado } = groupByStatus()

  // Función para obtener color de tarjeta según estado
  const getCardBackground = (estado) => {
    switch(estado) {
      case 'Jugando': return 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'
      case 'Pendiente': return 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
      case 'Completado': return 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      default: return 'rgba(255, 255, 255, 0.9)'
    }
  }

  const renderGameCard = (game, index) => (
    <Card key={index} sx={{ 
      position: 'relative',
      background: getCardBackground(game.Estado),
      color: 'white',
      transition: 'all 0.3s',
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      '&:hover': { 
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.5)'
      }
    }}>
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' } }}
        onClick={(e) => handleMenuOpen(e, index)}
      >
        <MoreVertIcon />
      </IconButton>
      <CardMedia
        component="img"
        height="200"
        image={game.image}
        alt={game.title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>{game.title}</Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          <strong>Año:</strong> {game.releaseYear}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          <strong>Desarrollador:</strong> {game.developer}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          <strong>Duración:</strong> {game.duration} horas
        </Typography>
        {game.synopsis && (
          <Typography variant="body2" sx={{ mt: 1, fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
            {game.synopsis}
          </Typography>
        )}
        <Chip 
          label={game.Estado} 
          sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.3)', color: 'white', fontWeight: 'bold' }}
        />
      </CardContent>
    </Card>
  )

  const deleteGame = () => {
    const updatedGames = games.filter((_, index) => index !== selectedGame)
    setGames(updatedGames)
    handleMenuClose()
  }

  return (
    <Box id="games" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
        Videojuegos
      </Typography>
      
      {filteredGames.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          px: 3,
          background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(167, 139, 250, 0.05))',
          borderRadius: 4,
          border: '2px dashed rgba(167, 139, 250, 0.3)'
        }}>
          <Typography variant="h5" sx={{ color: '#a78bfa', mb: 2, fontWeight: 'bold' }}>
            No se encontraron juegos
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {searchTerm ? `No hay resultados para "${searchTerm}"` : 'No hay juegos en la lista'}
          </Typography>
        </Box>
      ) : searchTerm ? (
        /* Cuando hay búsqueda, mostrar solo resultados sin agrupar */
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          {filteredGames.map(renderGameCard)}
        </Box>
      ) : (
        /* Cuando NO hay búsqueda, mostrar agrupado por estado */
        <Box>
          {/* Sección Jugando */}
          {jugando.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#a78bfa', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Jugando ({jugando.length})
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                {jugando.map(renderGameCard)}
              </Box>
            </Box>
          )}

          {/* Sección Pendiente */}
          {pendiente.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#fbbf24', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Pendiente ({pendiente.length})
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                {pendiente.map(renderGameCard)}
              </Box>
            </Box>
          )}

          {/* Sección Completado */}
          {completado.length > 0 && (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                Completado ({completado.length})
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                {completado.map(renderGameCard)}
              </Box>
            </Box>
          )}
        </Box>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => changeStatus('Pendiente')}>Pendiente</MenuItem>
        <MenuItem onClick={() => changeStatus('Jugando')}>Jugando</MenuItem>
        <MenuItem onClick={() => changeStatus('Completado')}>Completado</MenuItem>
        <MenuItem onClick={deleteGame} sx={{ color: 'error.main' }}>Eliminar</MenuItem>
      </Menu>
    </Box>
  )
}

export default GamesList
