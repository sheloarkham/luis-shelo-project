import express from 'express'
import { seriesRouter } from './routes/seriesRoutes.js'
import { statsRouter } from './routes/statsRoutes.js'

export function createApiRouter() {
  const router = express.Router()

  // Rutas de la API
  router.use('/series', seriesRouter)
  router.use('/stats', statsRouter)
  
  // Health check
  router.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando correctamente' })
  })

  return router
}
