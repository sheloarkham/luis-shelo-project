const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const getChromeBottom = () => {
  const navbar = document.querySelector('.MuiAppBar-root')
  const customizePanel = document.querySelector('.customize-panel')

  let bottom = 0
  if (navbar) {
    bottom = Math.max(bottom, navbar.getBoundingClientRect().bottom)
  }
  if (customizePanel) {
    bottom = Math.max(bottom, customizePanel.getBoundingClientRect().bottom)
  }

  return bottom
}

const createFallbackParticles = (targetRect, count = 420) => {
  const particles = []

  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: targetRect.left + Math.random() * targetRect.width,
      y: targetRect.top + Math.random() * targetRect.height,
      vx: (Math.random() - 0.5) * 2.8,
      vy: -Math.random() * 2.4 - 0.4,
      drift: (Math.random() - 0.5) * 0.08,
      life: 1,
      decay: 0.01 + Math.random() * 0.018,
      size: 1.2 + Math.random() * 2.2,
      r: 180 + Math.random() * 60,
      g: 210 + Math.random() * 40,
      b: 255,
      a: 0.55 + Math.random() * 0.35,
    })
  }

  return particles
}

const createParticlesFromSnapshot = (snapshot, targetRect) => {
  const width = snapshot.width
  const height = snapshot.height
  const context = snapshot.getContext('2d')
  if (!context) return []

  const imageData = context.getImageData(0, 0, width, height)
  const { data } = imageData
  const step = window.innerWidth < 768 ? 6 : 4
  const particles = []

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const index = (y * width + x) * 4
      const alpha = data[index + 3]
      if (alpha < 70) continue

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

const animateParticles = (canvas, particles, duration, chromeBottom) =>
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

      if (chromeBottom > 0) {
        context.save()
        context.beginPath()
        context.rect(0, chromeBottom, canvas.width, canvas.height - chromeBottom)
        context.clip()
      }

      let alive = 0
      particles.forEach((particle) => {
        if (particle.life <= 0) return
        alive += 1

        particle.vx += particle.drift
        particle.vy -= 0.018
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= particle.decay

        if (particle.y < chromeBottom) return

        context.globalAlpha = Math.max(0, particle.life) * particle.a
        context.fillStyle = `rgb(${particle.r}, ${particle.g}, ${particle.b})`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })

      if (chromeBottom > 0) {
        context.restore()
      }

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

  const chromeBottom = getChromeBottom()

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.zIndex = '1300'

  const { default: html2canvas } = await import('html2canvas')

  const snapshot = await html2canvas(element, {
    backgroundColor: null,
    scale: window.innerWidth < 768 ? 0.7 : 0.9,
    logging: false,
    useCORS: true,
    scrollX: 0,
    scrollY: -window.scrollY,
  })

  let particles = createParticlesFromSnapshot(snapshot, targetRect)
  if (particles.length < 80) {
    particles = createFallbackParticles(targetRect)
  }

  particles = particles.filter((particle) => particle.y >= chromeBottom - 4)

  element.classList.add('page-transition-shell--out')
  element.style.pointerEvents = 'none'

  await animateParticles(canvas, particles, 1100, chromeBottom)

  element.classList.remove('page-transition-shell--out')
  element.style.pointerEvents = ''
  canvas.style.zIndex = '12'
}
