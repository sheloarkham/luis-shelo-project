import { useLocation } from 'react-router-dom'
import './PageEntrance.css'

/** Entrada suave al cambiar de ruta (mismo estilo que el título del intro del home). */
export default function PageEntrance({ children, disabled = false }) {
  const { pathname } = useLocation()

  if (disabled) {
    return children
  }

  return (
    <div key={pathname} className="page-entrance">
      {children}
    </div>
  )
}
