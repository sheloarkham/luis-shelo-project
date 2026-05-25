import { IBooksRepository } from '../../domain/repositories/IBooksRepository.js'
import { Book } from '../../domain/entities/Book.js'

export class InMemoryBooksRepository extends IBooksRepository {
  constructor() {
    super()
    this.books = [
      { id: 1, title: "El Hombre Invisible", rating: 5, estado: "Leído", author: "H. G. Wells", year: 1897 },
      { id: 2, title: "La Amortajada", rating: 4, estado: "Leído", author: "María Luisa Bombal", year: 1938 },
      { id: 3, title: "Cartas a Lucilio", rating: 5, estado: "Pendiente", author: "Séneca", year: 65 },
      { id: 4, title: "Maus", rating: 5, estado: "Pendiente", author: "Art Spiegelman", year: 1991 },
      { id: 5, title: "El Aleph", rating: 5, estado: "Pendiente", author: "Jorge Luis Borges", year: 1949 },
      { id: 6, title: "Persépolis", rating: 5, estado: "Pendiente", author: "Marjane Satrapi", year: 2000 },
      { id: 7, title: "No tengo boca y debo gritar", rating: 4, estado: "Pendiente", author: "Harlan Ellison", year: 1967 },
      { id: 8, title: "Percy Jackson y el ladrón del rayo", rating: 4, estado: "Leído", author: "Rick Riordan", year: 2005 },
      { id: 9, title: "Rebelión en la granja", rating: 5, estado: "Leído", author: "George Orwell", year: 1945 },
      { id: 10, title: "Mapas de Significado", rating: 4, estado: "Pendiente", author: "Jordan B. Peterson", year: 1999 },
      { id: 11, title: "From Hell", rating: 5, estado: "Pendiente", author: "Alan Moore", year: 1989 },
      { id: 12, title: "12 Reglas para vivir", rating: 5, estado: "Leído", author: "Jordan B. Peterson", year: 2018 },
      { id: 13, title: "El Psicoanalista", rating: 4, estado: "Leído", author: "John Katzenbach", year: 2002 },
      { id: 14, title: "1984", rating: 5, estado: "Leído", author: "George Orwell", year: 1949 },
      { id: 15, title: "Black Paradox", rating: 4, estado: "Leído", author: "Junji Ito", year: 2009 },
      { id: 16, title: "El Túnel", rating: 5, estado: "Leído", author: "Ernesto Sabato", year: 1948 }
    ]
    this.nextId = 17
  }

  async getAll() {
    return this.books.map(b => new Book(b))
  }

  async getById(id) {
    const book = this.books.find(b => b.id === parseInt(id))
    return book ? new Book(book) : null
  }

  async save(book) {
    const newBook = {
      ...book.toJSON(),
      id: this.nextId++
    }
    this.books.push(newBook)
    return new Book(newBook)
  }

  async update(id, book) {
    const index = this.books.findIndex(b => b.id === parseInt(id))
    if (index === -1) return null

    this.books[index] = { ...book.toJSON(), id: parseInt(id) }
    return new Book(this.books[index])
  }

  async delete(id) {
    const index = this.books.findIndex(b => b.id === parseInt(id))
    if (index === -1) return false

    this.books.splice(index, 1)
    return true
  }
}
