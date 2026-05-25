import { Serie } from '../../../domain/entities/Serie.js'

export class GetAllSeries {
  constructor(seriesRepository) {
    this.seriesRepository = seriesRepository
  }

  async execute() {
    try {
      const series = await this.seriesRepository.getAll()
      return {
        success: true,
        data: series
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}
