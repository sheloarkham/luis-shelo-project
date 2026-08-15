const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const createParticlesFromSnapshot = (snapshot, targetRect) => {
  const width = snapshot.width
  const height = snapshot.height
  const context = snapshot.getContext('2d')
  if (!context) return []

  const imageData = context.getImageData(0, 0, width, height)
  const { data } = imageData
  const step = window.innerWidth < 768 ? 7 : 5
  const particles = []

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const index = (y * width + x) * 4
      const alpha = data[index + 3]
      if (alpha < 90) continue

      particles.push({
        x: targetRect.left + (x / width) * targetRect.width,
        y: targetRect.top + (y / height) * targetRect.height,
        vx: (Math.random() - 0.5) * 2.8,
        vy: -Math.random() * 2.4 - 0.4,
        drift: (Math.random() - 0.5) * 0.08,
        life: 1,
        decay: 0.01 + Math.random() * 0.018,
        size: 1.2 + Math.random() * 2.2,
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: alpha / 255,
      })
    }
  }

  return particles
}

const animateParticles = (canvas, particles, duration) =>
  new Promise((resolve) => {
    const context = canvas.getContext('2d')
    if (!context) {
      resolve()
      return
    }

    canvas.style.opacity = '1'
    const start = performance.now()

    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      context.clearRect(0, 0, canvas.width, canvas.height)

      let alive = 0
      particles.forEach((particle) => {
        if (particle.life <= 0) return
        alive += 1

        particle.vx += particle.drift
        particle.vy -= 0.018
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= particle.decay

        context.globalAlpha = Math.max(0, particle.life) * particle.a
        context.fillStyle = `rgb(${particle.r}, ${particle.g}, ${particle.b})`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })

      context.globalAlpha = 1

      if (progress < 1 && alive > 0) {
        requestAnimationFrame(frame)
      } else {
        context.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.opacity = '0'
        resolve()
      }
    }

    requestAnimationFrame(frame)
  })

export async function runPageDisintegration(element, canvas) {
  if (!element || !canvas || prefersReducedMotion()) {
    return
  }

  const targetRect = element.getBoundingClientRect()
  if (targetRect.width < 1 || targetRect.height < 1) {
    return
  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const { default: html2canvas } = await import('html2canvas')

  const snapshot = await html2canvas(element, {
    backgroundColor: null,
    scale: window.innerWidth < 768 ? 0.65 : 0.85,
    logging: false,
    useCORS: true,
  })

  const particles = createParticlesFromSnapshot(snapshot, targetRect)
  element.style.opacity = '0'
  element.style.pointerEvents = 'none'

  await animateParticles(canvas, particles, 1050)

  element.style.opacity = ''
  element.style.pointerEvents = ''
}
