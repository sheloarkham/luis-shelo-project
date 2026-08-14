import { useEffect, useState } from 'react'
import './HomeForestIntro.css'

const FOREST_VIDEO_CDN =
  'https://assets.mixkit.co/videos/preview/mixkit-sun-light-passing-through-the-trees-in-a-forest-11859-large.mp4'

const INTRO_SEEN_KEY = 'luis-shelo-home-intro-seen'

export const hasSeenHomeIntro = () => {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === '1'
  } catch {
    return false
  }
}

const markHomeIntroSeen = () => {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, '1')
  } catch {
    // ignore
  }
}

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
    markHomeIntroSeen()
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
      <video
        className="home-forest-intro__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/forest-bg.mp4" type="video/mp4" />
        <source src={FOREST_VIDEO_CDN} type="video/mp4" />
      </video>

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
