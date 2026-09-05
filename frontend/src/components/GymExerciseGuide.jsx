import { useEffect, useRef, useState } from 'react'
import { GYM_MUSCLE_GUIDE } from '../data/gymExerciseGuide'
import {
  GYM_GUIDE_IMAGES_STORAGE_KEY,
  getGymGuideImageKey,
  loadGymGuideImages,
  saveGymGuideImages,
} from '../utils/gymGuideImages'
import { readAndCompressImage } from '../utils/imageUpload'
import ScrollReveal from './ScrollReveal'
import { scrollRevealStagger } from '../utils/scrollRevealStagger'
import './GymExerciseGuide.css'

const GymExerciseImage = ({
  exerciseId,
  imageType,
  defaultSrc,
  label,
  alt,
  customImages,
  onImageSave,
  onImageRemove,
}) => {
  const storageKey = getGymGuideImageKey(exerciseId, imageType)
  const customSrc = customImages[storageKey]
  const fileInputRef = useRef(null)
  const menuRef = useRef(null)

  const [staticMissing, setStaticMissing] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploading, setUploading] = useState(false)

  const displaySrc = customSrc || (staticMissing ? null : defaultSrc)
  const hasImage = Boolean(displaySrc)

  useEffect(() => {
    setStaticMissing(false)
  }, [defaultSrc, customSrc])

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const openFilePicker = () => {
    setMenuOpen(false)
    setUploadError('')
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    setUploading(true)
    setUploadError('')

    try {
      const dataUrl = await readAndCompressImage(file)
      const saved = onImageSave(storageKey, dataUrl)
      if (!saved) {
        setUploadError('No se pudo guardar. Prueba con una imagen más pequeña.')
      }
    } catch (err) {
      setUploadError(err.message || 'Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setMenuOpen(false)
    onImageRemove(storageKey)
    setStaticMissing(false)
  }

  return (
    <figure className="gym-guide-image">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="gym-guide-image__file-input"
        onChange={handleFileChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="gym-guide-image__frame">
        {hasImage ? (
          <>
            <img
              src={displaySrc}
              alt={alt}
              loading="lazy"
              onError={() => {
                if (customSrc) {
                  onImageRemove(storageKey)
                } else {
                  setStaticMissing(true)
                }
              }}
            />
            <div className="gym-guide-image__menu-wrap" ref={menuRef}>
              <button
                type="button"
                className="gym-guide-image__menu-btn"
                aria-label={`Opciones de imagen: ${label}`}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                ···
              </button>
              {menuOpen && (
                <div className="gym-guide-image__menu" role="menu">
                  <button type="button" role="menuitem" onClick={openFilePicker}>
                    Cambiar imagen
                  </button>
                  {customSrc && (
                    <button type="button" role="menuitem" onClick={handleRemove}>
                      Eliminar imagen
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            type="button"
            className="gym-guide-image__placeholder"
            onClick={openFilePicker}
            disabled={uploading}
          >
            <span>{uploading ? 'Guardando…' : 'Agregar imagen'}</span>
          </button>
        )}
      </div>

      <figcaption>{label}</figcaption>
      {uploadError && <p className="gym-guide-image__error">{uploadError}</p>}
    </figure>
  )
}

const GymExerciseGuide = () => {
  const [customImages, setCustomImages] = useState(loadGymGuideImages)
  const [isLoaded, setIsLoaded] = useState(false)
  let revealIndex = 0

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    saveGymGuideImages(customImages)
  }, [customImages, isLoaded])

  const handleImageSave = (storageKey, dataUrl) => {
    let saved = false
    setCustomImages((prev) => {
      const next = { ...prev, [storageKey]: dataUrl }
      saved = saveGymGuideImages(next)
      return saved ? next : prev
    })
    return saved
  }

  const handleImageRemove = (storageKey) => {
    setCustomImages((prev) => {
      const next = { ...prev }
      delete next[storageKey]
      saveGymGuideImages(next)
      return next
    })
  }

  const handleResetAllImages = () => {
    if (window.confirm('¿Eliminar todas las imágenes personalizadas del gym?')) {
      localStorage.removeItem(GYM_GUIDE_IMAGES_STORAGE_KEY)
      setCustomImages({})
    }
  }

  const hasCustomImages = Object.keys(customImages).length > 0

  return (
    <section className="gym-guide" aria-label="Guía de ejercicios por grupo muscular">
      <ScrollReveal>
        <header className="gym-guide-header">
          <h2 className="gym-guide-title">Guía de ejercicios</h2>
          <p className="gym-guide-subtitle">
            Por categoría y grupo muscular — ejecución, músculo trabajado y para qué sirve
          </p>
          {hasCustomImages && (
            <button type="button" className="gym-guide-reset-images" onClick={handleResetAllImages}>
              Restaurar imágenes del gym
            </button>
          )}
        </header>
      </ScrollReveal>

      {GYM_MUSCLE_GUIDE.map((category) => (
        <section key={category.id} className="gym-guide-category">
          <ScrollReveal delay={scrollRevealStagger(revealIndex++, 0.06, 8)}>
            <h3 className="gym-guide-category-title">{category.category}</h3>
          </ScrollReveal>

          {category.subgroups.map((subgroup) => (
            <div key={subgroup.id} className="gym-guide-subgroup">
              <ScrollReveal delay={scrollRevealStagger(revealIndex++, 0.06, 8)}>
                <h4 className="gym-guide-subgroup-title">{subgroup.name}</h4>
              </ScrollReveal>

              <div className="gym-guide-exercises">
                {subgroup.exercises.map((item) => (
                  <ScrollReveal
                    key={item.id}
                    delay={scrollRevealStagger(revealIndex++, 0.05, 12)}
                    className="scroll-reveal--fill"
                  >
                    <article className="gym-guide-card">
                      <div className="gym-guide-card__media">
                        <GymExerciseImage
                          exerciseId={item.id}
                          imageType="execution"
                          defaultSrc={item.executionImage}
                          label="Ejecución"
                          alt={`Ejecución de ${item.name}`}
                          customImages={customImages}
                          onImageSave={handleImageSave}
                          onImageRemove={handleImageRemove}
                        />
                        <GymExerciseImage
                          exerciseId={item.id}
                          imageType="muscle"
                          defaultSrc={item.muscleImage}
                          label="Músculo"
                          alt={`Músculo trabajado en ${item.name}`}
                          customImages={customImages}
                          onImageSave={handleImageSave}
                          onImageRemove={handleImageRemove}
                        />
                      </div>

                      <div className="gym-guide-card__content">
                        <h5 className="gym-guide-card__name">{item.name}</h5>

                        <div className="gym-guide-card__block">
                          <span className="gym-guide-card__label">Para qué sirve</span>
                          <p>{item.purpose}</p>
                        </div>

                        <div className="gym-guide-card__block">
                          <span className="gym-guide-card__label">Cómo se ejecuta</span>
                          <p>{item.howTo}</p>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </section>
  )
}

export default GymExerciseGuide
