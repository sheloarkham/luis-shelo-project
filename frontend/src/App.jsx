import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Ocio from './pages/Ocio'
import Presupuestos from './pages/Presupuestos'
import Proyecto from './pages/Proyecto'
import Carrera from './pages/Carrera'
import Gym from './pages/Gym'
import Yeni from './pages/Yeni'
import Books from './pages/Books'
import Chat from './pages/Chat'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
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
    </Router>
  )
}

export default App
