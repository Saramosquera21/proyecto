import { Link } from "react-router-dom"

export default function Menu() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#eee" }}>
      <Link to="/home">Inicio</Link>
      <Link to="/perfil">Perfil</Link>
      <Link to="/personas">Personas</Link>
      <Link to="/lugares">Lugares</Link>
      <Link to="/eventos" className="px-3 py-2 hover:text-blue-600">
      Eventos
      </Link>

    </nav>
  )
}
