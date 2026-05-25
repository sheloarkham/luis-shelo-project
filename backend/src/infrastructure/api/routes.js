import express from 'express'
import { seriesRouter } from './routes/seriesRoutes.js'

export function createApiRouter() {
  const router = express.Router()

  // Rutas de la API
  router.use('/series', seriesRouter)
  
  // Health check
  router.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando correctamente' })
  })

  return router
}
