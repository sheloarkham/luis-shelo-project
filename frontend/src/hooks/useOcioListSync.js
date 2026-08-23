import { useEffect } from 'react'
import { OCIO_LIST_UPDATED_EVENT } from './OcioCompletedArchive'

export const useOcioListSync = (storageKey, setItems) => {
  useEffect(() => {
    const handleUpdate = (event) => {
      if (event.detail?.storageKey !== storageKey) return

      try {
        const saved = localStorage.getItem(storageKey)
        if (saved) {
          setItems(JSON.parse(saved))
        }
      } catch {
        // ignore invalid storage
      }
    }

    window.addEventListener(OCIO_LIST_UPDATED_EVENT, handleUpdate)
    return () => window.removeEventListener(OCIO_LIST_UPDATED_EVENT, handleUpdate)
  }, [storageKey, setItems])
}

export const isOcioCompletedStatus = (estado) =>
  estado === 'Completado' || estado === 'Leido'
