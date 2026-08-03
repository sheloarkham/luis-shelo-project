import './shared-page.css'
import './Gym.css'

/**
 * Días de entrenamiento de la semana.
 * Más adelante cada día tendrá su lista de ejercicios.
 */
const TRAINING_DAYS = [
  { id: 1, label: 'Día 1' },
  { id: 2, label: 'Día 2' },
  { id: 3, label: 'Día 3' },
  { id: 4, label: 'Día 4' },
]

const Gym = () => {
  return (
    <div className="page-container gym-container">
      <div className="content">
        <header className="gym-header">
          <h1 className="gym-title">Gym</h1>
          <p className="gym-subtitle">Rutina semanal — 3 días de entrenamiento</p>
        </header>

        <section className="gym-days-grid" aria-label="Días de entrenamiento">
          {TRAINING_DAYS.map((day) => (
            <article key={day.id} className="gym-day-card">
              <span className="gym-day-number">Entrenamiento</span>
              <h2 className="gym-day-label">{day.label}</h2>
              <p className="gym-day-placeholder">Ejercicios próximamente...</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Gym
