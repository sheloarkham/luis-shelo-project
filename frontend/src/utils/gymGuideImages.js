export const GYM_GUIDE_IMAGES_STORAGE_KEY = 'gym-guide-custom-images'

export const getGymGuideImageKey = (exerciseId, imageType) => `${exerciseId}:${imageType}`

export function loadGymGuideImages() {
  try {
    const saved = localStorage.getItem(GYM_GUIDE_IMAGES_STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch (err) {
    console.error('Error al cargar imágenes del gym:', err)
    return {}
  }
}

export function saveGymGuideImages(images) {
  try {
    localStorage.setItem(GYM_GUIDE_IMAGES_STORAGE_KEY, JSON.stringify(images))
    return true
  } catch (err) {
    console.error('Error al guardar imágenes del gym:', err)
    return false
  }
}
