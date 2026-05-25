// Use Case para obtener estadísticas de Anime
// Application Layer - lógica de aplicación usando entidades del dominio

export class GetAnimeStats {
  constructor(animeRepository) {
    this.animeRepository = animeRepository
  }

  async execute() {
    const animes = await this.animeRepository.getAll()
    
    const total = animes.length
    const completados = animes.filter(a => a.isCompleted()).length
    const viendo = animes.filter(a => a.isWatching()).length
    const pendientes = animes.filter(a => a.isPending()).length

    // Calcular porcentaje de progreso (completados + viendo)
    const porcentajeProgreso = total > 0 
      ? Math.round(((completados + viendo) / total) * 100) 
      : 0

    return {
      total,
      completados,
      viendo,
      pendientes,
      porcentajeProgreso
    }
  }
}
