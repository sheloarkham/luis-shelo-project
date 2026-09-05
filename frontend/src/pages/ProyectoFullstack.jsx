import ScrollReveal from '../components/ScrollReveal'
import PageHeader from '../components/PageHeader'
import { scrollRevealStagger } from '../utils/scrollRevealStagger'
import './shared-page.css'
import '../styles/futuristicPage.css'

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
    <div className="page-container">
      <div className="content">
        <ScrollReveal>
          <PageHeader
          title="Fullstack"
          className="page-header--solo"
        >
            <div className="neo-progress fullstack-progress" aria-label={`Progreso ${progressPct}%`}>
              <div className="neo-progress__track">
                <div className="neo-progress__fill" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="neo-progress__label">{progressPct}% del roadmap</span>
            </div>
          </PageHeader>
        </ScrollReveal>

        <section className="fullstack-roadmap" aria-label="Cursos del roadmap">
          <div className="neo-grid">
            {roadmapSteps.map((step, index) => {
              const status = STATUS[step.status]

              return (
                <ScrollReveal
                  key={step.id}
                  delay={scrollRevealStagger(index, 0.08, 4)}
                  className="scroll-reveal--fill"
                >
                  <article className={`neo-card neo-card--${status.className}`}>
                    <div className="neo-card__glow" aria-hidden="true" />

                    <div className="neo-card__top">
                      <span className="neo-card__index">
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <span className={`neo-card__status neo-card__status--${status.className}`}>
                        {status.label}
                      </span>
                    </div>

                    <span className="neo-card__platform">{step.platform}</span>
                    <h2 className="neo-card__title">{step.title}</h2>
                    <p className="neo-card__desc">{step.description}</p>

                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-card__link"
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
          <footer className="neo-footer">
            <span className="neo-footer__pulse" aria-hidden="true" />
            <p>Ruta activa · TypeScript + Full Stack</p>
          </footer>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default ProyectoFullstack
