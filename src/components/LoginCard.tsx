// src/components/LoginCard.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
      localStorage.setItem("token", data.token)
      navigate("/home")     // ✅ ahora te lleva al Home
      } else {
        setMensaje(data.message)
      }
    } catch {
      setMensaje("Error en el servidor")
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, maxWidth: 400 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="password">Contraseña</label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ padding: 10, backgroundColor: "blue", color: "white", borderRadius: 4 }}>
          Login
        </button>
      </form>
      {mensaje && <p style={{ marginTop: 12, color: "red" }}>{mensaje}</p>}
      <div style={{ marginTop: 12 }}>
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => navigate("/registro")}
          style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
        >
          Regístrate
        </button>
      </div>
    </div>
  )
}
