import { useEffect, useRef } from 'react'
import './ProyectoShootingStars.css'

const MAX_STARS = 55
const SPAWN_EVERY_MS = 90
const BURST_EVERY_MS = 600
const BURST_COUNT = 6

const PALETTES = {
  gold: {
    head: [255, 236, 160],
    mid: [255, 210, 90],
    tail: [255, 185, 70],
  },
  purple: {
    head: [220, 180, 255],
    mid: [180, 120, 255],
    tail: [140, 80, 220],
  },
}

const pickPalette = () => (Math.random() > 0.42 ? 'gold' : 'purple')

const createStar = (width, height) => {
  const paletteKey = pickPalette()
  const angle = Math.PI * 0.18 + Math.random() * 0.14
  const speed = 9 + Math.random() * 11
  const length = 55 + Math.random() * 120

  return {
    x: Math.random() * width * 1.1 - width * 0.05,
    y: -length - Math.random() * height * 0.35,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length,
    width: 0.9 + Math.random() * 2.2,
    life: 0.75 + Math.random() * 0.25,
    fade: 0.008 + Math.random() * 0.012,
    palette: PALETTES[paletteKey],
  }
}

const ProyectoShootingStars = () => {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const animationRef = useRef(null)
  const lastSpawnRef = useRef(0)
  const lastBurstRef = useRef(0)

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

    const spawnStars = (width, height, count) => {
      for (let i = 0; i < count; i += 1) {
        if (starsRef.current.length >= MAX_STARS) break
        starsRef.current.push(createStar(width, height))
      }
    }

    const draw = (time) => {
      const { width, height } = canvas

      context.clearRect(0, 0, width, height)

      if (time - lastSpawnRef.current > SPAWN_EVERY_MS) {
        spawnStars(width, height, 1 + Math.floor(Math.random() * 2))
        lastSpawnRef.current = time
      }

      if (time - lastBurstRef.current > BURST_EVERY_MS) {
        spawnStars(width, height, BURST_COUNT)
        lastBurstRef.current = time
      }

      starsRef.current = starsRef.current.filter((star) => star.life > 0.03)

      starsRef.current.forEach((star) => {
        const speed = Math.hypot(star.vx, star.vy) || 1
        const tailX = star.x - (star.vx / speed) * star.length
        const tailY = star.y - (star.vy / speed) * star.length
        const [hr, hg, hb] = star.palette.head
        const [mr, mg, mb] = star.palette.mid
        const [tr, tg, tb] = star.palette.tail

        const gradient = context.createLinearGradient(star.x, star.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(${hr}, ${hg}, ${hb}, ${star.life * 0.98})`)
        gradient.addColorStop(0.4, `rgba(${mr}, ${mg}, ${mb}, ${star.life * 0.62})`)
        gradient.addColorStop(1, `rgba(${tr}, ${tg}, ${tb}, 0)`)

        context.strokeStyle = gradient
        context.lineWidth = star.width
        context.lineCap = 'round'
        context.beginPath()
        context.moveTo(star.x, star.y)
        context.lineTo(tailX, tailY)
        context.stroke()

        context.fillStyle = `rgba(${hr}, ${hg}, ${hb}, ${star.life * 0.95})`
        context.shadowBlur = 8
        context.shadowColor = `rgba(${mr}, ${mg}, ${mb}, ${star.life * 0.7})`
        context.beginPath()
        context.arc(star.x, star.y, star.width * 1.15, 0, Math.PI * 2)
        context.fill()
        context.shadowBlur = 0

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
