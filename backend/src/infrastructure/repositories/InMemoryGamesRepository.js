import { IGamesRepository } from '../../domain/repositories/IGamesRepository.js'
import { Game } from '../../domain/entities/Game.js'

export class InMemoryGamesRepository extends IGamesRepository {
  constructor() {
    super()
    this.games = [
      { id: 1, title: "Hi-Fi RUSH", rating: 5, estado: "Jugando", platform: "PC", year: 2023 },
      { id: 2, title: "Assassin's Creed Valhalla", rating: 4, estado: "Pendiente", platform: "PC/Console", year: 2020 },
      { id: 3, title: "Dead Space Remake", rating: 5, estado: "Pendiente", platform: "PC", year: 2023 },
      { id: 4, title: "Dragon Age 2", rating: 4, estado: "Completado", platform: "PC", year: 2011 },
      { id: 5, title: "Dragon Age: Inquisition", rating: 5, estado: "Completado", platform: "PC", year: 2014 },
      { id: 6, title: "Gris", rating: 5, estado: "Completado", platform: "PC", year: 2018 },
      { id: 7, title: "Kona", rating: 4, estado: "Completado", platform: "PC", year: 2017 },
      { id: 8, title: "Kona II: Brume", rating: 4, estado: "Completado", platform: "PC", year: 2023 },
      { id: 9, title: "Ghostbusters: The Video Game Remastered", rating: 4, estado: "Completado", platform: "PC", year: 2019 },
      { id: 10, title: "Exoprimal", rating: 4, estado: "Completado", platform: "PC", year: 2023 },
      { id: 11, title: "Harold Halibut", rating: 4, estado: "Pendiente", platform: "PC", year: 2024 },
      { id: 12, title: "Star Wars Jedi: Survivor", rating: 5, estado: "Pendiente", platform: "PC", year: 2023 },
      { id: 13, title: "Too Human", rating: 3, estado: "Completado", platform: "Xbox 360", year: 2008 },
      { id: 14, title: "South Park: The Fractured But Whole", rating: 4, estado: "Completado", platform: "PC", year: 2017 },
      { id: 15, title: "Super Meat Boy", rating: 4, estado: "Completado", platform: "PC", year: 2010 },
      { id: 16, title: "Crackdown", rating: 4, estado: "Completado", platform: "Xbox 360", year: 2007 },
      { id: 17, title: "Tales from the Borderlands", rating: 5, estado: "Completado", platform: "PC", year: 2014 },
      { id: 18, title: "Alan Wake 2", rating: 5, estado: "Pendiente", platform: "PC", year: 2023 },
      { id: 19, title: "Game of Thrones: A Telltale Games Series", rating: 4, estado: "Pendiente", platform: "PC", year: 2014 },
      { id: 20, title: "Resident Evil 4 Remake", rating: 5, estado: "Completado", platform: "PC", year: 2023 }
    ]
    this.nextId = 21
  }

  async getAll() {
    return this.games.map(g => new Game(g))
  }

  async getById(id) {
    const game = this.games.find(g => g.id === parseInt(id))
    return game ? new Game(game) : null
  }

  async save(game) {
    const newGame = {
      ...game.toJSON(),
      id: this.nextId++
    }
    this.games.push(newGame)
    return new Game(newGame)
  }

  async update(id, game) {
    const index = this.games.findIndex(g => g.id === parseInt(id))
    if (index === -1) return null

    this.games[index] = { ...game.toJSON(), id: parseInt(id) }
    return new Game(this.games[index])
  }

  async delete(id) {
    const index = this.games.findIndex(g => g.id === parseInt(id))
    if (index === -1) return false

    this.games.splice(index, 1)
    return true
  }
}
