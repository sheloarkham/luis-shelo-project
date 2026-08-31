import './DissolveTransition.css'

const DissolveTransition = ({ phase }) => {
  if (!phase) return null

  return (
    <div className={`dissolve-transition dissolve-transition--${phase}`} aria-hidden="true">
      <svg className="dissolve-transition__defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="dissolve-noise-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="grain"
            />
            <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <div className="dissolve-transition__veil" />
      <div className="dissolve-transition__grain dissolve-transition__grain--1" />
      <div className="dissolve-transition__grain dissolve-transition__grain--2" />
      <div className="dissolve-transition__grain dissolve-transition__grain--3" />
      <div className="dissolve-transition__scan" />
    </div>
  )
}

export default DissolveTransition
