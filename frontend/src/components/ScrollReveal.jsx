import { useEffect, useRef, useState } from 'react'
import './ScrollReveal.css'

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  disabled = false,
}) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(disabled)

  useEffect(() => {
    if (disabled) {
      setVisible(true)
      return undefined
    }

    setVisible(false)
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [disabled])

  return (
    <div
      ref={ref}
      className={[
        'scroll-reveal',
        `scroll-reveal--${direction}`,
        visible ? 'scroll-reveal--visible' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{ '--reveal-delay': `${delay}s` }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
