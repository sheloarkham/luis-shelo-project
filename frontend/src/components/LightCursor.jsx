import { useEffect, useRef } from 'react'
import { useThemeCustomization } from '../context/ThemeContext'
import { getCursorTheme } from '../constants/cursorThemes'
import './LightCursor.css'

const DROPLET_RADIUS = 8
const STAIN_RADIUS = 42
const TRAIL_FADE = 0.038

const LightCursor = () => {
  const { cursorThemeRef } = useThemeCustomization()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const stateRef = useRef({
    pointerX: -200,
    pointerY: -200,
    lastStainX: -200,
    lastStainY: -200,
    visible: false,
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

    const drawWaterStain = (theme, x, y, radius, strength = 1) => {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, theme.trailCenter)
      gradient.addColorStop(0.42, theme.trailMid)
      gradient.addColorStop(1, theme.trailEdge)

      context.globalAlpha = 0.18 + strength * 0.14
      context.fillStyle = gradient
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }

    const drawDroplet = (theme, x, y) => {
      const body = context.createRadialGradient(x - 2, y - 3, 0, x, y, DROPLET_RADIUS)
      body.addColorStop(0, theme.dropletCore)
      body.addColorStop(0.65, theme.dropletEdge)
      body.addColorStop(1, 'rgba(255, 255, 255, 0)')

      context.globalAlpha = 0.95
      context.fillStyle = body
      context.beginPath()
      context.arc(x, y, DROPLET_RADIUS, 0, Math.PI * 2)
      context.fill()

      context.globalAlpha = 0.7
      context.fillStyle = 'rgba(255, 255, 255, 0.75)'
      context.beginPath()
      context.ellipse(x - 2.5, y - 3.5, 2.2, 1.5, -0.5, 0, Math.PI * 2)
      context.fill()
    }

    const paintTrailSegment = (theme, fromX, fromY, toX, toY) => {
      const distance = Math.hypot(toX - fromX, toY - fromY)
      const steps = Math.max(1, Math.ceil(distance / 6))

      for (let step = 0; step <= steps; step += 1) {
        const progress = step / steps
        const x = fromX + (toX - fromX) * progress
        const y = fromY + (toY - fromY) * progress
        const sizeBoost = 0.85 + (distance / 120) * 0.35
        drawWaterStain(theme, x, y, STAIN_RADIUS * sizeBoost, Math.min(1.2, 0.5 + distance * 0.015))
      }
    }

    const onPointerMove = (event) => {
      const { clientX, clientY } = event
      const state = stateRef.current
      const theme = getCursorTheme(cursorThemeRef.current)

      if (state.visible) {
        paintTrailSegment(theme, state.lastStainX, state.lastStainY, clientX, clientY)
      }

      state.pointerX = clientX
      state.pointerY = clientY
      state.lastStainX = clientX
      state.lastStainY = clientY
      state.visible = true
    }

    const onPointerDown = (event) => {
      const theme = getCursorTheme(cursorThemeRef.current)
      drawWaterStain(theme, event.clientX, event.clientY, STAIN_RADIUS * 1.35, 1.3)
    }

    const onPointerLeave = () => {
      stateRef.current.visible = false
    }

    const draw = () => {
      const theme = getCursorTheme(cursorThemeRef.current)
      const state = stateRef.current

      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE})`
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.globalCompositeOperation = 'source-over'

      if (state.visible) {
        drawWaterStain(theme, state.pointerX, state.pointerY, STAIN_RADIUS * 0.72, 0.75)
        drawDroplet(theme, state.pointerX, state.pointerY)
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
