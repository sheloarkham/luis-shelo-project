import './shared-page.css'
import GradeCalculator from '../components/GradeCalculator'

const Carrera = () => {
  return (
    <div className="page-container">
      <div className="content">
        <main>
          <header className="page-header">
            <h1 className="page-title">Carrera</h1>
          </header>
          <GradeCalculator />
        </main>
      </div>
    </div>
  )
}

export default Carrera
