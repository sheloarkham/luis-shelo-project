import { ISeriesRepository } from '../../domain/repositories/ISeriesRepository.js'
import { Serie } from '../../domain/entities/Serie.js'

// Implementación en memoria (más adelante puede ser MongoDB, PostgreSQL, etc.)
export class InMemorySeriesRepository extends ISeriesRepository {
  constructor() {
    super()
    this.series = [
      {
        id: 1,
        title: "Mayans M.C.",
        rating: 5,
        estado: "Completada",
        temporadas: 5,
        year: 2018
      },
      {
        id: 2,
        title: "Daredevil: Born Again",
        rating: 5,
        estado: "Viendo",
        temporadas: 1,
        year: 2025
      },
      {
        id: 3,
        title: "Black Mirror T7",
        rating: 5,
        estado: "Pendiente",
        temporadas: 7,
        year: 2025
      },
      {
        id: 4,
        title: "Secret Level",
        rating: 5,
        estado: "Viendo",
        temporadas: 1,
        year: 2024
      }
    ]
    this.nextId = 5
  }

  async getAll() {
    return this.series.map(s => new Serie(s))
  }

  async getById(id) {
    const serie = this.series.find(s => s.id === parseInt(id))
    return serie ? new Serie(serie) : null
  }

  async save(serie) {
    const newSerie = {
      ...serie.toJSON(),
      id: this.nextId++
    }
    this.series.push(newSerie)
    return new Serie(newSerie)
  }

  async update(id, serie) {
    const index = this.series.findIndex(s => s.id === parseInt(id))
    if (index === -1) return null

    this.series[index] = { ...serie.toJSON(), id: parseInt(id) }
    return new Serie(this.series[index])
  }

  async delete(id) {
    const index = this.series.findIndex(s => s.id === parseInt(id))
    if (index === -1) return false

    this.series.splice(index, 1)
    return true
  }
}
