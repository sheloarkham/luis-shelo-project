import './MistPageTransition.css'

const MistPageTransition = ({ phase }) => {
  if (!phase) return null

  const { stage, direction } = phase

  return (
    <div
      className={[
        'mist-transition',
        `mist-transition--${stage}`,
        `mist-transition--${direction}`,
      ].join(' ')}
      aria-hidden="true"
    >
      <div className="mist-transition__backdrop" />
      <div className="mist-transition__fog mist-transition__fog--1" />
      <div className="mist-transition__fog mist-transition__fog--2" />
      <div className="mist-transition__fog mist-transition__fog--3" />
      <div className="mist-transition__wisp mist-transition__wisp--1" />
      <div className="mist-transition__wisp mist-transition__wisp--2" />
      <div className="mist-transition__wisp mist-transition__wisp--3" />
      <div className="mist-transition__wisp mist-transition__wisp--4" />
      <div className="mist-transition__wisp mist-transition__wisp--5" />
      <div className="mist-transition__sweep" />
      <div className="mist-transition__sweep-edge" />
      <div className="mist-transition__grain" />
      <div className="mist-transition__vignette" />
    </div>
  )
}

export default MistPageTransition
