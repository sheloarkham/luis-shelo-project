import { useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import MistPageTransition from './components/MistPageTransition'
import Home from './pages/Home'
import Ocio from './pages/Ocio'
import Presupuestos from './pages/Presupuestos'
import Proyecto from './pages/Proyecto'
import ProyectoFullstack from './pages/ProyectoFullstack'
import ProyectoAutito from './pages/ProyectoAutito'
import ProyectoEscritos from './pages/ProyectoEscritos'
import Carrera from './pages/Carrera'
import Gym from './pages/Gym'
import Yeni from './pages/Yeni'
import Chat from './pages/Chat'
import { usePageTransition } from './hooks/usePageTransition'
import './App.css'
import './components/PageTransition.css'

function AppRoutes() {
  const contentRef = useRef(null)
  const { displayLocation, mistPhase } = usePageTransition(contentRef)

  return (
    <>
      <MistPageTransition phase={mistPhase} />
      <Routes location={displayLocation}>
        <Route path="/" element={<Layout contentRef={contentRef} />}>
          <Route index element={<Home />} />
          <Route path="ocio" element={<Ocio />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="proyectos" element={<Proyecto />} />
          <Route path="proyectos/fullstack" element={<ProyectoFullstack />} />
          <Route path="proyectos/autito" element={<ProyectoAutito />} />
          <Route path="proyectos/escritos" element={<ProyectoEscritos />} />
          <Route path="proyecto" element={<Navigate to="/proyectos" replace />} />
          <Route path="books" element={<Navigate to="/proyectos/escritos" replace />} />
          <Route path="carrera" element={<Carrera />} />
          <Route path="gym" element={<Gym />} />
          <Route path="yeni" element={<Yeni />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
