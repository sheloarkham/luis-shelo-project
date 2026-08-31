import './ShadowFoldTransition.css'

const ShadowFoldTransition = ({ phase }) => {
  if (!phase) return null

  return (
    <div className={`shadow-fold shadow-fold--${phase}`} aria-hidden="true">
      <div className="shadow-fold__vignette" />
      <div className="shadow-fold__smoke shadow-fold__smoke--1" />
      <div className="shadow-fold__smoke shadow-fold__smoke--2" />
      <div className="shadow-fold__smoke shadow-fold__smoke--3" />
      <div className="shadow-fold__core" />
      <div className="shadow-fold__fold-line shadow-fold__fold-line--left" />
      <div className="shadow-fold__fold-line shadow-fold__fold-line--right" />
    </div>
  )
}

export default ShadowFoldTransition
