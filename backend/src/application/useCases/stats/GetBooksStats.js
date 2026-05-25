export class GetBooksStats {
  constructor(booksRepository) {
    this.booksRepository = booksRepository
  }

  async execute() {
    try {
      const books = await this.booksRepository.getAll()
      
      const total = books.length
      const leidos = books.filter(b => b.isRead()).length
      const leyendo = books.filter(b => b.isReading()).length
      const pendientes = books.filter(b => b.isPending()).length
      
      const porcentajeLeido = total > 0 ? Math.round((leidos / total) * 100) : 0
      const porcentajeLeyendo = total > 0 ? Math.round((leyendo / total) * 100) : 0
      
      return {
        success: true,
        data: {
          total,
          leidos,
          leyendo,
          pendientes,
          porcentajeLeido,
          porcentajeLeyendo,
          porcentajeProgreso: porcentajeLeido + porcentajeLeyendo
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
