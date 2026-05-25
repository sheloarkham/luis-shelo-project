const API_BASE_URL = '/api'

export const seriesApi = {
  // Obtener todas las series
  async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/series`)
      if (!response.ok) {
        throw new Error('Error al obtener las series')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en getAll:', error)
      throw error
    }
  },

  // Obtener una serie por ID
  async getById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/series/${id}`)
      if (!response.ok) {
        throw new Error('Error al obtener la serie')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en getById:', error)
      throw error
    }
  },

  // Crear una nueva serie
  async create(serieData) {
    try {
      const response = await fetch(`${API_BASE_URL}/series`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serieData),
      })
      if (!response.ok) {
        throw new Error('Error al crear la serie')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en create:', error)
      throw error
    }
  },

  // Actualizar una serie
  async update(id, serieData) {
    try {
      const response = await fetch(`${API_BASE_URL}/series/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serieData),
      })
      if (!response.ok) {
        throw new Error('Error al actualizar la serie')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en update:', error)
      throw error
    }
  },

  // Eliminar una serie
  async delete(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/series/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Error al eliminar la serie')
      }
      return await response.json()
    } catch (error) {
      console.error('Error en delete:', error)
      throw error
    }
  },
}
