// Interface/Contrato para el repositorio de Anime
// Define las operaciones que cualquier implementación debe tener
export class IAnimeRepository {
  async getAll() {
    throw new Error('Method getAll() must be implemented')
  }

  async getById(id) {
    throw new Error('Method getById() must be implemented')
  }

  async save(anime) {
    throw new Error('Method save() must be implemented')
  }

  async update(id, anime) {
    throw new Error('Method update() must be implemented')
  }

  async delete(id) {
    throw new Error('Method delete() must be implemented')
  }

  async getStatistics() {
    throw new Error('Method getStatistics() must be implemented')
  }
}
