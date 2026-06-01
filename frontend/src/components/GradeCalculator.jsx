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
      ],
      targetGrade: 4.0
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

  const updateNumGrades = (id, num) => {
    const numGrades = Math.max(1, Math.min(10, parseInt(num) || 1))
    setSubjects(subjects.map(s => {
      if (s.id === id) {
        const equalPercentage = 100 / numGrades
        const newGrades = Array(numGrades).fill(null).map((_, i) => ({
          value: s.grades[i]?.value || '',
          percentage: equalPercentage
        }))
        return { ...s, numGrades, grades: newGrades }
      }
      return s
    }))
  }

  const updateGrade = (id, gradeIndex, field, value) => {
    setSubjects(subjects.map(s => {
      if (s.id === id) {
        const newGrades = [...s.grades]
        newGrades[gradeIndex] = { ...newGrades[gradeIndex], [field]: value }
        return { ...s, grades: newGrades }
      }
      return s
    }))
  }

  const updateTargetGrade = (id, value) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, targetGrade: parseFloat(value) || 4.0 } : s))
  }

  const calculateNeededGrade = (subject) => {
    const totalPercentage = subject.grades.reduce((sum, g) => sum + parseFloat(g.percentage || 0), 0)
    if (totalPercentage >= 100) return null
    
    const weightedSum = subject.grades.reduce((sum, g) => {
      const grade = parseFloat(g.value)
      const percentage = parseFloat(g.percentage)
      return sum + (isNaN(grade) ? 0 : grade * percentage)
    }, 0)
    
    const remainingPercentage = 100 - totalPercentage
    const neededGrade = ((subject.targetGrade * 100) - weightedSum) / remainingPercentage
    
    return {
      grade: neededGrade,
      percentage: remainingPercentage,
      possible: neededGrade >= 1.0 && neededGrade <= 7.0
    }
  }

  const clearAll = () => {
    if (window.confirm('¿Borrar todas las asignaturas?')) {
      setSubjects([])
      setEditingSubject(null)
    }
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
          const needed = calculateNeededGrade(subject)
          const totalPercentage = subject.grades.reduce((sum, g) => sum + parseFloat(g.percentage || 0), 0)

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
                    {needed ? needed.grade.toFixed(1) : '—'}
                  </Typography>
                  <Typography variant="caption">
                    (Nota Final Necesaria)
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
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    mb: 2
                  }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Nota
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Porcentaje (%)
                    </Typography>
                  </Box>

                  {subject.grades.map((grade, index) => (
                    <Box key={index} sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr',
                      gap: 2,
                      mb: 2
                    }}>
                      <TextField
                        label="Nota"
                        type="number"
                        value={grade.value}
                        onChange={(e) => updateGrade(subject.id, index, 'value', e.target.value)}
                        inputProps={{ min: 1, max: 7, step: 0.1 }}
                        fullWidth
                      />
                      <TextField
                        label="%"
                        type="number"
                        value={grade.percentage}
                        onChange={(e) => updateGrade(subject.id, index, 'percentage', e.target.value)}
                        inputProps={{ min: 0, max: 100, step: 0.1 }}
                        fullWidth
                      />
                    </Box>
                  ))}
                </Box>

                {/* Nota objetivo */}
                <TextField
                  fullWidth
                  label="Nota objetivo (ej: 4.0)"
                  type="number"
                  value={subject.targetGrade}
                  onChange={(e) => updateTargetGrade(subject.id, e.target.value)}
                  inputProps={{ min: 1, max: 7, step: 0.1 }}
                  sx={{ mb: 3 }}
                />

                {/* Botones de acción */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {needed && totalPercentage < 100 && (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ 
                        bgcolor: '#4caf50',
                        color: 'white',
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#45a049' }
                      }}
                    >
                      NOTA NECESARIA: {needed.grade.toFixed(2)} ({needed.percentage.toFixed(1)}%)
                    </Button>
                  )}
                  
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ 
                      bgcolor: '#8bc34a',
                      color: 'white',
                      py: 1.5,
                      fontSize: '1rem',
                      '&:hover': { bgcolor: '#7cb342' }
                    }}
                    onClick={() => updateNumGrades(subject.id, subject.numGrades + 1)}
                  >
                    AGREGAR NOTA
                  </Button>

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
