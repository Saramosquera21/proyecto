import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Inicio from '@/pages/Inicio.tsx'
import Lugares from '@/pages/Lugares.tsx'
import Perfil from '@/pages/Perfil.tsx'
import Personas from '@/pages/Personas.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/Inicio' element={<Inicio />} />
      <Route path='/Lugares' element={<Lugares />} />
      <Route path='/Perfil' element={<Perfil />} />
      <Route path='/Personas' element={<Personas />} />

    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
