import { Link } from 'react-router-dom'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import './shared-page.css'
import './Proyecto.css'

const PROJECT_BADGES = [
  {
    id: 'fullstack',
    label: 'Fullstack',
    path: '/proyectos/fullstack',
    image: '/images/proyectos/fullstack.png',
    cropHalf: true,
  },
  {
    id: 'autito',
    label: 'Autito',
    path: '/proyectos/autito',
    image: '/images/proyectos/autito.png',
  },
  {
    id: 'escritos',
    label: 'Escritos',
    path: '/proyectos/escritos',
    image: '/images/proyectos/escritos.png',
  },
  {
    id: 'gym',
    label: 'Gym',
    path: '/gym',
    image: '/images/proyectos/gym.png',
  },
]

const Proyecto = () => {
  useLockBodyScroll()

  return (
    <div className="page-container proyecto-page proyecto-hub-page" style={{ flex: 1, minHeight: 0 }}>
      <div className="content">
        <main className="proyecto-hub-main">
          <header className="page-header proyecto-hub-header">
            <h1 className="page-title">Proyectos</h1>
          </header>

          <section className="proyecto-badges" aria-label="Lista de proyectos">
            {PROJECT_BADGES.map((badge) => (
              <Link
                key={badge.id}
                to={badge.path}
                className={`proyecto-badge${badge.cropHalf ? ' proyecto-badge--crop-half' : ''}`}
                aria-label={badge.label}
              >
                <span className="proyecto-badge__frame">
                  <img
                    src={badge.image}
                    alt=""
                    className="proyecto-badge__img"
                    draggable={false}
                  />
                </span>
              </Link>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}

export default Proyecto
