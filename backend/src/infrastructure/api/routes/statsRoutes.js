import { Router } from 'express'
import { InMemorySeriesRepository } from '../../repositories/InMemorySeriesRepository.js'
import { InMemoryGamesRepository } from '../../repositories/InMemoryGamesRepository.js'
import { InMemoryBooksRepository } from '../../repositories/InMemoryBooksRepository.js'
import { InMemoryAnimeRepository } from '../../repositories/InMemoryAnimeRepository.js'
import { GetSeriesStats } from '../../../application/useCases/stats/GetSeriesStats.js'
import { GetGamesStats } from '../../../application/useCases/stats/GetGamesStats.js'
import { GetBooksStats } from '../../../application/useCases/stats/GetBooksStats.js'
import { GetAnimeStats } from '../../../application/useCases/stats/GetAnimeStats.js'
import { StatsController } from '../controllers/StatsController.js'

const statsRouter = Router()

// Instanciar repositorios
const seriesRepository = new InMemorySeriesRepository()
const gamesRepository = new InMemoryGamesRepository()
const booksRepository = new InMemoryBooksRepository()
const animeRepository = new InMemoryAnimeRepository()

// Instanciar use cases
const getSeriesStats = new GetSeriesStats(seriesRepository)
const getGamesStats = new GetGamesStats(gamesRepository)
const getBooksStats = new GetBooksStats(booksRepository)
const getAnimeStats = new GetAnimeStats(animeRepository)

// Instanciar controlador
const controller = new StatsController({
  getSeriesStats,
  getGamesStats,
  getBooksStats,
  getAnimeStats
})

// Rutas
statsRouter.get('/', (req, res) => controller.getAll(req, res))
statsRouter.get('/series', (req, res) => controller.getSeries(req, res))
statsRouter.get('/games', (req, res) => controller.getGames(req, res))
statsRouter.get('/books', (req, res) => controller.getBooks(req, res))
statsRouter.get('/anime', (req, res) => controller.getAnime(req, res))

export { statsRouter }
