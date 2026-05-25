export class Game {
  constructor({ id, title, rating, estado, platform, year }) {
    this.id = id || null
    this.title = title
    this.rating = rating
    this.estado = estado
    this.platform = platform
    this.year = year
  }

  validate() {
    if (!this.title || this.title.trim() === '') {
      throw new Error('El título es requerido')
    }
    if (this.rating < 0 || this.rating > 5) {
      throw new Error('El rating debe estar entre 0 y 5')
    }
    return true
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      rating: this.rating,
      estado: this.estado,
      platform: this.platform,
      year: this.year
    }
  }
}
