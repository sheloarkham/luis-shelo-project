import { forwardRef } from 'react'
import './PageDisintegration.css'

const PageDisintegration = forwardRef(function PageDisintegration(_props, ref) {
  return (
    <canvas
      ref={ref}
      className="page-disintegration-canvas"
      aria-hidden="true"
    />
  )
})

export default PageDisintegration
