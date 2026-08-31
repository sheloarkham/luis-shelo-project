import { useEffect, useState } from 'react'
import './Books.css'

/**
 * Datos del libro propio que estás escribiendo.
 * La imagen vive en `public/images/` y se referencia con `/images/...`
 */
const MY_BOOK = {
  title: 'Paseo Fatal',
  author: 'Luis Shelo Rosales',
  subtitle: 'Una novela de terror y aventura',
  cover: '/images/paseo-fatal-cover.png',
  wattpadUrl: 'https://www.wattpad.com/story/408544886-paseo-fatal',
  status: 'En escritura',
  tags: ['Terror', 'Aventura', 'Chile', 'Chiloé', 'Amistad'],
  description:
    'Un grupo de adolescentes viaja a Chiloé en lo que parecía ser un paseo turístico organizado por la municipalidad, pero la tranquilidad pronto se convierte en terror: en medio de la noche, la cabaña donde se hospedan queda a oscuras, los golpes se transforman en hachazos y una voz siniestra anuncia que no podrán escapar. Lo que debía ser una experiencia de diversión se convierte en una pesadilla.',
}

export default function Books() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setRevealed(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={`books-container${revealed ? ' books-container--enter' : ''}`}>
      <div className="books-hero">
        <h1 className="books-title">BIBLIOTECA</h1>
        <p className="books-subtitle">Mis lecturas y escrituras</p>
      </div>

      <div className="books-content">
        <p className="books-section-label">Escribiendo ahora</p>

        {/* Sección destacada: portada grande + descripción amplia */}
        <article className="featured-book">
          <div className="featured-book-cover">
            <img
              src={MY_BOOK.cover}
              alt={`Portada de ${MY_BOOK.title}`}
              className="featured-book-image"
            />
          </div>

          <div className="featured-book-info">
            <span className="featured-book-badge">{MY_BOOK.status}</span>

            <h2 className="featured-book-title">{MY_BOOK.title}</h2>
            <p className="featured-book-author">por {MY_BOOK.author}</p>
            <p className="featured-book-subtitle">{MY_BOOK.subtitle}</p>

            <p className="featured-book-description">{MY_BOOK.description}</p>

            <div className="featured-book-tags">
              {MY_BOOK.tags.map((tag) => (
                <span key={tag} className="featured-book-tag">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={MY_BOOK.wattpadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-book-link"
            >
              Leer en Wattpad
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}
