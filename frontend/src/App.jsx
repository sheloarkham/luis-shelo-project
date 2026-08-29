import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
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
import { runPageFadeOut } from './utils/pageTransition'
import './App.css'

function AppRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [pageEntering, setPageEntering] = useState(false)
  const contentRef = useRef(null)
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return undefined
    }

    if (location.pathname === displayLocation.pathname) {
      return undefined
    }

    let active = true

    const runTransition = async () => {
      await runPageFadeOut(contentRef.current)

      if (!active) return

      setDisplayLocation(location)
      setPageEntering(true)

      window.setTimeout(() => {
        if (active) setPageEntering(false)
      }, 450)
    }

    runTransition()

    return () => {
      active = false
    }
  }, [location, displayLocation.pathname])

  return (
    <Routes location={displayLocation}>
      <Route path="/" element={<Layout contentRef={contentRef} pageEntering={pageEntering} />}>
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
