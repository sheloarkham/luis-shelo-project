import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useParticleTheme } from '../context/ParticleThemeContext'
import { useThemeCustomization } from '../context/ThemeContext'
import { getBackgroundTheme } from '../constants/backgroundThemes'
import './SiteBackground.css'

const SiteBackground = () => {
  const { pathname } = useLocation()
  const { pinkBlendRef } = useParticleTheme()
  const { backgroundId } = useThemeCustomization()
  const [pinkBlend, setPinkBlend] = useState(0)

  const isYeniPage = pathname === '/yeni'
  const background = getBackgroundTheme(backgroundId)

  useEffect(() => {
    if (!isYeniPage) {
      setPinkBlend(0)
      return undefined
    }

    let frame = 0

    const tick = () => {
      setPinkBlend(pinkBlendRef.current)
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frame)
  }, [isYeniPage, pinkBlendRef])

  return (
    <div className="site-background" aria-hidden="true">
      <img
        key={background.id}
        className="site-background__image"
        src={background.image}
        alt=""
        draggable={false}
        decoding="async"
        fetchPriority="high"
        style={{ objectPosition: background.position }}
      />
      <div className="site-background__dim" />
      {isYeniPage && (
        <div
          className="site-background__yeni"
          style={{ opacity: pinkBlend }}
        />
      )}
    </div>
  )
}

export default SiteBackground
