import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import PageDisintegration from './components/PageDisintegration'
import Home from './pages/Home'
import Ocio from './pages/Ocio'
import Presupuestos from './pages/Presupuestos'
import Proyecto from './pages/Proyecto'
import Carrera from './pages/Carrera'
import Gym from './pages/Gym'
import Yeni from './pages/Yeni'
import Books from './pages/Books'
import Chat from './pages/Chat'
import { runPageDisintegration } from './utils/pageDisintegration'
import './App.css'

function AppRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [pageEntering, setPageEntering] = useState(false)
  const contentRef = useRef(null)
  const canvasRef = useRef(null)
  const isFirstMount = useRef(true)
  const transitionLock = useRef(false)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return undefined
    }

    if (location.pathname === displayLocation.pathname || transitionLock.current) {
      return undefined
    }

    let cancelled = false
    transitionLock.current = true

    const transition = async () => {
      await runPageDisintegration(contentRef.current, canvasRef.current)

      if (cancelled) return

      setDisplayLocation(location)
      setPageEntering(true)

      window.setTimeout(() => {
        if (!cancelled) {
          setPageEntering(false)
        }
        transitionLock.current = false
      }, 760)
    }

    transition()

    return () => {
      cancelled = true
    }
  }, [location, displayLocation])

  return (
    <>
      <PageDisintegration ref={canvasRef} />
      <Routes location={displayLocation}>
        <Route path="/" element={<Layout contentRef={contentRef} pageEntering={pageEntering} />}>
          <Route index element={<Home />} />
          <Route path="ocio" element={<Ocio />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="proyecto" element={<Proyecto />} />
          <Route path="carrera" element={<Carrera />} />
          <Route path="gym" element={<Gym />} />
          <Route path="yeni" element={<Yeni />} />
          <Route path="books" element={<Books />} />
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
