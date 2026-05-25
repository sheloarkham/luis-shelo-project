export class GetSerieById {
  constructor(seriesRepository) {
    this.seriesRepository = seriesRepository
  }

  async execute(id) {
    try {
      const serie = await this.seriesRepository.getById(id)
      
      if (!serie) {
        return {
          success: false,
          error: 'Serie no encontrada'
        }
      }

      return {
        success: true,
        data: serie
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}
