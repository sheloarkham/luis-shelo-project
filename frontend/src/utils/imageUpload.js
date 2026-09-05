const MAX_WIDTH = 720
const JPEG_QUALITY = 0.82

export function readAndCompressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith('image/')) {
      reject(new Error('El archivo debe ser una imagen'))
      return
    }

    const reader = new FileReader()

    reader.onerror = () => reject(new Error('No se pudo leer la imagen'))

    reader.onload = () => {
      const img = new Image()

      img.onerror = () => reject(new Error('Imagen inválida'))

      img.onload = () => {
        const scale = Math.min(1, MAX_WIDTH / img.width)
        const width = Math.round(img.width * scale)
        const height = Math.round(img.height * scale)

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('No se pudo procesar la imagen'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
        const quality = mime === 'image/jpeg' ? JPEG_QUALITY : undefined
        resolve(canvas.toDataURL(mime, quality))
      }

      img.src = reader.result
    }

    reader.readAsDataURL(file)
  })
}
