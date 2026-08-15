import './shared-page.css'
import './Proyecto.css'

const Proyecto = () => {
  const roadmapSteps = [
    {
      id: 1,
      title: 'Introducción a la programación',
      status: 'en-progreso',
      description: 'Fundamentos de JavaScript - Todo Code Academy',
      link: 'https://todocodeacademy.com/course/introduccion-a-la-programacion/',
      icon: '💻',
    },
    {
      id: 2,
      title: 'Google Data Analytics',
      status: 'en-progreso',
      description: 'Análisis de datos, SQL, hojas de cálculo y visualización - Coursera',
      link: 'https://www.coursera.org/professional-certificates/google-data-analytics',
      icon: '📊',
    },
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case 'completado':
        return 'done'
      case 'en-progreso':
        return 'progress'
      default:
        return 'pending'
    }
  }

  const getStepIcon = (status) => {
    switch (status) {
      case 'completado':
        return '✓'
      case 'en-progreso':
        return '⏳'
      default:
        return '○'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completado':
        return 'Completado'
      case 'en-progreso':
        return 'En progreso'
      default:
        return 'Pendiente'
    }
  }

  return (
    <div className="page-container proyecto-page">
      <div className="content">
        <main>
          <header className="page-header">
            <h1 className="page-title">El Proyecto</h1>
          </header>

          <section className="glass-panel proyecto-goal">
            <h2>Objetivo General</h2>
            <p>Dominar Javascript</p>
          </section>

          <section className="glass-panel proyecto-roadmap">
            <h2 className="proyecto-roadmap-title">Roadmap de Aprendizaje</h2>

            <div className="proyecto-timeline">
              <div className="proyecto-timeline-line" aria-hidden="true" />

              {roadmapSteps.map((step) => {
                const statusClass = getStatusClass(step.status)

                return (
                  <article key={step.id} className="proyecto-step">
                    <div className={`proyecto-step-dot proyecto-step-dot--${statusClass}`}>
                      {getStepIcon(step.status)}
                    </div>

                    <div className={`proyecto-step-card proyecto-step-card--${statusClass}`}>
                      {step.icon && <div className="proyecto-step-icon">{step.icon}</div>}

                      <h3>{step.title}</h3>
                      <p>{step.description}</p>

                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-link-btn"
                        >
                          Ir al curso
                        </a>
                      )}

                      <br />
                      <span className={`proyecto-status-pill proyecto-status-pill--${statusClass}`}>
                        {getStatusLabel(step.status)}
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="proyecto-footer-note">
              <p>Más pasos se agregarán próximamente</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Proyecto
