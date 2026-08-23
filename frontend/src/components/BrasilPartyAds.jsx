import { useCallback, useState } from 'react'
import './BrasilPartyAds.css'

const DOG_SRC = '/images/brasil/perro-bailando.png'

const PARTY_ADS = [
  {
    id: 'samba-vip',
    side: 'left',
    top: '14%',
    label: '¡OFERTA SAMBA!',
    subtitle: 'Solo hoy en Río',
    rotate: '-4deg',
    delay: 0,
  },
  {
    id: 'perro-dj',
    side: 'right',
    top: '38%',
    label: 'PERRO DJ VIP',
    subtitle: 'Entrada GRATIS*',
    rotate: '5deg',
    delay: 0.35,
  },
  {
    id: 'carnaval',
    side: 'left',
    top: '68%',
    label: 'CARNAVAL 2026',
    subtitle: '¡No te lo pierdas!',
    rotate: '-6deg',
    delay: 0.7,
  },
]

const BrasilPartyAds = ({ active }) => {
  const [dismissed, setDismissed] = useState({})
  const [taunting, setTaunting] = useState({})

  const handleClose = useCallback((id) => {
    setDismissed((prev) => ({ ...prev, [id]: true }))
    window.setTimeout(() => {
      setDismissed((prev) => ({ ...prev, [id]: false }))
      setTaunting((prev) => ({ ...prev, [id]: true }))
      window.setTimeout(() => {
        setTaunting((prev) => ({ ...prev, [id]: false }))
      }, 900)
    }, 450)
  }, [])

  if (!active) return null

  return (
    <div className="yeni-brasil-party-ads" aria-hidden="true">
      {PARTY_ADS.map((ad) => {
        const isHidden = dismissed[ad.id]
        const isTaunting = taunting[ad.id]

        return (
          <div
            key={ad.id}
            className={[
              'yeni-party-ad',
              `yeni-party-ad--${ad.side}`,
              isHidden ? 'yeni-party-ad--closing' : '',
              isTaunting ? 'yeni-party-ad--taunt' : '',
            ].filter(Boolean).join(' ')}
            style={{
              top: ad.top,
              '--ad-rotate': ad.rotate,
              '--ad-delay': `${ad.delay}s`,
            }}
          >
            <div className="yeni-party-ad__bar">
              <span className="yeni-party-ad__label">{ad.label}</span>
              <button
                type="button"
                className="yeni-party-ad__close"
                onClick={() => handleClose(ad.id)}
                aria-label="Cerrar anuncio"
              >
                ×
              </button>
            </div>
            <p className="yeni-party-ad__subtitle">{ad.subtitle}</p>
            <div className="yeni-party-ad__media">
              <img src={DOG_SRC} alt="" className="yeni-party-ad__dog" draggable="false" />
            </div>
            <span className="yeni-party-ad__badge">HOT</span>
          </div>
        )
      })}
    </div>
  )
}

export default BrasilPartyAds
