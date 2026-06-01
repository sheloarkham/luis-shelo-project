import './shared-page.css'
import GradeCalculator from '../components/GradeCalculator'

const Carrera = () => {
  return (
    <div className="page-container">
      <div className="content">
        <main>
          <header>
            <h1>Carrera</h1>
          </header>
          <GradeCalculator />
        </main>
      </div>
    </div>
  )
}

export default Carrera
