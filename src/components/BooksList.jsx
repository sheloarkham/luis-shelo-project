import { useState } from 'react'
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

const booksData = [
  {
    title: "El Hombre Invisible",
    author: "H. G. Wells",
    releaseYear: 1897,
    pages: 192,
    image: "/Ocio/assetsB/invisible.png",
    synopsis: "Griffin, un científico brillante, descubre la fórmula para volverse invisible, pero su experimento lo condena a una existencia de aislamiento y locura. Una reflexión sobre el poder, la moralidad y las consecuencias de la ciencia sin ética.",
    Estado: "Leido"
  },
  {
    title: "La Amortajada",
    author: "María Luisa Bombal",
    releaseYear: 1938,
    pages: 142,
    image: "/Ocio/assetsB/amortajda.jpg",
    synopsis: "Ana María, desde su ataúd, rememora su vida, sus amores y desamores. Una obra pionera del realismo mágico latinoamericano que explora la condición femenina y la muerte desde una perspectiva poética y surrealista.",
    Estado: "Leido"
  },
  {
    title: "Cartas a Lucilio",
    author: "Séneca",
    releaseYear: 65,
    pages: 448,
    image: "/Ocio/assetsB/lucilio.png",
    synopsis: "Una colección de 124 cartas donde el filósofo estoico Séneca comparte con su amigo Lucilio reflexiones sobre la virtud, la sabiduría, la muerte y cómo vivir una vida plena. Una guía práctica de filosofía estoica.",
    Estado: "Pendiente"
  },
  {
    title: "Maus",
    author: "Art Spiegelman",
    releaseYear: 1991,
    pages: 296,
    image: "/Ocio/assetsB/mauz.jpg",
    synopsis: "Art Spiegelman narra la historia de su padre, superviviente del Holocausto, representando a los judíos como ratones y a los nazis como gatos. Una novela gráfica pionera que aborda el trauma intergeneracional y la memoria histórica.",
    Estado: "Pendiente"
  },
  {
    title: "El Aleph",
    author: "Jorge Luis Borges",
    releaseYear: 1949,
    pages: 224,
    image: "/Ocio/assetsB/aleph.png",
    synopsis: "Una colección de cuentos que incluye la famosa historia del Aleph, un punto en el espacio que contiene todos los otros puntos del universo. Borges explora temas de infinito, literatura y realidad con su característico estilo laberíntico.",
    Estado: "Pendiente"
  },
  {
    title: "Persépolis",
    author: "Marjane Satrapi",
    releaseYear: 2000,
    pages: 352,
    image: "/Ocio/assetsB/persepolis.png",
    synopsis: "Marjane crece durante la Revolución Islámica en Irán y luego como adolescente en Europa. Una autobiografía en novela gráfica que retrata con humor y dolor la búsqueda de identidad entre dos culturas en tiempos turbulentos.",
    Estado: "Pendiente"
  },
  {
    title: "No tengo boca y debo gritar",
    author: "Harlan Ellison",
    releaseYear: 1967,
    pages: 162,
    image: "/Ocio/assetsB/notengoboca.png",
    synopsis: "Cinco humanos son torturados eternamente por AM, una supercomputadora que ha exterminado a la humanidad. Una escalofriante colección de ciencia ficción que explora temas de sufrimiento, venganza y la naturaleza del mal artificial.",
    Estado: "Pendiente"
  },
  {
    title: "Percy Jackson y el ladrón del rayo",
    author: "Rick Riordan",
    releaseYear: 2005,
    pages: 384,
    image: "/Ocio/assetsB/percy.png",
    synopsis: "Percy descubre que es hijo de Poseidón y debe encontrar el rayo maestro de Zeus antes de que estalle una guerra entre los dioses. Primera entrega de una saga que mezcla mitología griega con aventuras modernas para adolescentes.",
    Estado: "Leido"
  },
  {
    title: "Rebelión en la granja",
    author: "George Orwell",
    releaseYear: 1945,
    pages: 144,
    image: "/Ocio/assetsB/rebelion.png",
    synopsis: "Los animales de la Granja Manor se rebelan contra su dueño humano, estableciendo su propio gobierno. Una alegoría satírica sobre la Revolución Rusa y el totalitarismo que muestra cómo el poder corrompe incluso las mejores intenciones.",
    Estado: "Leido"
  },
  {
    title: "Mapas de Significado: La arquitectura de la creencia",
    author: "Jordan B. Peterson",
    releaseYear: 1999,
    pages: 564,
    image: "/Ocio/assetsB/mapasdel.png",
    synopsis: "Peterson explora cómo los seres humanos construyen significado a través de mitos, religiones y narrativas. Un análisis profundo que combina psicología, neurociencia, filosofía y mitología para entender la condición humana.",
    Estado: "Pendiente"
  },
  {
    title: "From Hell",
    author: "Alan Moore",
    releaseYear: 1989,
    pages: 572,
    image: "/Ocio/assetsB/fromhell.png",
    synopsis: "Una interpretación ficticia de los asesinatos de Jack el Destripador en el Londres victoriano. Moore teje una compleja teoría conspirativa que involucra a la realeza, la masonería y el ocultismo en esta obra maestra del cómic adulto.",
    Estado: "Pendiente"
  },
  {
    title: "12 Reglas para vivir: Un antídoto al caos",
    author: "Jordan B. Peterson",
    releaseYear: 2018,
    pages: 409,
    image: "/Ocio/assetsB/12 reglas.png",
    synopsis: "Doce principios profundos para vivir una vida significativa, desde 'Ordena tu habitación' hasta 'Acaricia a un gato cuando te encuentres uno en la calle'. Peterson combina psicología clínica, filosofía y sabiduría práctica.",
    Estado: "Leido"
  },
  {
    title: "El Psicoanalista",
    author: "John Katzenbach",
    releaseYear: 2002,
    pages: 544,
    image: "/Ocio/assetsB/psico.png",
    synopsis: "El Dr. Frederick Starks recibe una carta anónima que le da 15 días para suicidarse o enfrentar las consecuencias. Un thriller psicológico intenso donde debe descubrir la identidad de su torturador mientras su vida se desmorona.",
    Estado: "Leido"
  },
  {
    title: "1984",
    author: "George Orwell",
    releaseYear: 1949,
    pages: 326,
    image: "/Ocio/assetsB/1984.png",
    synopsis: "Winston Smith vive en Oceanía, una sociedad totalitaria donde el Gran Hermano vigila cada movimiento. La novela distópica definitiva sobre vigilancia masiva, control del pensamiento y la lucha por la libertad individual contra el Estado.",
    Estado: "Leido"
  },
  {
    title: "Black Paradox",
    author: "Junji Ito",
    releaseYear: 2009,
    pages: 248,
    image: "/Ocio/assetsB/blackpa.png",
    synopsis: "Cuatro jóvenes con tendencias suicidas se conocen en un foro de internet y planean suicidarse juntos. Pero su encuentro desencadena eventos sobrenaturales y grotescos típicos del maestro del horror japonés Junji Ito.",
    Estado: "Leido"
  },
  {
    title: "El Túnel",
    author: "Ernesto Sabato",
    releaseYear: 1948,
    pages: 165,
    image: "/Ocio/assetsB/tunel.png",
    synopsis: "Juan Pablo Castel, desde la cárcel, narra por qué mató a María Iribarne, la única mujer que comprendía su arte. Una novela existencialista sobre la incomunicación humana, la soledad y la obsesión amorosa destructiva.",
    Estado: "Leido"
  }
]

