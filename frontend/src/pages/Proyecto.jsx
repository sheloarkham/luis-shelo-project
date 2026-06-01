import './shared-page.css'

const Proyecto = () => {
  const roadmapSteps = [
    { id: 1, title: 'Curso básico de programación', status: 'en-progreso', description: 'Fundamentos de JavaScript' },
    // Aquí irás agregando más pasos después
  ]

  const getStepColor = (status) => {
    switch(status) {
      case 'completado': return '#10b981'
      case 'en-progreso': return '#fbbf24'
      case 'pendiente': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getStepIcon = (status) => {
    switch(status) {
      case 'completado': return '✓'
      case 'en-progreso': return '⏳'
      case 'pendiente': return '○'
      default: return '○'
    }
  }

  return (
    <div className="page-container">
      <div className="content">
        <main>
          <header>
            <h1>El Proyecto</h1>
          </header>
          
          {/* Objetivo General */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '2rem',
              marginBottom: '16px',
              fontWeight: 'bold'
            }}>
              🎯 Objetivo General
            </h2>
            <p style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '300',
              letterSpacing: '1px'
            }}>
              Dominar Javascript
            </p>
          </div>

          {/* Roadmap */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '32px',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.8rem',
              marginBottom: '32px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              🗺️ Roadmap de Aprendizaje
            </h2>

            {/* Timeline */}
            <div style={{
              position: 'relative',
              paddingLeft: '40px'
            }}>
              {/* Línea vertical */}
              <div style={{
                position: 'absolute',
                left: '15px',
                top: '0',
                bottom: '0',
                width: '3px',
                background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)'
              }} />

              {/* Pasos del roadmap */}
              {roadmapSteps.map((step, index) => (
                <div key={step.id} style={{
                  position: 'relative',
                  marginBottom: '32px',
                  paddingLeft: '24px'
                }}>
                  {/* Punto indicador */}
                  <div style={{
                    position: 'absolute',
                    left: '-25px',
                    top: '8px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: getStepColor(step.status),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1
                  }}>
                    {getStepIcon(step.status)}
                  </div>

                  {/* Contenido del paso */}
                  <div style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '20px',
                    borderLeft: `4px solid ${getStepColor(step.status)}`,
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.transform = 'translateX(8px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                  >
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.3rem',
                      marginBottom: '8px'
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '1rem',
                      marginBottom: '12px'
                    }}>
                      {step.description}
                    </p>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: getStepColor(step.status),
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}>
                      {step.status === 'completado' && 'Completado'}
                      {step.status === 'en-progreso' && 'En progreso'}
                      {step.status === 'pendiente' && 'Pendiente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensaje informativo */}
            <div style={{
              textAlign: 'center',
              marginTop: '40px',
              padding: '20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              border: '2px dashed rgba(255,255,255,0.2)'
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '1rem'
              }}>
                💡 Más pasos se agregarán próximamente
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Proyecto
