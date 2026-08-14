import { useEffect, useRef } from 'react'
import { useParticleTheme } from '../context/ParticleThemeContext'
import './ParticleBackground.css'

const PARTICLE_COUNT = 85
const CONNECTION_DISTANCE = 130

const parseHex = (hex) => {
  const value = parseInt(hex.slice(1), 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

const lerpColor = (hexA, hexB, t) => {
  const a = parseHex(hexA)
  const b = parseHex(hexB)
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const blue = Math.round(a.b + (b.b - a.b) * t)
  return `rgb(${r}, ${g}, ${blue})`
}

const BLUE = {
  bgInner: '#001a33',
  bgMid: '#000814',
  particle: '#66bbff',
  glow: { r: 80, g: 170, b: 255, a: 0.45 },
  line: { r: 51, g: 153, b: 255, a: 0.18 },
  wave: '#3399ff',
}

const PINK = {
  bgInner: '#3a0a28',
  bgMid: '#1a0512',
  particle: '#ff6b9d',
  glow: { r: 255, g: 120, b: 180, a: 0.5 },
  line: { r: 255, g: 105, b: 180, a: 0.2 },
  wave: '#ff6b9d',
}

const createParticle = (width, height) => {
  const depth = Math.random()

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.2,
    size: 0.8 + depth * 2.4,
    alpha: 0.25 + depth * 0.55,
    phase: Math.random() * Math.PI * 2,
  }
}

const ParticleBackground = () => {
  const { pinkBlendRef } = useParticleTheme()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const sizeRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const resizeCanvas = () => {
      sizeRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      canvas.width = sizeRef.current.width
      canvas.height = sizeRef.current.height

      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
          createParticle(canvas.width, canvas.height)
        )
      }
    }

    const drawBackground = (blend) => {
      const { width, height } = sizeRef.current
      const gradient = context.createRadialGradient(
        width * 0.5,
        height * 0.85,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.9
      )
      gradient.addColorStop(0, lerpColor(BLUE.bgInner, PINK.bgInner, blend))
      gradient.addColorStop(0.45, lerpColor(BLUE.bgMid, PINK.bgMid, blend))
      gradient.addColorStop(1, '#000000')

      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)
    }

    const updateParticles = (time) => {
      const { width, height } = sizeRef.current

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy + Math.sin(time * 0.001 + particle.phase) * 0.12

        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20
      })
    }

    const drawConnections = (blend) => {
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)

          if (distance > CONNECTION_DISTANCE) continue

          const opacity = (1 - distance / CONNECTION_DISTANCE) * (BLUE.line.a + (PINK.line.a - BLUE.line.a) * blend)
          context.strokeStyle = `rgba(${Math.round(BLUE.line.r + (PINK.line.r - BLUE.line.r) * blend)}, ${Math.round(BLUE.line.g + (PINK.line.g - BLUE.line.g) * blend)}, ${Math.round(BLUE.line.b + (PINK.line.b - BLUE.line.b) * blend)}, ${opacity})`
          context.lineWidth = 0.6
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }
    }

    const drawParticles = (blend) => {
      particlesRef.current.forEach((particle) => {
        const outerGlow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 5
        )
        const glowAlpha = (BLUE.glow.a + (PINK.glow.a - BLUE.glow.a) * blend) * particle.alpha
        outerGlow.addColorStop(
          0,
          `rgba(${Math.round(BLUE.glow.r + (PINK.glow.r - BLUE.glow.r) * blend)}, ${Math.round(BLUE.glow.g + (PINK.glow.g - BLUE.glow.g) * blend)}, ${Math.round(BLUE.glow.b + (PINK.glow.b - BLUE.glow.b) * blend)}, ${glowAlpha})`
        )
        outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')

        context.fillStyle = outerGlow
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2)
        context.fill()

        context.globalAlpha = particle.alpha
        context.fillStyle = lerpColor(BLUE.particle, PINK.particle, blend)
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })

      context.globalAlpha = 1
    }

    const drawWave = (time, blend) => {
      const { width, height } = sizeRef.current
      context.save()
      context.globalAlpha = 0.08 + blend * 0.04
      context.strokeStyle = lerpColor(BLUE.wave, PINK.wave, blend)
      context.lineWidth = 1

      for (let wave = 0; wave < 3; wave += 1) {
        context.beginPath()
        for (let x = 0; x <= width; x += 12) {
          const y =
            height * (0.45 + wave * 0.08) +
            Math.sin(x * 0.004 + time * 0.0008 + wave) * 28 +
            Math.sin(x * 0.009 - time * 0.0005) * 12
          if (x === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.stroke()
      }

      context.restore()
    }

    const draw = (time) => {
      const blend = pinkBlendRef.current
      drawBackground(blend)
      updateParticles(time)
      drawWave(time, blend)
      drawConnections(blend)
      drawParticles(blend)
      animationRef.current = window.requestAnimationFrame(draw)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animationRef.current = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current)
      }
    }
  }, [pinkBlendRef])

  return <canvas ref={canvasRef} className="particle-background" aria-hidden="true" />
}

export default ParticleBackground
