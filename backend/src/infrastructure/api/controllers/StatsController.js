export class StatsController {
  constructor({ getSeriesStats, getGamesStats, getBooksStats }) {
    this.getSeriesStats = getSeriesStats
    this.getGamesStats = getGamesStats
    this.getBooksStats = getBooksStats
  }

  async getSeries(req, res) {
    try {
      const result = await this.getSeriesStats.execute()
      if (result.success) {
        res.json(result.data)
      } else {
        res.status(400).json({ error: result.error })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getGames(req, res) {
    try {
      const result = await this.getGamesStats.execute()
      if (result.success) {
        res.json(result.data)
      } else {
        res.status(400).json({ error: result.error })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getBooks(req, res) {
    try {
      const result = await this.getBooksStats.execute()
      if (result.success) {
        res.json(result.data)
      } else {
        res.status(400).json({ error: result.error })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getAll(req, res) {
    try {
      const [seriesResult, gamesResult, booksResult] = await Promise.all([
        this.getSeriesStats.execute(),
        this.getGamesStats.execute(),
        this.getBooksStats.execute()
      ])

      if (seriesResult.success && gamesResult.success && booksResult.success) {
        res.json({
          series: seriesResult.data,
          games: gamesResult.data,
          books: booksResult.data
        })
      } else {
        res.status(400).json({ 
          error: 'Error al obtener estadísticas',
          details: {
            series: seriesResult.error,
            games: gamesResult.error,
            books: booksResult.error
          }
        })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
