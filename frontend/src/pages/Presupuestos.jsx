import { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PageHeader from '../components/PageHeader'
import { glassTextFieldSx, glassTabsSx } from '../styles/glassTheme'
import './shared-page.css'
import '../styles/futuristicPage.css'
import './Presupuestos.css'

const STORAGE_KEY = 'presupuestos-gastos'

const Presupuestos = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [gastos, setGastos] = useState({
    presupuesto: [],
    cmr: [],
    juna: []
  })
  const [formData, setFormData] = useState({
    nombre: '',
    monto: ''
  })
  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setGastos(JSON.parse(saved))
      }
    } catch (err) {
      console.error('Error al cargar gastos:', err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos))
      } catch (err) {
        console.error('Error al guardar gastos:', err)
      }
    }
  }, [gastos, isLoaded])

  const categorias = ['presupuesto', 'cmr', 'juna']
  const categoriaNombres = ['Presupuesto', 'CMR', 'Juna']
  const categoriaActual = categorias[activeTab]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAgregarGasto = () => {
    if (!formData.nombre.trim()) {
      setError('Por favor ingresa el nombre del gasto')
      return
    }
    if (!formData.monto || isNaN(formData.monto) || Number(formData.monto) <= 0) {
      setError('Por favor ingresa un monto válido')
      return
    }

    setError('')

    const nuevoGasto = {
      id: Date.now(),
      nombre: formData.nombre.trim(),
      monto: Number(formData.monto),
      fecha: new Date().toISOString()
    }

    setGastos(prev => ({
      ...prev,
      [categoriaActual]: [...prev[categoriaActual], nuevoGasto]
    }))

    setFormData({ nombre: '', monto: '' })
  }

  const handleEliminarGasto = (id) => {
    setGastos(prev => ({
      ...prev,
      [categoriaActual]: prev[categoriaActual].filter(g => g.id !== id)
    }))
  }

  const calcularTotal = (categoria) => {
    return gastos[categoria].reduce((sum, gasto) => sum + gasto.monto, 0)
  }

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(monto)
  }

  const totalCategoria = calcularTotal(categoriaActual)

  return (
    <div className="page-container presupuestos-page">
      <div className="content">
        <main className="presupuestos-main">
        <PageHeader title="Presupuestos" className="page-header--solo" />

          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
            className="presupuestos-tabs"
            sx={glassTabsSx}
          >
            <Tab label="Presupuesto" />
            <Tab label="CMR" />
            <Tab label="Juna" />
          </Tabs>

          <Grid container spacing={3} justifyContent="center" className="presupuestos-grid">
            <Grid item xs={12} md={5} lg={4}>
              <section className="presupuestos-section neo-glass-panel presupuestos-panel">
                <div className="neo-glass-panel__glow" aria-hidden="true" />
                <h2 className="presupuestos-section-title">
                  Agregar gasto · {categoriaNombres[activeTab]}
                </h2>

                {error && (
                  <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(80, 0, 0, 0.35)', color: '#fff' }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" className="presupuestos-form">
                  <TextField
                    fullWidth
                    label="Nombre del gasto"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Supermercado"
                    sx={glassTextFieldSx}
                  />

                  <TextField
                    fullWidth
                    label="Monto (CLP)"
                    name="monto"
                    type="number"
                    value={formData.monto}
                    onChange={handleInputChange}
                    placeholder="Ej: 50000"
                    sx={glassTextFieldSx}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAgregarGasto}
                    className="presupuestos-submit"
                  >
                    Agregar gasto
                  </Button>
                </Box>
              </section>
            </Grid>

            <Grid item xs={12} md={7} lg={6}>
              <section className="presupuestos-section neo-glass-panel presupuestos-panel">
                <div className="neo-glass-panel__glow" aria-hidden="true" />
                <h2 className="presupuestos-section-title">
                  Gastos · {categoriaNombres[activeTab]}
                </h2>

                {gastos[categoriaActual].length === 0 ? (
                  <p className="presupuestos-empty">No hay gastos registrados</p>
                ) : (
                  <>
                    <Box className="presupuestos-list">
                      {gastos[categoriaActual].map((gasto) => (
                        <Box key={gasto.id} className="presupuestos-row">
                          <span className="presupuestos-pill presupuestos-pill--name">
                            {gasto.nombre}
                          </span>
                          <span className="presupuestos-pill presupuestos-pill--amount">
                            {formatearMonto(gasto.monto)}
                          </span>
                          <IconButton
                            size="small"
                            onClick={() => handleEliminarGasto(gasto.id)}
                            className="presupuestos-delete"
                            aria-label={`Eliminar ${gasto.nombre}`}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>

                    <Box className="presupuestos-total">
                      <span className="presupuestos-pill presupuestos-pill--total-label">Total</span>
                      <span className="presupuestos-pill presupuestos-pill--total-amount">
                        {formatearMonto(totalCategoria)}
                      </span>
                    </Box>
                  </>
                )}
              </section>
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
  )
}

export default Presupuestos
