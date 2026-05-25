export class SeriesController {
  constructor(useCases) {
    this.getAllSeries = useCases.getAllSeries
    this.addSerie = useCases.addSerie
    this.getSerieById = useCases.getSerieById
    this.updateSerie = useCases.updateSerie
    this.deleteSerie = useCases.deleteSerie
  }

  async getAll(req, res) {
    try {
      const result = await this.getAllSeries.execute()
      
      if (!result.success) {
        return res.status(400).json({ error: result.error })
      }

      res.json(result.data)
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const result = await this.getSerieById.execute(id)
      
      if (!result.success) {
        return res.status(404).json({ error: result.error })
      }

      res.json(result.data)
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  async add(req, res) {
    try {
      const result = await this.addSerie.execute(req.body)
      
      if (!result.success) {
        return res.status(400).json({ error: result.error })
      }

      res.status(201).json(result.data)
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const result = await this.updateSerie.execute(id, req.body)
      
      if (!result.success) {
        return res.status(404).json({ error: result.error })
      }

      res.json(result.data)
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const result = await this.deleteSerie.execute(id)
      
      if (!result.success) {
        return res.status(404).json({ error: result.error })
      }

      res.json({ message: result.message })
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}
