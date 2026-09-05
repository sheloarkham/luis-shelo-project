import { useState, useEffect } from 'react'
import { OCIO_LIST_UPDATED_EVENT } from '../components/OcioCompletedArchive'
import { useOcioListSync } from './useOcioListSync'

export function useLocalList({
  storageKey,
  initialData,
  version,
  loadItems,
  onSync,
}) {
  const defaultLoad = () => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (!saved) {
        if (version != null) {
          localStorage.setItem(`${storageKey}-version`, String(version))
        }
        return initialData
      }
      return JSON.parse(saved)
    } catch {
      return initialData
    }
  }

  const load = loadItems ?? defaultLoad

  const [items, setItems] = useState(load)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setItems(load())
    setIsLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once on mount
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    localStorage.setItem(storageKey, JSON.stringify(items))
    if (version != null) {
      localStorage.setItem(`${storageKey}-version`, String(version))
    }
    window.dispatchEvent(
      new CustomEvent(OCIO_LIST_UPDATED_EVENT, { detail: { storageKey } })
    )
  }, [items, isLoaded, storageKey, version])

  useOcioListSync(storageKey, onSync ?? (() => setItems(load())))

  const updateStatus = (title, newStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.title === title ? { ...item, Estado: newStatus } : item))
    )
  }

  const deleteItem = (title) => {
    setItems((prev) => prev.filter((item) => item.title !== title))
  }

  return { items, updateStatus, deleteItem }
}
