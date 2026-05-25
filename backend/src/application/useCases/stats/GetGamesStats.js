export class GetGamesStats {
  constructor(gamesRepository) {
    this.gamesRepository = gamesRepository
  }

  async execute() {
    try {
      const games = await this.gamesRepository.getAll()
      
      const total = games.length
      const completados = games.filter(g => g.isCompleted()).length
      const jugando = games.filter(g => g.isPlaying()).length
      const pendientes = games.filter(g => g.isPending()).length
      
      const porcentajeCompletado = total > 0 ? Math.round((completados / total) * 100) : 0
      const porcentajeJugando = total > 0 ? Math.round((jugando / total) * 100) : 0
      
      return {
        success: true,
        data: {
          total,
          completados,
          jugando,
          pendientes,
          porcentajeCompletado,
          porcentajeJugando,
          porcentajeProgreso: porcentajeCompletado + porcentajeJugando
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