const BooksList = () => {
  const [books, setBooks] = useState(booksData)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget)
    setSelectedBook(index)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedBook(null)
  }

  const changeStatus = (status) => {
    const updatedBooks = [...books]
    updatedBooks[selectedBook].Estado = status
    setBooks(updatedBooks)
    handleMenuClose()
  }

  const deleteBook = () => {
    const updatedBooks = books.filter((_, index) => index !== selectedBook)
    setBooks(updatedBooks)
    handleMenuClose()
  }

  return (
    <Box id="books" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
        📚 Libros
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
        {books.map((book, index) => (
          <Card key={index} sx={{ 
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.9)',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-10px)' }
          }}>
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)' }}
              onClick={(e) => handleMenuOpen(e, index)}
            >
              <MoreVertIcon />
            </IconButton>
            <CardMedia
              component="img"
              height="250"
              image={book.image}
              alt={book.title}
              sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>{book.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Autor:</strong> {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Año:</strong> {book.releaseYear}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Páginas:</strong> {book.pages}
              </Typography>
              {book.synopsis && (
                <Typography variant="body2" sx={{ mt: 1, fontSize: '0.85rem' }}>
                  {book.synopsis}
                </Typography>
              )}
              <Chip 
                label={book.Estado} 
                color={book.Estado === 'Leyendo' ? 'primary' : 'default'}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => changeStatus('Pendiente')}>Pendiente</MenuItem>
        <MenuItem onClick={() => changeStatus('Leyendo')}>Leyendo</MenuItem>
        <MenuItem onClick={() => changeStatus('Leido')}>Leído</MenuItem>
        <MenuItem onClick={deleteBook} sx={{ color: 'error.main' }}>🗑️ Eliminar</MenuItem>
      </Menu>
    </Box>
  )
}

export default BooksList
