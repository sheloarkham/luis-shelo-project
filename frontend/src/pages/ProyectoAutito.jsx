import PageHero from '../components/PageHero'
import './shared-page.css'
import '../styles/futuristicPage.css'

const ProyectoAutito = () => (
  <div className="page-container neo-page">
    <div className="content neo-page__content">
      <main>
        <PageHero
          eyebrow="Proyecto"
          title="Autito"
          subtitle="Proyecto en construcción"
        />

        <section className="neo-glass-panel">
          <div className="neo-glass-panel__glow" aria-hidden="true" />
          <div className="neo-glass-panel__icon">🚗</div>
          <h2>Próximamente</h2>
          <p>Acá irá el contenido del proyecto Autito.</p>
        </section>

        <footer className="neo-footer">
          <span className="neo-footer__pulse" aria-hidden="true" />
          <p>En desarrollo · Autito</p>
        </footer>
      </main>
    </div>
  </div>
)

export default ProyectoAutito
