export class GetSeriesStats {
  constructor(seriesRepository) {
    this.seriesRepository = seriesRepository
  }

  async execute() {
    try {
      const series = await this.seriesRepository.getAll()
      
      const total = series.length
      const completadas = series.filter(s => s.isCompleted()).length
      const viendo = series.filter(s => s.isWatching()).length
      const pendientes = series.filter(s => s.isPending()).length
      
      const porcentajeCompletado = total > 0 ? Math.round((completadas / total) * 100) : 0
      const porcentajeViendo = total > 0 ? Math.round((viendo / total) * 100) : 0
      
      return {
        success: true,
        data: {
          total,
          completadas,
          viendo,
          pendientes,
          porcentajeCompletado,
          porcentajeViendo,
          porcentajeProgreso: porcentajeCompletado + porcentajeViendo
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}
