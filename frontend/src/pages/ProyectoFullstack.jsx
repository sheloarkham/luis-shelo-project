import ScrollReveal from '../components/ScrollReveal'
import { scrollRevealStagger } from '../utils/scrollRevealStagger'
import './shared-page.css'
import './ProyectoFullstack.css'

const roadmapSteps = [
  {
    id: 1,
    title: 'Pensamiento crítico',
    status: 'en-progreso',
    platform: 'Santander Open Academy',
    description: 'Habilidades analíticas, razonamiento lógico y toma de decisiones fundamentada.',
    link: 'https://lms.santanderopenacademy.com/courses/582/modules',
    linkLabel: 'Abrir módulos',
  },
  {
    id: 2,
    title: 'Google Data Analytics',
    status: 'completado',
    platform: 'Coursera',
    description: 'Análisis de datos, SQL, hojas de cálculo y visualización profesional.',
    link: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    linkLabel: 'Ver certificado',
  },
  {
    id: 3,
    title: 'TypeScript: Tu completa guía y manual de mano',
    status: 'en-progreso',
    platform: 'Udemy · Fernando Herrera',
    description: 'Curso completo de TypeScript para bases sólidas en desarrollo moderno.',
    link: 'https://www.udemy.com/course/typescript-guia-completa/',
    linkLabel: 'Ir al curso',
  },
  {
    id: 4,
    title: 'Lógica de Programación',
    status: 'pendiente',
    platform: 'Libro · Omar Iván Trejos Buriticá',
    description: 'Fundamentos de algoritmos, estructuras y pensamiento lógico aplicado.',
    link: 'https://matrix3d.co/producto/logica-de-programacion-2a-edicion/',
    linkLabel: 'Ver libro',
  },
]

const STATUS = {
  completado: { label: 'Completado', className: 'done' },
  'en-progreso': { label: 'En progreso', className: 'progress' },
  pendiente: { label: 'Pendiente', className: 'pending' },
}

const ProyectoFullstack = () => {
  const completed = roadmapSteps.filter((step) => step.status === 'completado').length
  const progressPct = Math.round((completed / roadmapSteps.length) * 100)

  return (
    <div className="page-container fullstack-page">
      <div className="content fullstack-page__content">
        <ScrollReveal>
          <header className="fullstack-hero">
            <p className="fullstack-hero__eyebrow">Proyecto · Roadmap</p>
            <h1 className="fullstack-hero__title">Fullstack</h1>
            <p className="fullstack-hero__subtitle">
              Ruta de aprendizaje hacia TypeScript y desarrollo full stack
            </p>

            <div className="fullstack-hero__stats">
              <div className="fullstack-stat">
                <span className="fullstack-stat__value">{completed}</span>
                <span className="fullstack-stat__label">Completados</span>
              </div>
              <div className="fullstack-stat">
                <span className="fullstack-stat__value">
                  {roadmapSteps.filter((s) => s.status === 'en-progreso').length}
                </span>
                <span className="fullstack-stat__label">En curso</span>
              </div>
              <div className="fullstack-stat">
                <span className="fullstack-stat__value">{roadmapSteps.length}</span>
                <span className="fullstack-stat__label">Total</span>
              </div>
            </div>

            <div className="fullstack-progress" aria-label={`Progreso ${progressPct}%`}>
              <div className="fullstack-progress__track">
                <div className="fullstack-progress__fill" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="fullstack-progress__label">{progressPct}% del roadmap</span>
            </div>
          </header>
        </ScrollReveal>

        <section className="fullstack-roadmap" aria-label="Cursos del roadmap">
          <div className="fullstack-roadmap__grid">
            {roadmapSteps.map((step, index) => {
              const status = STATUS[step.status]

              return (
                <ScrollReveal
                  key={step.id}
                  delay={scrollRevealStagger(index, 0.08, 4)}
                  className="scroll-reveal--fill"
                >
                  <article className={`fullstack-card fullstack-card--${status.className}`}>
                    <div className="fullstack-card__glow" aria-hidden="true" />

                    <div className="fullstack-card__top">
                      <span className="fullstack-card__index">
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <span className={`fullstack-card__status fullstack-card__status--${status.className}`}>
                        {status.label}
                      </span>
                    </div>

                    <span className="fullstack-card__platform">{step.platform}</span>
                    <h2 className="fullstack-card__title">{step.title}</h2>
                    <p className="fullstack-card__desc">{step.description}</p>

                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fullstack-card__link"
                      >
                        {step.linkLabel || 'Ir al curso'}
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        <ScrollReveal delay={0.2}>
          <footer className="fullstack-footer">
            <span className="fullstack-footer__pulse" aria-hidden="true" />
            <p>Ruta activa · TypeScript + Full Stack</p>
          </footer>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default ProyectoFullstack
