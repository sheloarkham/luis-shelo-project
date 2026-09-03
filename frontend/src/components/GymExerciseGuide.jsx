import { useState } from 'react'
import { GYM_MUSCLE_GUIDE } from '../data/gymExerciseGuide'
import ScrollReveal from './ScrollReveal'
import { scrollRevealStagger } from '../utils/scrollRevealStagger'
import './GymExerciseGuide.css'

const GymExerciseImage = ({ src, alt, label }) => {
  const [missing, setMissing] = useState(false)

  return (
    <figure className="gym-guide-image">
      {missing ? (
        <div className="gym-guide-image__placeholder" aria-hidden="true">
          <span>Foto pendiente</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
      <figcaption>{label}</figcaption>
    </figure>
  )
}

const GymExerciseGuide = () => {
  let revealIndex = 0

  return (
    <section className="gym-guide" aria-label="Guía de ejercicios por grupo muscular">
      <ScrollReveal>
        <header className="gym-guide-header">
          <h2 className="gym-guide-title">Guía de ejercicios</h2>
          <p className="gym-guide-subtitle">
            Por categoría y grupo muscular — ejecución, músculo trabajado y para qué sirve
          </p>
        </header>
      </ScrollReveal>

      {GYM_MUSCLE_GUIDE.map((category) => (
        <section key={category.id} className="gym-guide-category">
          <ScrollReveal delay={scrollRevealStagger(revealIndex++, 0.06, 8)}>
            <h3 className="gym-guide-category-title">{category.category}</h3>
          </ScrollReveal>

          {category.subgroups.map((subgroup) => (
            <div key={subgroup.id} className="gym-guide-subgroup">
              <ScrollReveal delay={scrollRevealStagger(revealIndex++, 0.06, 8)}>
                <h4 className="gym-guide-subgroup-title">{subgroup.name}</h4>
              </ScrollReveal>

              <div className="gym-guide-exercises">
                {subgroup.exercises.map((item) => (
                  <ScrollReveal
                    key={item.id}
                    delay={scrollRevealStagger(revealIndex++, 0.05, 12)}
                    className="scroll-reveal--fill"
                  >
                    <article className="gym-guide-card">
                      <div className="gym-guide-card__media">
                        <GymExerciseImage
                          src={item.executionImage}
                          alt={`Ejecución de ${item.name}`}
                          label="Ejecución"
                        />
                        <GymExerciseImage
                          src={item.muscleImage}
                          alt={`Músculo trabajado en ${item.name}`}
                          label="Músculo"
                        />
                      </div>

                      <div className="gym-guide-card__content">
                        <h5 className="gym-guide-card__name">{item.name}</h5>

                        <div className="gym-guide-card__block">
                          <span className="gym-guide-card__label">Para qué sirve</span>
                          <p>{item.purpose}</p>
                        </div>

                        <div className="gym-guide-card__block">
                          <span className="gym-guide-card__label">Cómo se ejecuta</span>
                          <p>{item.howTo}</p>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </section>
  )
}

export default GymExerciseGuide
