import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useParticleTheme } from '../context/ParticleThemeContext'
import { useThemeCustomization } from '../context/ThemeContext'
import { getParticleTheme } from '../constants/particleThemes'
import './SiteBackground.css'

const BACKGROUND_IMAGE = '/images/backgrounds/night-sky-milky-way.png'

const hexToRgba = (hex, alpha) => {
  const value = parseInt(hex.slice(1), 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const SiteBackground = () => {
  const { pathname } = useLocation()
  const { pinkBlendRef } = useParticleTheme()
  const { particleTheme } = useThemeCustomization()
  const [pinkBlend, setPinkBlend] = useState(0)

  const isYeniPage = pathname === '/yeni'
  const theme = getParticleTheme(particleTheme)

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
      <div
        className="site-background__image"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      />
      <div className="site-background__dim" />
      <div
        className="site-background__tint"
        style={{
          background: `radial-gradient(circle at 50% 38%, ${hexToRgba(theme.bgInner, 0.55)}, ${hexToRgba(theme.bgMid, 0.82)})`,
        }}
      />
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
