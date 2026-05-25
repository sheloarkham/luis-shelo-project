export class Anime {
  constructor({ id, title, episodes, studio, year, image, Estado }) {
    this.id = id || null
    this.title = title
    this.episodes = episodes
    this.studio = studio
    this.year = year
    this.image = image
    this.Estado = Estado
  }

  // Reglas de negocio del dominio
  isCompleted() {
    return this.Estado === 'Completado'
  }

  isWatching() {
    return this.Estado === 'Viendo'
  }

  isPending() {
    return this.Estado === 'Pendiente'
  }

  validate() {
    if (!this.title || this.title.trim() === '') {
      throw new Error('El título es requerido')
    }
    if (!this.Estado || !['Completado', 'Viendo', 'Pendiente'].includes(this.Estado)) {
      throw new Error('Estado inválido')
    }
    if (!this.episodes || this.episodes < 1) {
      throw new Error('El número de episodios debe ser mayor a 0')
    }
    return true
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      episodes: this.episodes,
      studio: this.studio,
      year: this.year,
      image: this.image,
      Estado: this.Estado
    }
  }
}
