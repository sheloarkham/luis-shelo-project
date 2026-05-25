import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createApiRouter } from './infrastructure/api/routes.js'

// Cargar variables de entorno
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Rutas de la API
app.use('/api', createApiRouter())

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API Backend - Luis Shelo Project',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      series: '/api/series'
    }
  })
})

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Error interno del servidor' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`)
  console.log(`📡 API disponible en http://localhost:${PORT}/api`)
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`)
})
