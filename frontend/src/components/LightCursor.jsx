import { useEffect, useRef } from 'react'
import './LightCursor.css'

const LightCursor = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const stateRef = useRef({
    pointerX: -200,
    pointerY: -200,
    glowX: -200,
    glowY: -200,
    visible: false,
    particles: [],
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawnParticle = (x, y) => {
      stateRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        life: 1,
        size: Math.random() * 2.5 + 1.5,
      })

      if (stateRef.current.particles.length > 28) {
        stateRef.current.particles.shift()
      }
    }

    const onPointerMove = (event) => {
      const { clientX, clientY } = event
      stateRef.current.pointerX = clientX
      stateRef.current.pointerY = clientY
      stateRef.current.visible = true

      if (Math.random() > 0.55) {
        spawnParticle(clientX, clientY)
      }
    }

    const onPointerLeave = () => {
      stateRef.current.visible = false
    }

    const draw = () => {
      const state = stateRef.current
      state.glowX += (state.pointerX - state.glowX) * 0.14
      state.glowY += (state.pointerY - state.glowY) * 0.14

      context.clearRect(0, 0, canvas.width, canvas.height)

      if (state.visible) {
        const glow = context.createRadialGradient(
          state.glowX,
          state.glowY,
          0,
          state.glowX,
          state.glowY,
          140
        )
        glow.addColorStop(0, 'rgba(255, 248, 210, 0.42)')
        glow.addColorStop(0.35, 'rgba(196, 255, 170, 0.18)')
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)')

        context.fillStyle = glow
        context.beginPath()
        context.arc(state.glowX, state.glowY, 140, 0, Math.PI * 2)
        context.fill()

        context.fillStyle = 'rgba(255, 255, 230, 0.85)'
        context.beginPath()
        context.arc(state.glowX, state.glowY, 4, 0, Math.PI * 2)
        context.fill()
      }

      state.particles = state.particles.filter((particle) => particle.life > 0.04)
      state.particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.028

        context.globalAlpha = particle.life * 0.75
        context.fillStyle = 'rgba(255, 245, 190, 0.95)'
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2)
        context.fill()
      })

      context.globalAlpha = 1
      animationRef.current = window.requestAnimationFrame(draw)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
    animationRef.current = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="light-cursor" aria-hidden="true" />
}

export default LightCursor
