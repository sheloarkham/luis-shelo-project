import '../pages/shared-page.css'

const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  hint,
  className = '',
  children,
}) => (
  <header className={`page-header${className ? ` ${className}` : ''}`}>
    {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
    {title && <h1 className="page-title">{title}</h1>}
    {subtitle && <p className="page-subtitle">{subtitle}</p>}
    {hint && <p className="page-hint">{hint}</p>}
    {children}
  </header>
)

export default PageHeader
