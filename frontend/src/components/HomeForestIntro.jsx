import { useEffect, useState } from 'react'
import './HomeForestIntro.css'

const HomeForestIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('visible')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => dismissIntro(), 3800)
    return () => window.clearTimeout(timer)
  }, [])

  const dismissIntro = () => {
    if (phase === 'exit') return
    setPhase('exit')
    window.setTimeout(() => onComplete?.(), 900)
  }

  return (
    <div
      className={`home-forest-intro home-forest-intro--${phase}`}
      role="presentation"
      onClick={dismissIntro}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') dismissIntro()
      }}
    >
      <div className="home-forest-intro__overlay" />

      <div className="home-forest-intro__content">
        <p className="home-forest-intro__eyebrow">Bienvenido a</p>
        <h1 className="home-forest-intro__title">Luis shelo Project</h1>
        <p className="home-forest-intro__hint">Haz clic para continuar</p>
      </div>
    </div>
  )
}

export default HomeForestIntro
