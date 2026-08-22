import { useEffect, useRef } from 'react'
import './LightCursor.css'

const TRAIL_FADE = 0.034
const DROPLET_SIZE = 16
const TRAIL_RADIUS = 36

const LightCursor = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const stateRef = useRef({
    pointerX: -200,
    pointerY: -200,
    lastX: -200,
    lastY: -200,
    lastStainX: -200,
    lastStainY: -200,
    velocityX: 0,
    velocityY: 0,
    liquidX: 0,
    liquidY: 0,
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

    const drawWetTrail = (x, y, radius, alpha = 0.1) => {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `rgba(220, 240, 255, ${alpha})`)
      gradient.addColorStop(0.45, `rgba(170, 210, 245, ${alpha * 0.55})`)
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      context.globalAlpha = 1
      context.fillStyle = gradient
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }

    const paintTrailSegment = (fromX, fromY, toX, toY) => {
      const distance = Math.hypot(toX - fromX, toY - fromY)
      const steps = Math.max(1, Math.ceil(distance / 5))

      for (let step = 0; step <= steps; step += 1) {
        const progress = step / steps
        const x = fromX + (toX - fromX) * progress
        const y = fromY + (toY - fromY) * progress
        const strength = Math.min(0.16, 0.06 + distance * 0.0015)
        drawWetTrail(x, y, TRAIL_RADIUS * (0.8 + distance / 180), strength)
      }
    }

    const drawRealWaterDrop = (x, y, liquidOffsetX, liquidOffsetY, time) => {
      const wobble = Math.sin(time * 0.006) * 1.2
      const shellRadius = DROPLET_SIZE + wobble * 0.4
      const innerX = liquidOffsetX + Math.sin(time * 0.0045) * 1.8
      const innerY = liquidOffsetY + Math.cos(time * 0.0055) * 1.5

      context.save()
      context.translate(x, y + 1)

      const shell = context.createRadialGradient(-3, -5, 1, 0, 0, shellRadius * 1.15)
      shell.addColorStop(0, 'rgba(255, 255, 255, 0.16)')
      shell.addColorStop(0.35, 'rgba(190, 225, 255, 0.2)')
      shell.addColorStop(0.72, 'rgba(120, 185, 235, 0.12)')
      shell.addColorStop(1, 'rgba(255, 255, 255, 0)')

      context.fillStyle = shell
      context.beginPath()
      context.ellipse(0, 0, shellRadius * 0.92, shellRadius * 1.05, 0, 0, Math.PI * 2)
      context.fill()

      context.save()
      context.beginPath()
      context.ellipse(0, 0, shellRadius * 0.88, shellRadius * 1.0, 0, 0, Math.PI * 2)
      context.clip()

      const liquid = context.createRadialGradient(innerX - 2, innerY - 3, 0, innerX, innerY, shellRadius * 0.72)
      liquid.addColorStop(0, 'rgba(235, 248, 255, 0.78)')
      liquid.addColorStop(0.38, 'rgba(150, 205, 245, 0.62)')
      liquid.addColorStop(0.72, 'rgba(90, 160, 220, 0.38)')
      liquid.addColorStop(1, 'rgba(255, 255, 255, 0)')

      context.fillStyle = liquid
      context.beginPath()
      context.ellipse(innerX, innerY + 1, shellRadius * 0.58, shellRadius * 0.66, 0.15, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = 'rgba(255, 255, 255, 0.35)'
      context.beginPath()
      context.arc(innerX + 3, innerY + 4, shellRadius * 0.18, 0, Math.PI * 2)
      context.fill()

      context.restore()

      context.strokeStyle = 'rgba(255, 255, 255, 0.4)'
      context.lineWidth = 1.1
      context.beginPath()
      context.ellipse(0, 0, shellRadius * 0.9, shellRadius * 1.02, 0, 0, Math.PI * 2)
      context.stroke()

      context.fillStyle = 'rgba(255, 255, 255, 0.85)'
      context.beginPath()
      context.ellipse(-4, -6, 3.2, 2.1, -0.7, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = 'rgba(255, 255, 255, 0.28)'
      context.beginPath()
      context.ellipse(5, 2, 1.6, 1.1, 0.4, 0, Math.PI * 2)
      context.fill()

      context.restore()
    }

    const onPointerMove = (event) => {
      const { clientX, clientY } = event
      const state = stateRef.current

      state.velocityX = clientX - state.lastX
      state.velocityY = clientY - state.lastY
      state.lastX = clientX
      state.lastY = clientY

      if (state.visible) {
        paintTrailSegment(state.lastStainX, state.lastStainY, clientX, clientY)
      }

      state.pointerX = clientX
      state.pointerY = clientY
      state.lastStainX = clientX
      state.lastStainY = clientY
      state.visible = true
    }

    const onPointerDown = (event) => {
      drawWetTrail(event.clientX, event.clientY, TRAIL_RADIUS * 1.2, 0.18)
    }

    const onPointerLeave = () => {
      stateRef.current.visible = false
    }

    const draw = (time) => {
      const state = stateRef.current

      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE})`
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.globalCompositeOperation = 'source-over'

      const targetLiquidX = -state.velocityX * 10
      const targetLiquidY = -state.velocityY * 10
      state.liquidX += (targetLiquidX - state.liquidX) * 0.14
      state.liquidY += (targetLiquidY - state.liquidY) * 0.14
      state.velocityX *= 0.9
      state.velocityY *= 0.9

      if (state.visible) {
        drawWetTrail(state.pointerX, state.pointerY, TRAIL_RADIUS * 0.55, 0.08)
        drawRealWaterDrop(state.pointerX, state.pointerY, state.liquidX, state.liquidY, time)
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
  }, [])

  return <canvas ref={canvasRef} className="light-cursor" aria-hidden="true" />
}

export default LightCursor
