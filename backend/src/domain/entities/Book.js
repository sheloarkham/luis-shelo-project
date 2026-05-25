export class Book {
  constructor({ id, title, rating, author, year }) {
    this.id = id || null
    this.title = title
    this.rating = rating
    this.author = author
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
      author: this.author,
      year: this.year
    }
  }
}
