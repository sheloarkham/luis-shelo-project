import { useEffect, useRef } from 'react'
import './ProyectoShootingStars.css'

const MAX_STARS = 4
const SPAWN_INTERVAL_MS = 2200

const createStar = (width, height) => {
  const startX = Math.random() * width * 0.85 + width * 0.05
  const angle = Math.PI * 0.22 + Math.random() * 0.08
  const speed = 7 + Math.random() * 5
  const length = 70 + Math.random() * 90

  return {
    x: startX,
    y: -length - Math.random() * height * 0.25,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length,
    width: 1.2 + Math.random() * 1.2,
    life: 1,
    fade: 0.012 + Math.random() * 0.01,
  }
}

const ProyectoShootingStars = () => {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const animationRef = useRef(null)
  const lastSpawnRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = (time) => {
      const { width, height } = canvas

      context.clearRect(0, 0, width, height)

      if (time - lastSpawnRef.current > SPAWN_INTERVAL_MS && starsRef.current.length < MAX_STARS) {
        if (Math.random() > 0.35) {
          starsRef.current.push(createStar(width, height))
          lastSpawnRef.current = time
        }
      }

      starsRef.current = starsRef.current.filter((star) => star.life > 0.04)

      starsRef.current.forEach((star) => {
        const speed = Math.hypot(star.vx, star.vy) || 1
        const tailX = star.x - (star.vx / speed) * star.length
        const tailY = star.y - (star.vy / speed) * star.length

        const gradient = context.createLinearGradient(star.x, star.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(255, 236, 160, ${star.life * 0.95})`)
        gradient.addColorStop(0.35, `rgba(255, 215, 90, ${star.life * 0.55})`)
        gradient.addColorStop(1, 'rgba(255, 200, 80, 0)')

        context.strokeStyle = gradient
        context.lineWidth = star.width
        context.lineCap = 'round'
        context.beginPath()
        context.moveTo(star.x, star.y)
        context.lineTo(tailX, tailY)
        context.stroke()

        context.fillStyle = `rgba(255, 248, 210, ${star.life})`
        context.beginPath()
        context.arc(star.x, star.y, star.width * 1.1, 0, Math.PI * 2)
        context.fill()

        star.x += star.vx
        star.y += star.vy
        star.life -= star.fade
      })

      animationRef.current = window.requestAnimationFrame(draw)
    }

    animationRef.current = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current)
      }
      starsRef.current = []
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="proyecto-shooting-stars"
      aria-hidden="true"
    />
  )
}

export default ProyectoShootingStars
