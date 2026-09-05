import PageHeader from '../components/PageHeader'
import './shared-page.css'
import '../styles/futuristicPage.css'

const ProyectoAutito = () => (
  <div className="page-container">
    <div className="content">
      <main>
        <PageHeader title="Autito" className="page-header--solo" />

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
