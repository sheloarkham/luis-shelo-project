import { useCallback, useEffect, useMemo, useState } from 'react'
import './OcioCompletedArchive.css'

export const OCIO_LIST_UPDATED_EVENT = 'ocio-list-updated'

export const OCIO_COMPLETED_SOURCES = [
  {
    storageKey: 'anime-list',
    label: 'Anime',
    completedStatus: 'Completado',
    pendingStatus: 'Pendiente',
  },
  {
    storageKey: 'series-list',
    label: 'Series',
    completedStatus: 'Completado',
    pendingStatus: 'Pendiente',
  },
  {
    storageKey: 'games-list',
    label: 'Juegos',
    completedStatus: 'Completado',
    pendingStatus: 'Pendiente',
  },
  {
    storageKey: 'books-list',
    label: 'Libros',
    completedStatus: 'Leido',
    pendingStatus: 'Pendiente',
  },
]

export const loadCompletedItems = () =>
  OCIO_COMPLETED_SOURCES.flatMap((source) => {
    try {
      const saved = localStorage.getItem(source.storageKey)
      if (!saved) return []

      const items = JSON.parse(saved)
      return items
        .filter((item) => item.Estado === source.completedStatus)
        .map((item) => ({
          id: `${source.storageKey}:${item.title}`,
          title: item.title,
          category: source.label,
          storageKey: source.storageKey,
          pendingStatus: source.pendingStatus,
        }))
    } catch {
      return []
    }
  })

export const markOcioItemPending = (storageKey, title, pendingStatus) => {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return

    const items = JSON.parse(saved)
    const updated = items.map((item) =>
      item.title === title ? { ...item, Estado: pendingStatus } : item
    )

    localStorage.setItem(storageKey, JSON.stringify(updated))
    window.dispatchEvent(
      new CustomEvent(OCIO_LIST_UPDATED_EVENT, { detail: { storageKey } })
    )
  } catch {
    // ignore invalid storage
  }
}

const OcioCompletedArchive = () => {
  const [open, setOpen] = useState(false)
  const [completedItems, setCompletedItems] = useState(loadCompletedItems)

  const refreshCompleted = useCallback(() => {
    setCompletedItems(loadCompletedItems())
  }, [])

  useEffect(() => {
    refreshCompleted()
    window.addEventListener(OCIO_LIST_UPDATED_EVENT, refreshCompleted)
    return () => window.removeEventListener(OCIO_LIST_UPDATED_EVENT, refreshCompleted)
  }, [refreshCompleted])

  const groupedItems = useMemo(() => {
    const groups = {}

    completedItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })

    return groups
  }, [completedItems])

  const totalCompleted = completedItems.length

  if (totalCompleted === 0) {
    return null
  }

  return (
    <section className="ocio-completed-archive" aria-label="Completados de Ocio">
      <button
        type="button"
        className={`ocio-completed-dot${open ? ' ocio-completed-dot--open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Ocultar completados' : `Ver ${totalCompleted} completados`}
        title={open ? 'Ocultar completados' : `Ver ${totalCompleted} completados`}
      >
        <span className="ocio-completed-dot-core" />
        {totalCompleted > 0 && (
          <span className="ocio-completed-dot-count">{totalCompleted}</span>
        )}
      </button>

      {open && (
        <div className="ocio-completed-panel">
          <div className="ocio-completed-panel-header">
            <h3>Completados</h3>
            <span>{totalCompleted} en total</span>
          </div>

          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="ocio-completed-group">
              <p className="ocio-completed-group-title">{category}</p>
              <ul className="ocio-completed-list">
                {items.map((item) => (
                  <li key={item.id} className="ocio-completed-item">
                    <span className="ocio-completed-item-title">{item.title}</span>
                    <button
                      type="button"
                      className="ocio-completed-restore-btn"
                      onClick={() =>
                        markOcioItemPending(item.storageKey, item.title, item.pendingStatus)
                      }
                    >
                      Marcar pendiente
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default OcioCompletedArchive
