import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CalculateIcon from '@mui/icons-material/Calculate'

const STORAGE_KEY = 'grade-calculator-subjects'

const GradeCalculator = () => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [newSubjectName, setNewSubjectName] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects))
  }, [subjects])

  const addSubject = () => {
    if (newSubjectName.trim()) {
      setSubjects([...subjects, {
        id: Date.now(),
        name: newSubjectName,
        numGrades: 3,
        grades: [],
        targetGrade: 4.0
      }])
      setNewSubjectName('')
    }
  }

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id))
  }

  const updateNumGrades = (subjectId, num) => {
    const numGrades = Math.max(1, Math.min(10, parseInt(num) || 1))
    setSubjects(subjects.map(s => 
      s.id === subjectId 
        ? { 
            ...s, 
            numGrades,
            grades: Array(numGrades).fill(null).map((_, i) => 
              s.grades[i] || { id: Date.now() + i, value: 0, percentage: (100 / numGrades).toFixed(1) }
            )
          }
        : s
    ))
  }

  const updateGrade = (subjectId, gradeIndex, field, value) => {
    setSubjects(subjects.map(s => {
      if (s.id === subjectId) {
        const newGrades = [...s.grades]
        if (field === 'value') {
          newGrades[gradeIndex] = { ...newGrades[gradeIndex], value: parseFloat(value) || 0 }
        } else if (field === 'percentage') {
          newGrades[gradeIndex] = { ...newGrades[gradeIndex], percentage: parseFloat(value) || 0 }
        }
        return { ...s, grades: newGrades }
      }
      return s
    }))
  }

  const distributeEqually = (subjectId) => {
    setSubjects(subjects.map(s => {
      if (s.id === subjectId) {
        const equalPercentage = (100 / s.numGrades).toFixed(1)
        return {
          ...s,
          grades: s.grades.map(g => ({ ...g, percentage: parseFloat(equalPercentage) }))
        }
      }
      return s
    }))
  }

  const updateTargetGrade = (subjectId, value) => {
    setSubjects(subjects.map(s => 
      s.id === subjectId ? { ...s, targetGrade: parseFloat(value) || 4.0 } : s
    ))
  }

  const calculateCurrentAverage = (grades) => {
    const totalPercentage = grades.reduce((sum, g) => sum + parseFloat(g.percentage || 0), 0)
    if (totalPercentage === 0) return 0
    const weightedSum = grades.reduce((sum, g) => sum + (parseFloat(g.value || 0) * parseFloat(g.percentage || 0)), 0)
    return weightedSum / totalPercentage
  }

  const calculateNeededGrade = (subject) => {
    const currentGrades = subject.grades
    const totalPercentage = currentGrades.reduce((sum, g) => sum + parseFloat(g.percentage || 0), 0)
    
    if (totalPercentage >= 100) return null
    
    const weightedSum = currentGrades.reduce((sum, g) => sum + (parseFloat(g.value || 0) * parseFloat(g.percentage || 0)), 0)
    const remainingPercentage = 100 - totalPercentage
    
    const neededGrade = ((subject.targetGrade * 100) - weightedSum) / remainingPercentage
    
    return {
      grade: neededGrade,
      percentage: remainingPercentage,
      possible: neededGrade >= 1.0 && neededGrade <= 7.0
    }
  }

  const getStatusColor = (current, target) => {
    if (current >= target) return '#10b981'
    if (current >= target - 0.5) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
        📊 Calculadora de Notas
      </Typography>

      {/* Agregar nuevo ramo */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Nombre del ramo"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSubject()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addSubject}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
            >
              Agregar
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Lista de ramos */}
      {subjects.map((subject) => {
        const currentAvg = calculateCurrentAverage(subject.grades)
        const needed = calculateNeededGrade(subject)
        const totalPercentage = subject.grades.reduce((sum, g) => sum + g.percentage, 0)

        return (
          <Card key={subject.id} sx={{ 
            mb: 3, 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            position: 'relative'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {subject.name}
                </Typography>
                <IconButton onClick={() => deleteSubject(subject.id)} sx={{ color: 'white' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>

              {/* Configuración del ramo */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label="¿Cuántas notas tienes?"
                    type="number"
                    value={subject.numGrades}
                    onChange={(e) => updateNumGrades(subject.id, e.target.value)}
                    inputProps={{ min: 1, max: 10, step: 1 }}
                    sx={{
                      width: 200,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    }}
                  />
                  <TextField
                    label="Nota objetivo"
                    type="number"
                    value={subject.targetGrade}
                    onChange={(e) => updateTargetGrade(subject.id, e.target.value)}
                    inputProps={{ min: 1, max: 7, step: 0.1 }}
                    sx={{
                      width: 150,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    }}
                  />
                  <Button
                    onClick={() => distributeEqually(subject.id)}
                    sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    Distribuir % igual
                  </Button>
                </Box>
              </Box>

              {/* Notas */}
              <Box sx={{ mb: 2 }}>
                {subject.grades.map((grade, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}>
                    <Chip label={`Nota ${index + 1}`} sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: 'white', width: 80 }} />
                    <TextField
                      label="Nota"
                      type="number"
                      value={grade.value || ''}
                      onChange={(e) => updateGrade(subject.id, index, 'value', e.target.value)}
                      inputProps={{ min: 1, max: 7, step: 0.1 }}
                      sx={{
                        width: 100,
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      }}
                    />
                    <TextField
                      label="%"
                      type="number"
                      value={grade.percentage || ''}
                      onChange={(e) => updateGrade(subject.id, index, 'percentage', e.target.value)}
                      inputProps={{ min: 0, max: 100, step: 0.1 }}
                      sx={{
                        width: 100,
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Resultados */}
              <Box sx={{ 
                bgcolor: 'rgba(0,0,0,0.2)', 
                p: 2, 
                borderRadius: 2,
                color: 'white'
              }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Porcentaje cubierto:</strong> {totalPercentage}%
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Promedio actual:</strong>{' '}
                  <span style={{ 
                    color: getStatusColor(currentAvg, subject.targetGrade),
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}>
                    {currentAvg.toFixed(2)}
                  </span>
                </Typography>
                
                {needed && (
                  <Box sx={{ 
                    mt: 2, 
                    p: 2, 
                    bgcolor: needed.possible ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    borderRadius: 1,
                    border: `2px solid ${needed.possible ? '#10b981' : '#ef4444'}`
                  }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalculateIcon />
                      Nota necesaria en el {needed.percentage}% restante:
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                      {needed.grade.toFixed(2)}
                    </Typography>
                    {!needed.possible && (
                      <Typography variant="body2" sx={{ mt: 1, color: '#fecaca' }}>
                        ⚠️ No es posible alcanzar la nota objetivo
                      </Typography>
                    )}
                    {needed.possible && needed.grade > 7.0 && (
                      <Typography variant="body2" sx={{ mt: 1, color: '#fcd34d' }}>
                        ⚠️ Necesitas más de 7.0 (muy difícil)
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        )
      })}

      {subjects.length === 0 && (
        <Box sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', mt: 5 }}>
          <Typography variant="h6">
            No hay ramos agregados
          </Typography>
          <Typography variant="body2">
            Agrega un ramo para comenzar a calcular tus notas
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default GradeCalculator
