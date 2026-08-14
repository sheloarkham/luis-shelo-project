import { useEffect, useRef } from 'react'
import './ParticleBackground.css'

const PARTICLE_COUNT = 85
const CONNECTION_DISTANCE = 130

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

    const drawBackground = () => {
      const { width, height } = sizeRef.current
      const gradient = context.createRadialGradient(
        width * 0.5,
        height * 0.85,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.9
      )
      gradient.addColorStop(0, '#001a33')
      gradient.addColorStop(0.45, '#000814')
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

    const drawConnections = () => {
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)

          if (distance > CONNECTION_DISTANCE) continue

          const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.18
          context.strokeStyle = `rgba(51, 153, 255, ${opacity})`
          context.lineWidth = 0.6
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }
    }

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        const outerGlow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 5
        )
        outerGlow.addColorStop(0, `rgba(80, 170, 255, ${particle.alpha * 0.45})`)
        outerGlow.addColorStop(1, 'rgba(51, 153, 255, 0)')

        context.fillStyle = outerGlow
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2)
        context.fill()

        context.globalAlpha = particle.alpha
        context.fillStyle = '#66bbff'
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })

      context.globalAlpha = 1
    }

    const drawWave = (time) => {
      const { width, height } = sizeRef.current
      context.save()
      context.globalAlpha = 0.08
      context.strokeStyle = '#3399ff'
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
      drawBackground()
      updateParticles(time)
      drawWave(time)
      drawConnections()
      drawParticles()
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
  }, [])

  return <canvas ref={canvasRef} className="particle-background" aria-hidden="true" />
}

export default ParticleBackground
