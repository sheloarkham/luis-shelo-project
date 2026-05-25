export class Book {
  constructor({ id, title, rating, estado, author, year }) {
    this.id = id || null
    this.title = title
    this.rating = rating
    this.estado = estado
    this.author = author
    this.year = year
  }

  // Métodos de negocio
  isRead() {
    return this.estado === 'Leído'
  }

  isReading() {
    return this.estado === 'Leyendo'
  }

  isPending() {
    return this.estado === 'Pendiente'
  }

  getRatingStars() {
    return '★'.repeat(Math.min(this.rating, 5))
  }

  validate() {
    if (!this.title || this.title.trim() === '') {
      throw new Error('El título es requerido')
    }
    if (this.rating < 0 || this.rating > 5) {
      throw new Error('El rating debe estar entre 0 y 5')
    }
    const validEstados = ['Pendiente', 'Leyendo', 'Leído']
    if (!validEstados.includes(this.estado)) {
      throw new Error('Estado inválido')
    }
    return true
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      rating: this.rating,
      estado: this.estado,
      author: this.author,
      year: this.year
    }
  }
}
