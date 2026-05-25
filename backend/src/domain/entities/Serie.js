export class Serie {
  constructor({ id, title, rating, estado, temporadas, year }) {
    this.id = id || null
    this.title = title
    this.rating = rating
    this.estado = estado
    this.temporadas = temporadas
    this.year = year
  }

  // Reglas de negocio del dominio
  isCompleted() {
    return this.estado === 'Completada'
  }

  isWatching() {
    return this.estado === 'Viendo'
  }

  isPending() {
    return this.estado === 'Pendiente'
  }

  getRatingStars() {
    return this.rating ? '★'.repeat(Math.min(this.rating, 5)) : '☆☆☆☆☆'
  }

  validate() {
    if (!this.title || this.title.trim() === '') {
      throw new Error('El título es requerido')
    }
    if (this.rating < 0 || this.rating > 5) {
      throw new Error('El rating debe estar entre 0 y 5')
    }
    if (!['Completada', 'Viendo', 'Pendiente'].includes(this.estado)) {
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
      temporadas: this.temporadas,
      year: this.year
    }
  }
}
