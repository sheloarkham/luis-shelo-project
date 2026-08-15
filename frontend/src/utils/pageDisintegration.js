const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const waitForPaint = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })

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

const parseRgb = (color) => {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (!match) return { r: 210, g: 228, b: 255 }
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) }
}

const createParticlesFromDOM = (element, chromeBottom) => {
  const particles = []
  const nodes = element.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, p, span, li, label, button, input, .MuiCard-root, .MuiTypography-root, .gym-day-card, .glass-pill, .gym-exercise-weight, .home-stat-card, .presupuestos-pill'
  )

  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect()
    if (rect.width < 4 || rect.height < 4) return
    if (rect.bottom < chromeBottom) return

    const { r, g, b } = parseRgb(window.getComputedStyle(node).color)
    const area = rect.width * rect.height
    const count = Math.min(36, Math.max(8, Math.floor(area / 900)))

    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: rect.left + Math.random() * rect.width,
        y: rect.top + Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 3.2,
        vy: -Math.random() * 2.8 - 0.5,
        drift: (Math.random() - 0.5) * 0.1,
        life: 1,
        decay: 0.008 + Math.random() * 0.014,
        size: 1.4 + Math.random() * 2.6,
        r,
        g,
        b,
        a: 0.65 + Math.random() * 0.35,
      })
    }
  })

  return particles
}

const createFallbackParticles = (targetRect, chromeBottom, count = 650) => {
  const particles = []

  for (let i = 0; i < count; i += 1) {
    const y = targetRect.top + Math.random() * targetRect.height
    if (y < chromeBottom) continue

    particles.push({
      x: targetRect.left + Math.random() * targetRect.width,
      y,
      vx: (Math.random() - 0.5) * 3.2,
      vy: -Math.random() * 2.8 - 0.5,
      drift: (Math.random() - 0.5) * 0.1,
      life: 1,
      decay: 0.008 + Math.random() * 0.014,
      size: 1.4 + Math.random() * 2.8,
      r: 180 + Math.random() * 60,
      g: 210 + Math.random() * 40,
      b: 255,
      a: 0.55 + Math.random() * 0.4,
    })
  }

  return particles
}

const createParticlesFromSnapshot = (snapshot, targetRect, chromeBottom) => {
  const width = snapshot.width
  const height = snapshot.height
  const context = snapshot.getContext('2d')
  if (!context) return []

  const imageData = context.getImageData(0, 0, width, height)
  const { data } = imageData
  const step = window.innerWidth < 768 ? 5 : 3
  const particles = []

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const index = (y * width + x) * 4
      const alpha = data[index + 3]
      if (alpha < 50) continue

      const screenX = targetRect.left + (x / width) * targetRect.width
      const screenY = targetRect.top + (y / height) * targetRect.height
      if (screenY < chromeBottom) continue

      particles.push({
        x: screenX,
        y: screenY,
        vx: (Math.random() - 0.5) * 3.2,
        vy: -Math.random() * 2.8 - 0.5,
        drift: (Math.random() - 0.5) * 0.1,
        life: 1,
        decay: 0.008 + Math.random() * 0.014,
        size: 1.4 + Math.random() * 2.6,
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
      const elapsed = now - start
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
        particle.vy -= 0.022
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= particle.decay

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

      if (elapsed < duration && alive > 0) {
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
  if (!element || !canvas) {
    return
  }

  await waitForPaint()

  const targetRect = element.getBoundingClientRect()
  if (targetRect.width < 1 || targetRect.height < 1) {
    return
  }

  const reducedMotion = prefersReducedMotion()
  const duration = reducedMotion ? 700 : 1200
  const chromeBottom = getChromeBottom()

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.zIndex = '1300'

  let snapshotParticles = []

  if (!reducedMotion) {
    try {
      const { default: html2canvas } = await import('html2canvas')
      const snapshot = await html2canvas(element, {
        backgroundColor: null,
        scale: window.innerWidth < 768 ? 0.75 : 1,
        logging: false,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
      })
      snapshotParticles = createParticlesFromSnapshot(snapshot, targetRect, chromeBottom)
    } catch (error) {
      console.error('html2canvas fallo, usando particulas DOM:', error)
    }
  }

  const domParticles = createParticlesFromDOM(element, chromeBottom)
  let particles = [...snapshotParticles, ...domParticles]

  if (particles.length < 120) {
    particles = [...particles, ...createFallbackParticles(targetRect, chromeBottom)]
  }

  element.classList.add('page-transition-shell--out')
  element.style.pointerEvents = 'none'

  await animateParticles(canvas, particles, duration, chromeBottom)

  element.classList.remove('page-transition-shell--out')
  element.style.pointerEvents = ''
  canvas.style.zIndex = '12'
}
