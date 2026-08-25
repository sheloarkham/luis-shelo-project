import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useThemeCustomization } from '../context/ThemeContext'
import { getCursorTheme, YENI_HEART_CURSOR } from '../constants/cursorThemes'
import './LightCursor.css'

const CORE_RADIUS = 5
const CORE_INNER_RADIUS = 2
const HEART_SIZE = 16
const YENI_TRAIL_MAX = 52
const drawHeartPath = (context) => {
  context.beginPath()
  context.moveTo(0, 4)
  context.bezierCurveTo(0, -4, -10, -4, -10, 3)
  context.bezierCurveTo(-10, 9, 0, 14, 0, 18)
  context.bezierCurveTo(0, 14, 10, 9, 10, 3)
  context.bezierCurveTo(10, -4, 0, -4, 0, 4)
  context.closePath()
}

const drawHeart = (context, x, y, size, fillStyle, alpha = 1) => {
  context.save()
  context.translate(x, y)
  context.scale(size / 20, size / 20)
  context.globalAlpha = alpha
  context.fillStyle = fillStyle
  drawHeartPath(context)
  context.fill()
  context.restore()
}

const LightCursor = () => {
  const { pathname } = useLocation()
  const isYeniPage = pathname === '/yeni'
  const { cursorThemeRef } = useThemeCustomization()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const isYeniRef = useRef(isYeniPage)
  const stateRef = useRef({
    pointerX: -200,
    pointerY: -200,
    glowX: -200,
    glowY: -200,
    visible: false,
    particles: [],
  })

  isYeniRef.current = isYeniPage

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

    const spawnParticle = (x, y, heartMode) => {
      stateRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * (heartMode ? 0.5 : 0.8),
        vy: (Math.random() - 0.5) * (heartMode ? 0.5 : 0.8) + (heartMode ? 0.35 : 0),
        life: 1,
        size: heartMode ? Math.random() * 5 + 4 : Math.random() * 2.5 + 1.5,
        rotation: heartMode ? (Math.random() - 0.5) * 0.6 : 0,
        heart: heartMode,
      })

      const maxParticles = heartMode ? YENI_TRAIL_MAX : 34
      if (stateRef.current.particles.length > maxParticles) {
        stateRef.current.particles.shift()
      }
    }

    const onPointerMove = (event) => {
      const { clientX, clientY } = event
      stateRef.current.pointerX = clientX
      stateRef.current.pointerY = clientY
      stateRef.current.visible = true

      const heartMode = isYeniRef.current
      const spawnChance = heartMode ? 0.82 : 0.72
      if (Math.random() < spawnChance) {
        spawnParticle(clientX, clientY, heartMode)
      }
    }

    const onPointerLeave = () => {
      stateRef.current.visible = false
    }

    const drawLightCursor = (theme, state) => {
      context.fillStyle = theme.core
      context.beginPath()
      context.arc(state.glowX, state.glowY, CORE_RADIUS, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = theme.coreInner
      context.beginPath()
      context.arc(state.glowX, state.glowY, CORE_INNER_RADIUS, 0, Math.PI * 2)
      context.fill()
    }

    const drawHeartCursor = (theme, state) => {
      context.shadowBlur = 0
      context.shadowColor = 'transparent'
      drawHeart(context, state.glowX, state.glowY, HEART_SIZE, theme.core, 1)

      context.fillStyle = theme.coreInner
      context.beginPath()
      context.arc(state.glowX, state.glowY - 1, 1.6, 0, Math.PI * 2)
      context.fill()
    }
    const draw = () => {
      const heartMode = isYeniRef.current
      const theme = heartMode ? YENI_HEART_CURSOR : getCursorTheme(cursorThemeRef.current)
      const state = stateRef.current
      const followSpeed = heartMode ? 0.2 : 0.14
      state.glowX += (state.pointerX - state.glowX) * followSpeed
      state.glowY += (state.pointerY - state.glowY) * followSpeed

      context.clearRect(0, 0, canvas.width, canvas.height)

      const fadeRate = heartMode ? 0.018 : 0.026
      state.particles = state.particles.filter((particle) => particle.life > 0.04)
      state.particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= fadeRate

        context.globalAlpha = particle.life * (heartMode ? 0.92 : 0.8)

        if (particle.heart) {
          context.shadowBlur = 0
          context.save()
          context.translate(particle.x, particle.y)
          context.rotate(particle.rotation)
          drawHeart(
            context,
            0,
            0,
            particle.size * particle.life,
            theme.particle,
            1
          )
          context.restore()
        } else {
          context.fillStyle = theme.particle
          context.beginPath()
          context.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2)
          context.fill()
        }
      })

      context.globalAlpha = 1

      if (state.visible) {
        if (heartMode) {
          drawHeartCursor(theme, state)
        } else {
          drawLightCursor(theme, state)
        }
      }
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
  }, [cursorThemeRef, isYeniPage])

  return (
    <canvas
      ref={canvasRef}
      className={`light-cursor${isYeniPage ? ' light-cursor--heart' : ''}`}
      aria-hidden="true"
    />
  )
}

export default LightCursor
