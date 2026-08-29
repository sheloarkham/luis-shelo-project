import './shared-page.css'
import './Proyecto.css'

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
    status: 'completado',
    description: 'Análisis de datos, SQL, hojas de cálculo y visualización - Coursera',
    link: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    icon: '📊',
  },
  {
    id: 3,
    title: 'TypeScript: Tu completa guía y manual de mano',
    status: 'en-progreso',
    description: 'Curso completo de TypeScript — Fernando Herrera · Udemy',
    link: 'https://www.udemy.com/course/typescript-guia-completa/',
    linkLabel: 'Ir al curso',
    icon: '📘',
  },
  {
    id: 4,
    title: 'Lógica de Programación',
    status: 'pendiente',
    description: 'Libro · Fundamentos de algoritmos y pensamiento lógico — Omar Iván Trejos Buriticá',
    link: 'https://matrix3d.co/producto/logica-de-programacion-2a-edicion/',
    linkLabel: 'Ver libro',
    icon: '📖',
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

const ProyectoFullstack = () => (
  <div className="page-container proyecto-page">
    <div className="content">
      <main>
        <header className="page-header">
          <h1 className="page-title">Fullstack</h1>
          <p className="page-subtitle">Roadmap de aprendizaje</p>
        </header>

        <section className="glass-panel proyecto-goal">
          <h2>Objetivo General</h2>
          <p>Dominar TypeScript y desarrollo full stack</p>
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
                        {step.linkLabel || 'Ir al curso'}
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
            <p>Ruta activa: TypeScript + Full Stack</p>
          </div>
        </section>
      </main>
    </div>
  </div>
)

export default ProyectoFullstack
