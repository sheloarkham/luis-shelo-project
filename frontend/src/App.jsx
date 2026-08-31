import { useEffect, useRef, useState } from 'react'

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'

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

import {

  getPageTransitionKind,

  getTransitionDirection,

  PAGE_TRANSITION,

  runMistClose,

  runMistOpen,

} from './utils/pageTransition'

import './App.css'



function AppRoutes() {

  const location = useLocation()

  const [displayLocation, setDisplayLocation] = useState(location)

  const [enterDirection, setEnterDirection] = useState(null)

  const [mistPhase, setMistPhase] = useState(null)

  const contentRef = useRef(null)

  const isFirstMount = useRef(true)

  const prefersReducedMotion = useRef(

    typeof window !== 'undefined' &&

    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  )



  useEffect(() => {

    if (isFirstMount.current) {

      isFirstMount.current = false

      return undefined

    }



    if (location.pathname === displayLocation.pathname) {

      return undefined

    }



    let active = true

    const shell = contentRef.current



    const runTransition = async () => {

      const transitionKind = prefersReducedMotion.current

        ? PAGE_TRANSITION.NONE

        : getPageTransitionKind(displayLocation.pathname, location.pathname)



      const direction = getTransitionDirection(displayLocation.pathname, location.pathname)



      if (transitionKind === PAGE_TRANSITION.MIST) {

        shell?.classList.add(`page-transition-shell--exit-${direction}`)

        await runMistClose(setMistPhase, direction)

        shell?.classList.remove(`page-transition-shell--exit-${direction}`)

      }



      if (!active) return



      window.scrollTo(0, 0)

      setDisplayLocation(location)



      if (transitionKind === PAGE_TRANSITION.MIST) {

        setEnterDirection(direction)

        await runMistOpen(setMistPhase, direction)

        if (active) setEnterDirection(null)

      }

    }



    runTransition()



    return () => {

      active = false

    }

  }, [location, displayLocation.pathname])



  return (

    <>

      <MistPageTransition phase={mistPhase} />

      <Routes location={displayLocation}>

        <Route path="/" element={<Layout contentRef={contentRef} enterDirection={enterDirection} />}>

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

