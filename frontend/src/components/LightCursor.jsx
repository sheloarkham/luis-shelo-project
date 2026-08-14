import { useEffect, useRef } from 'react'
import './LightCursor.css'

const GLOW_RADIUS = 210
const CORE_RADIUS = 7

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
    document.body.classList.add('light-cursor-active')

    const canvas = canvasRef.current
    if (!canvas) {
      return () => {
        document.body.classList.remove('light-cursor-active')
      }
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return () => {
        document.body.classList.remove('light-cursor-active')
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawnParticle = (x, y) => {
      stateRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: 1,
        size: Math.random() * 3.5 + 2,
      })

      if (stateRef.current.particles.length > 34) {
        stateRef.current.particles.shift()
      }
    }

    const onPointerMove = (event) => {
      const { clientX, clientY } = event
      stateRef.current.pointerX = clientX
      stateRef.current.pointerY = clientY
      stateRef.current.visible = true

      if (Math.random() > 0.5) {
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
          GLOW_RADIUS
        )
        glow.addColorStop(0, 'rgba(255, 248, 210, 0.5)')
        glow.addColorStop(0.35, 'rgba(196, 255, 170, 0.22)')
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)')

        context.fillStyle = glow
        context.beginPath()
        context.arc(state.glowX, state.glowY, GLOW_RADIUS, 0, Math.PI * 2)
        context.fill()

        context.fillStyle = 'rgba(255, 255, 230, 0.95)'
        context.beginPath()
        context.arc(state.glowX, state.glowY, CORE_RADIUS, 0, Math.PI * 2)
        context.fill()

        context.fillStyle = 'rgba(255, 255, 255, 0.9)'
        context.beginPath()
        context.arc(state.glowX, state.glowY, CORE_RADIUS * 0.35, 0, Math.PI * 2)
        context.fill()
      }

      state.particles = state.particles.filter((particle) => particle.life > 0.04)
      state.particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.026

        context.globalAlpha = particle.life * 0.8
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
      document.body.classList.remove('light-cursor-active')
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
