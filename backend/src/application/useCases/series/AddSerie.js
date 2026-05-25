import { Serie } from '../../../domain/entities/Serie.js'

export class AddSerie {
  constructor(seriesRepository) {
    this.seriesRepository = seriesRepository
  }

  async execute(serieData) {
    try {
      // Crear entidad y validar
      const serie = new Serie(serieData)
      serie.validate()

      // Guardar en el repositorio
      const savedSerie = await this.seriesRepository.save(serie)
      
      return {
        success: true,
        data: savedSerie
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}
