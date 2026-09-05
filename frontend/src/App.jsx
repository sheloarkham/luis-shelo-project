import { lazy, Suspense, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import MistPageTransition from './components/MistPageTransition'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import { usePageTransition } from './hooks/usePageTransition'
import './App.css'
import './components/PageTransition.css'

const Ocio = lazy(() => import('./pages/Ocio'))
const Presupuestos = lazy(() => import('./pages/Presupuestos'))
const Proyecto = lazy(() => import('./pages/Proyecto'))
const ProyectoFullstack = lazy(() => import('./pages/ProyectoFullstack'))
const ProyectoAutito = lazy(() => import('./pages/ProyectoAutito'))
const Books = lazy(() => import('./pages/Books'))
const Carrera = lazy(() => import('./pages/Carrera'))
const Gym = lazy(() => import('./pages/Gym'))
const Yeni = lazy(() => import('./pages/yeni/Yeni'))
const Chat = lazy(() => import('./pages/Chat'))

function LazyPage({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

function AppRoutes() {
  const contentRef = useRef(null)
  const { displayLocation, mistPhase } = usePageTransition(contentRef)

  return (
    <>
      <MistPageTransition phase={mistPhase} />
      <Routes location={displayLocation}>
        <Route path="/" element={<Layout contentRef={contentRef} />}>
          <Route index element={<Home />} />
          <Route path="ocio" element={<LazyPage><Ocio /></LazyPage>} />
          <Route path="presupuestos" element={<LazyPage><Presupuestos /></LazyPage>} />
          <Route path="proyectos" element={<LazyPage><Proyecto /></LazyPage>} />
          <Route path="proyectos/fullstack" element={<LazyPage><ProyectoFullstack /></LazyPage>} />
          <Route path="proyectos/autito" element={<LazyPage><ProyectoAutito /></LazyPage>} />
          <Route path="proyectos/escritos" element={<LazyPage><Books /></LazyPage>} />
          <Route path="proyecto" element={<Navigate to="/proyectos" replace />} />
          <Route path="books" element={<Navigate to="/proyectos/escritos" replace />} />
          <Route path="carrera" element={<LazyPage><Carrera /></LazyPage>} />
          <Route path="gym" element={<LazyPage><Gym /></LazyPage>} />
          <Route path="yeni" element={<LazyPage><Yeni /></LazyPage>} />
          <Route path="chat" element={<LazyPage><Chat /></LazyPage>} />
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
