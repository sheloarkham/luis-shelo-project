import { useEffect, useRef, useState } from 'react'
import './LazyRevealImage.css'

const LazyRevealImage = ({ src, alt, className = '', height = 350 }) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px 80px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={['lazy-reveal-image', loaded ? 'lazy-reveal-image--loaded' : '', className].filter(Boolean).join(' ')}
      style={{ '--lazy-image-height': `${height}px` }}
    >
      <div className="lazy-reveal-image__shimmer" aria-hidden="true" />
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="lazy-reveal-image__img"
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

export default LazyRevealImage
