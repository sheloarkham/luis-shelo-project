import { IAnimeRepository } from '../../domain/repositories/IAnimeRepository.js'
import { Anime } from '../../domain/entities/Anime.js'

export class InMemoryAnimeRepository extends IAnimeRepository {
  constructor() {
    super()
    this.animes = [
      { id: 1, title: "Detective Conan", episodes: 1130, studio: "TMS Entertainment", year: 1996, image: "/Ocio/assetsd_anime/h2ck2ma8cs811.jpg", Estado: "Viendo" },
      { id: 2, title: "My Hero Academia", episodes: 159, studio: "Bones", year: 2016, image: "/Ocio/assetsd_anime/h2ck2ma8cs811.jpg", Estado: "Viendo" },
      { id: 3, title: "Spy x Family", episodes: 37, studio: "Wit Studio / CloverWorks", year: 2022, image: "/Ocio/assetsd_anime/h2ck2ma8cs811.jpg", Estado: "Viendo" },
      { id: 4, title: "Re:Zero", episodes: 75, studio: "White Fox", year: 2016, image: "/Ocio/assetsd_anime/h2ck2ma8cs811.jpg", Estado: "Pendiente" }
    ]
    this.nextId = 5
  }

  async getAll() {
    return this.animes.map(a => new Anime(a))
  }

  async getById(id) {
    const anime = this.animes.find(a => a.id === parseInt(id))
    return anime ? new Anime(anime) : null
  }

  async save(anime) {
    const newAnime = {
      ...anime.toJSON(),
      id: this.nextId++
    }
    this.animes.push(newAnime)
    return new Anime(newAnime)
  }

  async update(id, anime) {
    const index = this.animes.findIndex(a => a.id === parseInt(id))
    if (index === -1) return null

    this.animes[index] = { ...anime.toJSON(), id: parseInt(id) }
    return new Anime(this.animes[index])
  }

  async delete(id) {
    const index = this.animes.findIndex(a => a.id === parseInt(id))
    if (index === -1) return false

    this.animes.splice(index, 1)
    return true
  }

  async getStatistics() {
    const total = this.animes.length
    const completados = this.animes.filter(a => a.Estado === 'Completado').length
    const viendo = this.animes.filter(a => a.Estado === 'Viendo').length
    const pendientes = this.animes.filter(a => a.Estado === 'Pendiente').length

    const porcentajeProgreso = total > 0 
      ? Math.round(((completados + viendo) / total) * 100) 
      : 0

    return {
      total,
      completados,
      viendo,
      pendientes,
      porcentajeProgreso
    }
  }
}
