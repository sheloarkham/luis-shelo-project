import PageHeader from '../components/PageHeader'
import './shared-page.css'
import '../styles/futuristicPage.css'
import './Books.css'

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
  return (
    <div className="page-container">
      <div className="content">
        <PageHeader title="Biblioteca" className="page-header--solo" />

        <p className="neo-section-label">Escribiendo ahora</p>

        <article className="featured-book neo-card neo-card--progress">
          <div className="neo-card__glow" aria-hidden="true" />

          <div className="featured-book-cover">
            <img
              src={MY_BOOK.cover}
              alt={`Portada de ${MY_BOOK.title}`}
              className="featured-book-image"
            />
          </div>

          <div className="featured-book-info">
            <span className={`neo-card__status neo-card__status--progress featured-book-badge`}>
              {MY_BOOK.status}
            </span>

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
              className="neo-card__link featured-book-link"
            >
              Leer en Wattpad
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        <footer className="neo-footer">
          <span className="neo-footer__pulse" aria-hidden="true" />
          <p>En escritura · Paseo Fatal</p>
        </footer>
      </div>
    </div>
  )
}
