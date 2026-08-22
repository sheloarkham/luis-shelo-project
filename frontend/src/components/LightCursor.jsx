import { useEffect, useRef } from 'react'
import { useThemeCustomization } from '../context/ThemeContext'
import { getCursorTheme } from '../constants/cursorThemes'
import './LightCursor.css'

const DROPLET_RADIUS = 11
const MAX_RIPPLES = 18

const LightCursor = () => {
  const { cursorThemeRef } = useThemeCustomization()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const stateRef = useRef({
    pointerX: -200,
    pointerY: -200,
    dropletX: -200,
    dropletY: -200,
    visible: false,
    ripples: [],
    splashes: [],
    lastRippleAt: 0,
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

    const addRipple = (x, y, strength = 1) => {
      stateRef.current.ripples.push({
        x,
        y,
        radius: 6,
        maxRadius: 28 + strength * 22 + Math.random() * 16,
        opacity: 0.55 * strength,
        lineWidth: 1.4 + strength * 0.6,
      })

      if (stateRef.current.ripples.length > MAX_RIPPLES) {
        stateRef.current.ripples.shift()
      }
    }

    const addSplash = (x, y) => {
      stateRef.current.splashes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4 - 0.4,
        life: 1,
        size: Math.random() * 2.8 + 1.6,
      })

      if (stateRef.current.splashes.length > 14) {
        stateRef.current.splashes.shift()
      }
    }

    const onPointerMove = (event) => {
      const { clientX, clientY } = event
      const state = stateRef.current
      const dx = clientX - state.pointerX
      const dy = clientY - state.pointerY
      const speed = Math.hypot(dx, dy)
      const now = performance.now()

      state.pointerX = clientX
      state.pointerY = clientY
      state.visible = true

      if (now - state.lastRippleAt > 70 || speed > 8) {
        const strength = Math.min(1.4, 0.35 + speed * 0.04)
        addRipple(clientX, clientY, strength)
        state.lastRippleAt = now

        if (speed > 6 && Math.random() > 0.55) {
          addSplash(clientX, clientY)
        }
      }
    }

    const onPointerDown = (event) => {
      const { clientX, clientY } = event
      addRipple(clientX, clientY, 1.5)
      addRipple(clientX, clientY, 1.1)
      for (let i = 0; i < 4; i += 1) {
        addSplash(clientX, clientY)
      }
    }

    const onPointerLeave = () => {
      stateRef.current.visible = false
    }

    const drawDroplet = (theme, x, y) => {
      const body = context.createRadialGradient(
        x - 3,
        y - 4,
        1,
        x,
        y,
        DROPLET_RADIUS
      )
      body.addColorStop(0, theme.dropletCore)
      body.addColorStop(0.55, theme.dropletEdge)
      body.addColorStop(1, 'rgba(255, 255, 255, 0)')

      context.fillStyle = body
      context.beginPath()
      context.ellipse(x, y + 1, DROPLET_RADIUS, DROPLET_RADIUS * 0.92, 0, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = 'rgba(255, 255, 255, 0.55)'
      context.beginPath()
      context.ellipse(x - 3, y - 4, 2.6, 1.8, -0.6, 0, Math.PI * 2)
      context.fill()
    }

    const draw = () => {
      const theme = getCursorTheme(cursorThemeRef.current)
      const state = stateRef.current

      state.dropletX += (state.pointerX - state.dropletX) * 0.18
      state.dropletY += (state.pointerY - state.dropletY) * 0.18

      context.clearRect(0, 0, canvas.width, canvas.height)

      state.ripples = state.ripples.filter((ripple) => ripple.opacity > 0.03)
      state.ripples.forEach((ripple) => {
        ripple.radius += 1.15
        ripple.opacity -= 0.018

        const progress = ripple.radius / ripple.maxRadius
        if (progress >= 1) return

        context.globalAlpha = ripple.opacity * (1 - progress)
        context.strokeStyle = theme.rippleStroke
        context.lineWidth = ripple.lineWidth * (1 - progress * 0.6)
        context.beginPath()
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        context.stroke()

        const glow = context.createRadialGradient(
          ripple.x,
          ripple.y,
          ripple.radius * 0.65,
          ripple.x,
          ripple.y,
          ripple.radius
        )
        glow.addColorStop(0, 'rgba(255, 255, 255, 0)')
        glow.addColorStop(1, theme.rippleGlow)
        context.fillStyle = glow
        context.beginPath()
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        context.fill()
      })

      state.splashes = state.splashes.filter((splash) => splash.life > 0.05)
      state.splashes.forEach((splash) => {
        splash.x += splash.vx
        splash.y += splash.vy
        splash.vy += 0.02
        splash.life -= 0.028

        context.globalAlpha = splash.life * 0.75
        context.fillStyle = theme.splash
        context.beginPath()
        context.ellipse(
          splash.x,
          splash.y,
          splash.size * splash.life,
          splash.size * splash.life * 0.75,
          0,
          0,
          Math.PI * 2
        )
        context.fill()
      })

      if (state.visible) {
        drawDroplet(theme, state.dropletX, state.dropletY)
      }

      context.globalAlpha = 1
      animationRef.current = window.requestAnimationFrame(draw)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerleave', onPointerLeave)
    animationRef.current = window.requestAnimationFrame(draw)

    return () => {
      document.body.classList.remove('light-cursor-active')
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerleave', onPointerLeave)
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current)
      }
    }
  }, [cursorThemeRef])

  return <canvas ref={canvasRef} className="light-cursor" aria-hidden="true" />
}

export default LightCursor
