import PageHeader from '../components/PageHeader'
import GradeCalculator from '../components/GradeCalculator'
import './shared-page.css'
import './Carrera.css'

const Carrera = () => (
  <div className="page-container">
    <div className="content">
      <main>
        <PageHeader title="Carrera" className="page-header--solo" />

        <div className="carrera-calculator-wrap">
          <GradeCalculator />
        </div>
      </main>
    </div>
  </div>
)

export default Carrera
