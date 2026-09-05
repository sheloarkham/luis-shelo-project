import '../styles/futuristicPage.css'

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  hint,
  stats,
  progressPct,
  progressLabel = 'del roadmap',
  compact = false,
  className = '',
  children,
}) => (
  <header className={`neo-hero${compact ? ' neo-hero--compact' : ''}${className ? ` ${className}` : ''}`}>
    {eyebrow && <p className="neo-hero__eyebrow">{eyebrow}</p>}
    {title && <h1 className="neo-hero__title">{title}</h1>}
    {subtitle && <p className="neo-hero__subtitle">{subtitle}</p>}
    {hint && <p className="neo-hero__hint">{hint}</p>}

    {stats?.length > 0 && (
      <div className="neo-hero__stats">
        {stats.map((stat) => (
          <div key={stat.label} className="neo-stat">
            <span className="neo-stat__value">{stat.value}</span>
            <span className="neo-stat__label">{stat.label}</span>
          </div>
        ))}
      </div>
    )}

    {progressPct != null && (
      <div className="neo-progress" aria-label={`Progreso ${progressPct}%`}>
        <div className="neo-progress__track">
          <div className="neo-progress__fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="neo-progress__label">
          {progressPct}% {progressLabel}
        </span>
      </div>
    )}

    {children}
  </header>
)

export default PageHero
