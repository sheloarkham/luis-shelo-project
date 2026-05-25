export class DeleteSerie {
  constructor(seriesRepository) {
    this.seriesRepository = seriesRepository
  }

  async execute(id) {
    try {
      const deleted = await this.seriesRepository.delete(id)
      
      if (!deleted) {
        return {
          success: false,
          error: 'Serie no encontrada'
        }
      }

      return {
        success: true,
        message: 'Serie eliminada correctamente'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}
