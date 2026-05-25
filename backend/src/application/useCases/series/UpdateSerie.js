import { Serie } from '../../../domain/entities/Serie.js'

export class UpdateSerie {
  constructor(seriesRepository) {
    this.seriesRepository = seriesRepository
  }

  async execute(id, serieData) {
    try {
      const serie = new Serie({ ...serieData, id })
      serie.validate()

      const updatedSerie = await this.seriesRepository.update(id, serie)
      
      if (!updatedSerie) {
        return {
          success: false,
          error: 'Serie no encontrada'
        }
      }

      return {
        success: true,
        data: updatedSerie
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}
