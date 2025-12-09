// src/components/RegisterForm.tsx
import React, { useState } from "react"

export default function RegisterForm() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensaje("")
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
      })
      const data = await res.json()
      setMensaje(data.message)
      if (res.ok) {
        setNombre("")
        setEmail("")
        setPassword("")
      }
    } catch {
      setMensaje("Error en el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: 380 }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}
