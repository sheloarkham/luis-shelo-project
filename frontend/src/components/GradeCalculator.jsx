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
import { glassTextFieldSx } from '../styles/glassTheme'

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
    <Box sx={{ pb: 10 }}>
      {subjects.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '40vh',
          color: 'var(--color-page-text)'
        }}>
          <Typography variant="h5" sx={{ mb: 1.5, letterSpacing: '0.1em', fontWeight: 300 }}>
            Calculadora de Notas
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--color-muted)' }}>
            Presiona el botón + para agregar una asignatura
          </Typography>
        </Box>
      ) : (
        subjects.map((subject) => {
          const currentAverage = calculateCurrentAverage(subject)

          return (
            <Card key={subject.id} sx={{ 
              mb: 2.5,
              background: 'rgba(8, 16, 32, 0.55)',
              border: '1px solid rgba(80, 150, 255, 0.22)',
              borderRadius: 2,
              backdropFilter: 'blur(12px)',
              boxShadow: 'none',
            }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ 
                  bgcolor: 'rgba(0, 10, 30, 0.5)',
                  border: '1px solid rgba(80, 150, 255, 0.22)',
                  color: '#dce8ff',
                  p: 2,
                  borderRadius: 1.5,
                  mb: 2.5,
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <IconButton 
                    onClick={() => deleteSubject(subject.id)} 
                    sx={{ 
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: 'rgba(255, 190, 190, 0.85)',
                      bgcolor: 'rgba(0, 10, 30, 0.45)',
                      border: '1px solid rgba(255, 120, 120, 0.22)',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="h4" sx={{ fontWeight: 400, color: '#8cb8ff' }}>
                    {currentAverage > 0 ? currentAverage.toFixed(2).replace('.', ',') : '—'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--color-muted)' }}>
                    Promedio Actual (1-7)
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  label="Asignatura (Opcional)"
                  value={subject.name}
                  onChange={(e) => updateSubjectName(subject.id, e.target.value)}
                  sx={{ mb: 2.5, ...glassTextFieldSx }}
                />

                {/* Tabla de notas y porcentajes */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 80px',
                    gap: 2,
                    mb: 2
                  }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, textAlign: 'center', color: 'var(--color-muted)' }}>
                      Nota
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, textAlign: 'center', color: 'var(--color-muted)' }}>
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
                        sx={glassTextFieldSx}
                      />
                      <TextField
                        label="%"
                        value={grade.percentage}
                        onChange={(e) => updateGrade(subject.id, index, 'percentage', e.target.value)}
                        inputProps={{ inputMode: 'decimal' }}
                        fullWidth
                        sx={glassTextFieldSx}
                      />
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => addGrade(subject.id)}
                          sx={{ 
                            bgcolor: 'rgba(0, 10, 30, 0.5)',
                            border: '1px solid rgba(80, 150, 255, 0.22)',
                            color: '#8cb8ff',
                            '&:hover': { bgcolor: 'rgba(20, 40, 80, 0.55)' }
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                        {subject.grades.length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => removeGrade(subject.id, index)}
                            sx={{ 
                              bgcolor: 'rgba(0, 10, 30, 0.5)',
                              border: '1px solid rgba(255, 120, 120, 0.22)',
                              color: 'rgba(255, 190, 190, 0.85)',
                              '&:hover': { bgcolor: 'rgba(60, 20, 30, 0.45)' }
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
                      bgcolor: 'rgba(0, 10, 30, 0.5)',
                      border: '1px solid rgba(255, 120, 120, 0.22)',
                      color: 'rgba(255, 190, 190, 0.9)',
                      py: 1.25,
                      boxShadow: 'none',
                      '&:hover': { bgcolor: 'rgba(60, 20, 30, 0.45)' }
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
        sx={{ 
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          bgcolor: 'rgba(8, 16, 32, 0.85)',
          border: '1px solid rgba(140, 184, 255, 0.4)',
          color: '#8cb8ff',
          boxShadow: 'none',
          '&:hover': { bgcolor: 'rgba(20, 40, 80, 0.9)' }
        }}
        onClick={createNewSubject}
      >
        <AddIcon sx={{ fontSize: 32 }} />
      </Fab>
    </Box>
  )
}

export default GradeCalculator
