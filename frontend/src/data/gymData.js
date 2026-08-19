export const LEG_EXERCISES = [
  { name: 'Prensa pierna', weight: '160 kg' },
  { name: 'Leg extensión (cuádriceps)', weight: '36 kg' },
  { name: 'Seated leg curl (isquio)', weight: '27 kg' },
  { name: 'Prone leg curl (isquio)', weight: '50 kg' },
  { name: 'Aductor', weight: '72 kg' },
  { name: 'Abductor', weight: '72 kg' },
]

export const DEFAULT_TRAINING_DAYS = [
  {
    id: 1,
    day: 'Martes',
    focus: 'Piernas · Abs',
    muscleImage: '/images/gym/dia-1-piernas-abs.png',
    muscleImageAlt: 'Músculos trabajados en piernas y abdomen',
    groups: [
      { name: 'Piernas', exercises: LEG_EXERCISES },
      { name: 'Abdomen', exercises: [{ name: 'Crunch', weight: '50 kg' }] },
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
          { name: 'Curl martillo', weight: '18 kg' },
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
      { name: 'Piernas', exercises: LEG_EXERCISES },
      { name: 'Abdomen', exercises: [{ name: 'Crunch', weight: '50 kg' }] },
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

export const GYM_WEIGHTS_STORAGE_KEY = 'luis-shelo-gym-weights'

export const getExerciseKey = (dayId, groupName, exerciseName, field = 'weight') =>
  `${dayId}|${groupName}|${exerciseName}|${field}`

export const buildDefaultWeightMap = () => {
  const map = {}

  DEFAULT_TRAINING_DAYS.forEach((day) => {
    day.groups.forEach((group) => {
      group.exercises.forEach((exercise) => {
        if (exercise.weight) {
          map[getExerciseKey(day.id, group.name, exercise.name, 'weight')] = exercise.weight
        }
        if (exercise.alternative) {
          map[getExerciseKey(day.id, group.name, exercise.name, 'alt')] = exercise.alternative
        }
      })
    })
  })

  return map
}

export const loadGymWeights = () => {
  try {
    const saved = localStorage.getItem(GYM_WEIGHTS_STORAGE_KEY)
    if (!saved) return buildDefaultWeightMap()
    return { ...buildDefaultWeightMap(), ...JSON.parse(saved) }
  } catch {
    return buildDefaultWeightMap()
  }
}

export const mergeTrainingDaysWithWeights = (weights) =>
  DEFAULT_TRAINING_DAYS.map((day) => ({
    ...day,
    groups: day.groups.map((group) => ({
      ...group,
      exercises: group.exercises.map((exercise) => ({
        ...exercise,
        weight: weights[getExerciseKey(day.id, group.name, exercise.name, 'weight')] ?? exercise.weight,
        alternative:
          weights[getExerciseKey(day.id, group.name, exercise.name, 'alt')] ?? exercise.alternative,
      })),
    })),
  }))
