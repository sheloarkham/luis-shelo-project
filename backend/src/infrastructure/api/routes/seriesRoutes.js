import express from 'express'
import { SeriesController } from '../controllers/SeriesController.js'
import { InMemorySeriesRepository } from '../../repositories/InMemorySeriesRepository.js'
import { GetAllSeries } from '../../../application/useCases/series/GetAllSeries.js'
import { AddSerie } from '../../../application/useCases/series/AddSerie.js'
import { GetSerieById } from '../../../application/useCases/series/GetSerieById.js'
import { UpdateSerie } from '../../../application/useCases/series/UpdateSerie.js'
import { DeleteSerie } from '../../../application/useCases/series/DeleteSerie.js'

// Dependency Injection
const seriesRepository = new InMemorySeriesRepository()
const getAllSeries = new GetAllSeries(seriesRepository)
const addSerie = new AddSerie(seriesRepository)
const getSerieById = new GetSerieById(seriesRepository)
const updateSerie = new UpdateSerie(seriesRepository)
const deleteSerie = new DeleteSerie(seriesRepository)

const controller = new SeriesController({
  getAllSeries,
  addSerie,
  getSerieById,
  updateSerie,
  deleteSerie
})

export const seriesRouter = express.Router()

seriesRouter.get('/', (req, res) => controller.getAll(req, res))
seriesRouter.get('/:id', (req, res) => controller.getById(req, res))
seriesRouter.post('/', (req, res) => controller.add(req, res))
seriesRouter.put('/:id', (req, res) => controller.update(req, res))
seriesRouter.delete('/:id', (req, res) => controller.delete(req, res))
