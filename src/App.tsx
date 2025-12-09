import { Routes, Route } from "react-router-dom"

// Páginas y componentes
import LoginCard from "./components/LoginCard"
import Registro from "./pages/Registro"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Perfil from "./pages/Perfil"
import Home from "./pages/Home"
import Lugares from "./pages/Lugares"
import Personas from "./pages/Personas"
import ConsejosPage from "./pages/ConsejosPage"   // 👈 nueva página
import TopPlaces from "./pages/TopPlaces"
import Eventos from "./pages/eventos"

export default function App() {
  return (
    <Routes>
      {/* Pantalla inicial: Login */}
      <Route path="/" element={<LoginCard />} />

      {/* Registro */}
      <Route path="/registro" element={<Registro />} />

      {/* Recuperación de contraseña */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Perfil */}
      <Route path="/perfil" element={<Perfil />} />

      {/* Home (Inicio después de login) */}
      <Route path="/home" element={<Home />} />

      {/* Lugares */}
      <Route path="/lugares" element={<Lugares />} />

      {/* Personas */}
      <Route path="/personas" element={<Personas />} />

      {/* Consejos */}
      <Route path="/consejos" element={<ConsejosPage />} />   {/* 👈 ruta nueva */}
    
    <Route path="/top-places" element={<TopPlaces />} />

    <Route path="/eventos" element={<Eventos />} />
    </Routes>
  )
}
