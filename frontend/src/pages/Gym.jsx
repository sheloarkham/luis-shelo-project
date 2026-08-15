import './shared-page.css'
import './Gym.css'

const TRAINING_DAYS = [
  {
    id: 1,
    day: 'Martes',
    focus: 'Piernas · Abs',
    muscleImage: '/images/gym/dia-1-piernas-abs.png',
    muscleImageAlt: 'Músculos trabajados en piernas y abdomen',
    groups: [
      {
        name: 'Piernas',
        exercises: [
          { name: 'Prensa pierna', weight: '160 kg' },
          { name: 'Leg extensión (cuádriceps)', weight: '36 kg' },
          { name: 'Aductor', weight: '72 kg' },
          { name: 'Abductor', weight: '72 kg' },
        ],
      },
      {
        name: 'Abdomen',
        exercises: [{ name: 'Crunch', weight: '50 kg' }],
      },
    ],
  },
  {
    id: 2,
    day: 'Miércoles',
    focus: 'Pecho · Hombros · Brazos',
    muscleImage: '/images/gym/dia-2-pecho-hombros-brazos.png',
    muscleImageAlt: 'Músculos trabajados en pecho, hombros y brazos',
    groups: [
      {
        name: 'Pecho',
        exercises: [
          {
            name: 'Prensa pecho máquina',
            weight: '50 kg',
            alternative: 'Prensa pecho peso libre 40 kg',
          },
          { name: 'Press banca con mancuerna', weight: '14 kg' },
        ],
      },
      {
        name: 'Hombros',
        exercises: [
          { name: 'Prensa hombro', weight: '41 kg' },
          { name: 'Deltoides apertura polea', weight: '59 kg' },
          { name: 'Polea unilateral', weight: '5 kg' },
        ],
      },
      {
        name: 'Brazos',
        exercises: [
          { name: 'Curl máquina', weight: '41 kg' },
          { name: 'Tríceps polea', weight: '21 kg' },
          { name: 'Curl bíceps martillo', weight: null },
        ],
      },
    ],
  },
  {
    id: 3,
    day: 'Domingo',
    focus: 'Piernas · Abs · Espalda',
    muscleImage: '/images/gym/dia-3-piernas-abs-espalda.png',
    muscleImageAlt: 'Músculos trabajados en piernas, abdomen y espalda',
    groups: [
      {
        name: 'Piernas',
        exercises: [
          { name: 'Seated leg curl (isquio)', weight: '27 kg' },
          { name: 'Prone leg curl (isquio)', weight: '50 kg' },
        ],
      },
      {
        name: 'Abdomen',
        exercises: [{ name: 'Crunch', weight: '50 kg' }],
      },
      {
        name: 'Espalda',
        exercises: [
          { name: 'Remo máquina', weight: '50 kg' },
          {
            name: 'Lat pulldown máquina',
            weight: '50 kg',
            alternative: 'Lat pulldown con polea 39 kg',
          },
        ],
      },
    ],
  },
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
                          {exercise.weight && (
                            <span className="gym-exercise-weight">{exercise.weight}</span>
                          )}
                          {exercise.alternative && (
                            <span className="gym-exercise-alt">o {exercise.alternative}</span>
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
      </div>
    </div>
  )
}

export default Gym
