import PageHero from '../components/PageHero'
import GradeCalculator from '../components/GradeCalculator'
import './shared-page.css'
import '../styles/futuristicPage.css'

const Carrera = () => (
  <div className="page-container neo-page">
    <div className="content neo-page__content">
      <main>
        <PageHero
          eyebrow="Universidad"
          title="Carrera"
          subtitle="Calculadora de notas y promedios por asignatura"
        />

        <div className="carrera-calculator-wrap">
          <GradeCalculator />
        </div>
      </main>
    </div>
  </div>
)

export default Carrera
