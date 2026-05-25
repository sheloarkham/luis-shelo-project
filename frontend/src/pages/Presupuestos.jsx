import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Tab,
  Tabs,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
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
    mes: '',
    nombre: '',
    monto: ''
  })
  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar gastos desde localStorage al inicio
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

  // Guardar gastos en localStorage solo después de cargar
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
    // Validaciones
    if (!formData.mes.trim()) {
      setError('Por favor ingresa el mes')
      return
    }
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
      mes: formData.mes.trim(),
      nombre: formData.nombre.trim(),
      monto: Number(formData.monto),
      fecha: new Date().toISOString()
    }

    setGastos(prev => ({
      ...prev,
      [categoriaActual]: [...prev[categoriaActual], nuevoGasto]
    }))

    // Limpiar formulario
    setFormData({ mes: '', nombre: '', monto: '' })
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

  return (
    <div className="presupuestos-page">
      <div className="content">
        <main>
          <Box sx={{ p: 3 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'white', mb: 3 }}>
              💰 Presupuestos 2026
            </Typography>

            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                mb: 3,
                '& .MuiTab-root': {
                  color: 'white',
                  fontWeight: 'bold'
                },
                '& .Mui-selected': {
                  color: '#ffd700 !important'
                }
              }}
            >
              <Tab label="💵 Presupuesto" />
              <Tab label="💳 CMR" />
              <Tab label="🧑 Juna" />
            </Tabs>

            <Grid container spacing={3}>
              {/* Formulario para agregar gastos */}
              <Grid item xs={12} md={5}>
                <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Agregar Gasto - {categoriaNombres[activeTab]}
                    </Typography>

                    {error && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                      </Alert>
                    )}

                    <Box component="form" sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Mes"
                        name="mes"
                        value={formData.mes}
                        onChange={handleInputChange}
                        placeholder="Ej: Enero 2026"
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        fullWidth
                        label="Nombre del gasto"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej: Supermercado"
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        fullWidth
                        label="Monto (CLP)"
                        name="monto"
                        type="number"
                        value={formData.monto}
                        onChange={handleInputChange}
                        placeholder="Ej: 50000"
                        sx={{ mb: 2 }}
                      />

                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleAgregarGasto}
                        sx={{ py: 1.5 }}
                      >
                        Agregar Gasto
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Lista de gastos */}
              <Grid item xs={12} md={7}>
                <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Gastos - {categoriaNombres[activeTab]}
                    </Typography>

                    {gastos[categoriaActual].length === 0 ? (
                      <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                        No hay gastos registrados
                      </Typography>
                    ) : (
                      <>
                        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                          {gastos[categoriaActual].map((gasto) => (
                            <ListItem
                              key={gasto.id}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  onClick={() => handleEliminarGasto(gasto.id)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              }
                            >
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body1" fontWeight="bold">
                                      {gasto.nombre}
                                    </Typography>
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                      {formatearMonto(gasto.monto)}
                                    </Typography>
                                  </Box>
                                }
                                secondary={`Mes: ${gasto.mes}`}
                              />
                            </ListItem>
                          ))}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'primary.main', borderRadius: 1 }}>
                          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                            TOTAL:
                          </Typography>
                          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                            {formatearMonto(calcularTotal(categoriaActual))}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </main>
      </div>
    </div>
  )
}

export default Presupuestos
