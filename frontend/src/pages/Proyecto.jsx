import { Link } from 'react-router-dom'
import './shared-page.css'
import './Proyecto.css'

const PROJECT_BADGES = [
  {
    id: 'fullstack',
    label: 'Fullstack',
    path: '/proyectos/fullstack',
    icon: '💻',
    accent: '#8cb8ff',
  },
  {
    id: 'autito',
    label: 'Autito',
    path: '/proyectos/autito',
    icon: '🚗',
    accent: '#fbbf24',
  },
  {
    id: 'escritos',
    label: 'Escritos',
    path: '/proyectos/escritos',
    icon: '✍️',
    accent: '#c4a7e7',
  },
]

const Proyecto = () => (
  <div className="page-container proyecto-page proyecto-hub-page">
    <div className="content">
      <main>
        <header className="page-header proyecto-hub-header">
          <h1 className="page-title">Proyectos</h1>
        </header>

        <section className="proyecto-badges" aria-label="Lista de proyectos">
          {PROJECT_BADGES.map((badge) => (
            <Link
              key={badge.id}
              to={badge.path}
              className="proyecto-badge"
              style={{ '--badge-accent': badge.accent }}
            >
              <span className="proyecto-badge__circle" aria-hidden="true">
                <span className="proyecto-badge__icon">{badge.icon}</span>
              </span>
              <span className="proyecto-badge__label">{badge.label}</span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  </div>
)

export default Proyecto
