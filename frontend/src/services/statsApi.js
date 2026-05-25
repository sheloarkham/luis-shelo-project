const API_BASE_URL = '/api/stats'

export const statsApi = {
  // Obtener todas las estadísticas
  async getAll() {
    try {
      const response = await fetch(API_BASE_URL)
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en getAll stats:', error)
      throw error
    }
  },

  // Obtener estadísticas de series
  async getSeries() {
    try {
      const response = await fetch(`${API_BASE_URL}/series`)
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas de series')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en getSeries stats:', error)
      throw error
    }
  },

  // Obtener estadísticas de juegos
  async getGames() {
    try {
      const response = await fetch(`${API_BASE_URL}/games`)
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas de juegos')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en getGames stats:', error)
      throw error
    }
  },

  // Obtener estadísticas de libros
  async getBooks() {
    try {
      const response = await fetch(`${API_BASE_URL}/books`)
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas de libros')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en getBooks stats:', error)
      throw error
    }
  }
}
