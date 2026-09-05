import { useEffect, useMemo, useState } from 'react'
import { useThemeCustomization } from '../context/ThemeContext'
import {
  GYM_WEIGHTS_STORAGE_KEY,
  getExerciseKey,
  loadGymWeights,
  mergeTrainingDaysWithWeights,
} from '../data/gymData'
import PageHeader from '../components/PageHeader'
import GymExerciseGuide from '../components/GymExerciseGuide'
import './shared-page.css'
import '../styles/futuristicPage.css'
import './Gym.css'

const Gym = () => {
  const { customizationMode } = useThemeCustomization()
  const [weights, setWeights] = useState(loadGymWeights)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem(GYM_WEIGHTS_STORAGE_KEY, JSON.stringify(weights))
  }, [weights, isLoaded])

  const trainingDays = useMemo(() => mergeTrainingDaysWithWeights(weights), [weights])

  const updateWeight = (dayId, groupName, exerciseName, field, value) => {
    const key = getExerciseKey(dayId, groupName, exerciseName, field)
    setWeights((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const resetGymWeights = () => {
    if (window.confirm('¿Restaurar todos los pesos del gym a los valores originales?')) {
      localStorage.removeItem(GYM_WEIGHTS_STORAGE_KEY)
      setWeights(loadGymWeights())
    }
  }

  return (
    <div className="page-container gym-container">
      <div className="content">
        <PageHeader
          title="Gym"
          className="page-header--solo"
          hint={
            customizationMode
              ? 'Modo personalización: edita los pesos en cada ejercicio. Se guardan al recargar.'
              : undefined
          }
        />

        <section className="gym-days-grid" aria-label="Días de entrenamiento">
          {trainingDays.map((day) => (
            <article key={day.id} className="gym-day-card">
              <span className="gym-day-number">Día {day.id}</span>
              <h2 className="gym-day-label">{day.day}</h2>
              <p className="gym-day-focus">{day.focus}</p>

              {day.muscleImage && (
                <figure className="gym-muscle-diagram">
                  <img src={day.muscleImage} alt={day.muscleImageAlt} loading="lazy" />
                  <figcaption>Músculos que trabajas este día</figcaption>
                </figure>
              )}

              <div className="gym-day-groups">
                {day.groups.map((group) => (
                  <section key={group.name} className="gym-muscle-group">
                    <h3 className="gym-group-title">{group.name}</h3>
                    <ul className="gym-exercise-list">
                      {group.exercises.map((exercise) => (
                        <li key={`${group.name}-${exercise.name}`} className="gym-exercise-item">
                          <span className="gym-exercise-name">{exercise.name}</span>

                          {customizationMode ? (
                            <>
                              <input
                                type="text"
                                className="gym-weight-input"
                                value={exercise.weight ?? ''}
                                placeholder="Peso"
                                onChange={(e) =>
                                  updateWeight(day.id, group.name, exercise.name, 'weight', e.target.value)
                                }
                                aria-label={`Peso de ${exercise.name}`}
                              />
                              {exercise.alternative !== undefined && (
                                <input
                                  type="text"
                                  className="gym-weight-input gym-weight-input--alt"
                                  value={exercise.alternative ?? ''}
                                  placeholder="Alternativa (o ...)"
                                  onChange={(e) =>
                                    updateWeight(day.id, group.name, exercise.name, 'alt', e.target.value)
                                  }
                                  aria-label={`Alternativa de ${exercise.name}`}
                                />
                              )}
                            </>
                          ) : (
                            <>
                              {exercise.weight && (
                                <span className="gym-exercise-weight">{exercise.weight}</span>
                              )}
                              {exercise.alternative && (
                                <span className="gym-exercise-alt">o {exercise.alternative}</span>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </section>

        <GymExerciseGuide />

        {customizationMode && (
          <div className="gym-reset-wrap">
            <button type="button" className="gym-reset-btn" onClick={resetGymWeights}>
              Restaurar pesos del gym
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gym
