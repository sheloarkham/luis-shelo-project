// Interfaz (contrato) que define cómo debe comportarse cualquier repositorio de Series
// Esto es Clean Architecture: el dominio define QUÉ necesita, no CÓMO se implementa

export class ISeriesRepository {
  async getAll() {
    throw new Error('Method not implemented')
  }

  async getById(id) {
    throw new Error('Method not implemented')
  }

  async save(serie) {
    throw new Error('Method not implemented')
  }

  async update(id, serie) {
    throw new Error('Method not implemented')
  }

  async delete(id) {
    throw new Error('Method not implemented')
  }
}
