import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado:', registration.scope)
        
        // Verificar actualizaciones cada 1 hora
        setInterval(() => {
          registration.update()
        }, 3600000)
      })
      .catch((error) => {
        console.error('❌ Error al registrar Service Worker:', error)
      })
  })
}
