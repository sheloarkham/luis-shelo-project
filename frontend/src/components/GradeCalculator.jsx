import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const STORAGE_KEY = 'grade-calculator-subjects'

const GradeCalculator = () => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [editingSubject, setEditingSubject] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects))
  }, [subjects])

  const createNewSubject = () => {
    const newSubject = {
      id: Date.now(),
      name: '',
      numGrades: 2,
      grades: [
        { value: '', percentage: 50 },
        { value: '', percentage: 50 }
      ]
    }
    setSubjects([...subjects, newSubject])
    setEditingSubject(newSubject.id)
  }

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id))
    if (editingSubject === id) setEditingSubject(null)
  }

  const updateSubjectName = (id, name) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, name } : s))
  }

  const addGrade = (id) => {
    setSubjects(subjects.map(s => {
      if (s.id === id) {
        const newNumGrades = s.grades.length + 1
        const equalPercentage = 100 / newNumGrades
        const newGrades = [...s.grades, { value: '', percentage: equalPercentage }]
        return {
          ...s,
          numGrades: newNumGrades,
          grades: newGrades.map(g => ({ ...g, percentage: equalPercentage }))
        }
      }
      return s
    }))
  }

  const removeGrade = (id, index) => {
    setSubjects(subjects.map(s => {
      if (s.id === id && s.grades.length > 1) {
        const newGrades = s.grades.filter((_, i) => i !== index)
        const newNumGrades = newGrades.length
        const equalPercentage = 100 / newNumGrades
        return {
          ...s,
          numGrades: newNumGrades,
          grades: newGrades.map(g => ({ ...g, percentage: equalPercentage }))
        }
      }
      return s
    }))
  }

  const updateGrade = (id, gradeIndex, field, value) => {
    const normalizedValue = typeof value === 'string' ? value.replace(',', '.') : value
    
    setSubjects(subjects.map(s => {
      if (s.id === id) {
        const newGrades = [...s.grades]
        newGrades[gradeIndex] = { ...newGrades[gradeIndex], [field]: normalizedValue }
        return { ...s, grades: newGrades }
      }
      return s
    }))
  }

  const calculateCurrentAverage = (subject) => {
    const weightedSum = subject.grades.reduce((sum, g) => {
      const grade = parseFloat(g.value)
      const percentage = parseFloat(g.percentage)
      return sum + (isNaN(grade) || isNaN(percentage) ? 0 : (grade * percentage) / 100)
    }, 0)
    
    return weightedSum
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 3,
      pb: 10
    }}>
      {subjects.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '80vh',
          color: 'white'
        }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Calculadora de Notas
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Presiona el botón + para agregar una asignatura
          </Typography>
        </Box>
      ) : (
        subjects.map((subject) => {
          const currentAverage = calculateCurrentAverage(subject)

          return (
            <Card key={subject.id} sx={{ 
              mb: 3,
              background: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <CardContent sx={{ p: 3 }}>
                {/* Header con nota final */}
                <Box sx={{ 
                  bgcolor: '#3f51b5',
                  color: 'white',
                  p: 2,
                  borderRadius: 2,
                  mb: 3,
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <IconButton 
                    onClick={() => deleteSubject(subject.id)} 
                    sx={{ 
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {currentAverage > 0 ? currentAverage.toFixed(2).replace('.', ',') : '—'}
                  </Typography>
                  <Typography variant="caption">
                    Promedio Actual (1-7)
                  </Typography>
                </Box>

                {/* Nombre de asignatura */}
                <TextField
                  fullWidth
                  label="Asignatura (Opcional)"
                  value={subject.name}
                  onChange={(e) => updateSubjectName(subject.id, e.target.value)}
                  sx={{ mb: 3 }}
                />

                {/* Tabla de notas y porcentajes */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 80px',
                    gap: 2,
                    mb: 2
                  }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Nota
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Porcentaje (%)
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      
                    </Typography>
                  </Box>

                  {subject.grades.map((grade, index) => (
                    <Box key={index} sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr 80px',
                      gap: 2,
                      mb: 2,
                      alignItems: 'center'
                    }}>
                      <TextField
                        label="Nota"
                        value={grade.value}
                        onChange={(e) => updateGrade(subject.id, index, 'value', e.target.value)}
                        inputProps={{ inputMode: 'decimal' }}
                        fullWidth
                      />
                      <TextField
                        label="%"
                        value={grade.percentage}
                        onChange={(e) => updateGrade(subject.id, index, 'percentage', e.target.value)}
                        inputProps={{ inputMode: 'decimal' }}
                        fullWidth
                      />
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => addGrade(subject.id)}
                          sx={{ 
                            bgcolor: '#4caf50',
                            color: 'white',
                            '&:hover': { bgcolor: '#45a049' }
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                        {subject.grades.length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => removeGrade(subject.id, index)}
                            sx={{ 
                              bgcolor: '#f44336',
                              color: 'white',
                              '&:hover': { bgcolor: '#da190b' }
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Botón de borrar */}
                <Box sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ 
                      bgcolor: '#f44336',
                      color: 'white',
                      py: 1.5,
                      fontSize: '1rem',
                      '&:hover': { bgcolor: '#da190b' }
                    }}
                    onClick={() => {
                      if (window.confirm('¿Borrar esta asignatura?')) {
                        deleteSubject(subject.id)
                      }
                    }}
                  >
                    BORRAR TODO
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )
        })
      )}

      {/* Botón flotante para agregar asignatura */}
      <Fab
        color="primary"
        sx={{ 
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 64,
          height: 64,
          bgcolor: '#ffc107',
          '&:hover': { bgcolor: '#ffb300' }
        }}
        onClick={createNewSubject}
      >
        <AddIcon sx={{ fontSize: 32 }} />
      </Fab>
    </Box>
  )
}

export default GradeCalculator
