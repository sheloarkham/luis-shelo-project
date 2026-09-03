const exercise = (id, name, howTo, purpose) => ({
  id,
  name,
  howTo,
  purpose,
  executionImage: `/images/gym/exercises/${id}-ejecucion.png`,
  muscleImage: `/images/gym/exercises/${id}-musculo.png`,
})

export const GYM_MUSCLE_GUIDE = [
  {
    id: 'brazos',
    category: 'Brazos',
    subgroups: [
      {
        id: 'biceps',
        name: 'Bíceps',
        exercises: [
          exercise(
            'curl-maquina',
            'Curl máquina',
            'Siéntate en la máquina, apoya los brazos en el almohadillado y agarra las manijas con palmas hacia arriba. Flexiona los codos llevando el peso hacia los hombros sin mover el cuerpo, baja controlando el movimiento.',
            'Desarrolla fuerza y volumen en el bíceps braquial, mejorando la flexión del codo y la estética del brazo.'
          ),
          exercise(
            'curl-martillo',
            'Curl martillo',
            'De pie o sentado, sostén una mancuerna en cada mano con agarre neutro (palmas enfrentadas). Flexiona los codos subiendo las mancuernas junto al cuerpo y baja de forma lenta.',
            'Trabaja bíceps y braquial anterior con énfasis en el grosor del brazo gracias al agarre neutro.'
          ),
        ],
      },
      {
        id: 'triceps',
        name: 'Tríceps',
        exercises: [
          exercise(
            'triceps-polea',
            'Tríceps polea',
            'De frente a la polea alta, agarra la barra o cuerda con codos pegados al cuerpo. Extiende los brazos hacia abajo contrayendo tríceps y regresa sin separar los codos.',
            'Aísla el tríceps para mayor definición y empuje en ejercicios de pecho y hombros.'
          ),
        ],
      },
    ],
  },
  {
    id: 'piernas',
    category: 'Piernas',
    subgroups: [
      {
        id: 'cuadriceps',
        name: 'Cuádriceps',
        exercises: [
          exercise(
            'prensa-pierna',
            'Prensa pierna',
            'Siéntate en la prensa con espalda apoyada, pies en la plataforma a anchura de hombros. Baja controlando hasta ~90° en rodillas y empuja extendiendo piernas sin bloquear de golpe.',
            'Ejercicio compuesto que fortalece cuádriceps, glúteos e isquios con buena estabilidad de columna.'
          ),
          exercise(
            'leg-extension',
            'Leg extensión (cuádriceps)',
            'En la máquina, ajusta el rodillo sobre los tobillos y extiende las piernas hasta alinear rodillas, contrayendo cuádriceps arriba. Baja lento sin dejar caer el peso.',
            'Aísla el cuádriceps para mejorar la extensión de rodilla y el volumen frontal del muslo.'
          ),
        ],
      },
      {
        id: 'isquios',
        name: 'Isquios',
        exercises: [
          exercise(
            'seated-leg-curl',
            'Seated leg curl (isquio)',
            'Siéntate en la máquina con rodillas al borde del asiento y tobillos sobre el rodillo. Flexiona las piernas llevando el talón hacia los glúteos y vuelve controlando.',
            'Enfoca los isquiotibiales en posición sentada, útil para equilibrar fuerza posterior de pierna.'
          ),
          exercise(
            'prone-leg-curl',
            'Prone leg curl (isquio)',
            'Acostado boca abajo en la máquina, flexiona las piernas llevando el rodillo hacia los glúteos. Mantén caderas pegadas al banco durante todo el movimiento.',
            'Trabaja isquios en posición prona con buena activación y rango de flexión de rodilla.'
          ),
        ],
      },
      {
        id: 'aductores',
        name: 'Aductores',
        exercises: [
          exercise(
            'aductor',
            'Aductor',
            'Siéntate en la máquina de aducción con piernas abiertas en los cojines. Junta las piernas contrayendo musculatura interna del muslo y regresa sin rebotar.',
            'Fortalece aductores para estabilidad en sentadillas, prensa y movimientos laterales.'
          ),
        ],
      },
      {
        id: 'abductores',
        name: 'Abductores',
        exercises: [
          exercise(
            'abductor',
            'Abductor',
            'Siéntate en la máquina de abducción con piernas juntas. Separa las piernas empujando hacia afuera y controla el regreso.',
            'Activa glúteo medio y abductores, clave para estabilidad de cadera y alineación de rodilla.'
          ),
        ],
      },
    ],
  },
  {
    id: 'pecho',
    category: 'Pecho',
    subgroups: [
      {
        id: 'pecho',
        name: 'Pectorales',
        exercises: [
          exercise(
            'prensa-pecho-maquina',
            'Prensa pecho máquina',
            'Ajusta el asiento para que manijas queden a altura del pecho medio. Empuja hacia adelante extendiendo brazos y vuelve lento manteniendo escápulas estables.',
            'Desarrolla pectorales con trayectoria guiada, ideal para empuje horizontal controlado.'
          ),
          exercise(
            'press-banca-mancuerna',
            'Press banca con mancuerna',
            'Acostado en banco plano, mancuernas a la altura del pecho. Empuja hacia arriba juntando ligeramente las mancuernas y baja con codos a ~45° del torso.',
            'Fortalece pecho, hombros y tríceps con mayor rango de movimiento y equilibrio entre lados.'
          ),
        ],
      },
    ],
  },
  {
    id: 'hombros',
    category: 'Hombros',
    subgroups: [
      {
        id: 'deltoides',
        name: 'Deltoides',
        exercises: [
          exercise(
            'prensa-hombro',
            'Prensa hombro',
            'Siéntate en la máquina con espalda apoyada, manijas a la altura de hombros. Empuja hacia arriba extendiendo brazos sin arquear la espalda y baja controlado.',
            'Ejercicio compuesto para deltoides anterior y medio con buena estabilidad del tronco.'
          ),
          exercise(
            'deltoides-apertura-polea',
            'Deltoides apertura polea',
            'De pie entre poleas medias, agarra manijas cruzadas y abre los brazos lateralmente hasta quedar paralelos al suelo. Regresa sin perder tensión.',
            'Aísla deltoides medio y posterior para hombros más redondos y postura abierta.'
          ),
          exercise(
            'polea-unilateral',
            'Polea unilateral',
            'De pie junto a polea baja, agarra la manija con un brazo y eleva lateralmente o en diagonal según el ángulo configurado. Repite ambos lados.',
            'Permite corregir desbalances y trabajar deltoides con control unilateral.'
          ),
        ],
      },
    ],
  },
  {
    id: 'abdomen',
    category: 'Abdomen',
    subgroups: [
      {
        id: 'core',
        name: 'Core',
        exercises: [
          exercise(
            'crunch',
            'Crunch',
            'Acostado con rodillas flexionadas, manos detrás de la cabeza o cruzadas. Eleva el torso contrayendo abdomen sin tirar del cuello y baja controlando.',
            'Fortalece recto abdominal y mejora la estabilidad del core en la rutina.'
          ),
        ],
      },
    ],
  },
  {
    id: 'espalda',
    category: 'Espalda',
    subgroups: [
      {
        id: 'dorsales',
        name: 'Dorsales',
        exercises: [
          exercise(
            'remo-maquina',
            'Remo máquina',
            'Siéntate en la máquina de remo, agarra las manijas y tira hacia el abdomen apretando escápulas. Extiende brazos sin redondear la espalda.',
            'Desarrolla dorsales, romboides y trapecio medio para mejor postura y tirón.'
          ),
          exercise(
            'lat-pulldown-maquina',
            'Lat pulldown máquina',
            'Sentado en la máquina, agarra la barra amplia y tira hacia la parte alta del pecho llevando codos hacia abajo y atrás. Sube controlando.',
            'Enfoca dorsales y mejora la fuerza de tracción vertical del tren superior.'
          ),
        ],
      },
    ],
  },
]
