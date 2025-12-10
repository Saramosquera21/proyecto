import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCargando(true)
    setMensaje("")
    
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        setMensaje("✅ ¡Inicio de sesión exitoso! Redirigiendo...")
        setTimeout(() => navigate("/home"), 1500)
      } else {
        setMensaje(data.message || "❌ Error en las credenciales")
      }
    } catch {
      setMensaje("⚠️ Error en el servidor. Intenta de nuevo.")
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "450px",
        padding: "40px 35px",
        background: "linear-gradient(145deg, #1e293b, #0f172a)",
        borderRadius: "25px",
        border: "1px solid #334155",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Línea decorativa superior */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #d946ef)",
          borderRadius: "25px 25px 0 0"
        }} />

        {/* Logo/Icono */}
        <div style={{
          textAlign: "center",
          marginBottom: "30px"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: "20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
          }}>
            <span style={{ fontSize: "40px", color: "white" }}>🔐</span>
          </div>
          <h2 style={{
            margin: "0 0 8px 0",
            fontSize: "32px",
            fontWeight: 800,
            color: "white",
            background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Bienvenido de vuelta
          </h2>
          <p style={{
            margin: 0,
            fontSize: "16px",
            color: "#94a3b8"
          }}>
            Inicia sesión para continuar tu experiencia
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Campo Email */}
          <div>
            <label htmlFor="email" style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#e2e8f0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              📧 Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={cargando}
              style={{
                width: "100%",
                padding: "16px 20px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "2px solid #475569",
                borderRadius: "12px",
                color: "#f1f5f9",
                fontSize: "16px",
                transition: "all 0.3s ease",
                fontFamily: "inherit"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6"
                e.target.style.background = "rgba(59, 130, 246, 0.05)"
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#475569"
                e.target.style.background = "rgba(255, 255, 255, 0.05)"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label htmlFor="password" style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#e2e8f0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                🔑 Contraseña
              </label>
              <Link
                to="/forgot-password"
                style={{
                  background: "none",
                  border: "none",
                  color: "#60a5fa",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#93c5fd"
                  e.currentTarget.style.textDecoration = "underline"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#60a5fa"
                  e.currentTarget.style.textDecoration = "none"
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={cargando}
              style={{
                width: "100%",
                padding: "16px 20px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "2px solid #475569",
                borderRadius: "12px",
                color: "#f1f5f9",
                fontSize: "16px",
                transition: "all 0.3s ease",
                fontFamily: "inherit"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6"
                e.target.style.background = "rgba(59, 130, 246, 0.05)"
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#475569"
                e.target.style.background = "rgba(255, 255, 255, 0.05)"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              padding: "18px",
              background: cargando 
                ? "linear-gradient(135deg, #475569, #64748b)" 
                : "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: cargando ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px"
            }}
            onMouseEnter={(e) => {
              if (!cargando) {
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(59, 130, 246, 0.4)"
              }
            }}
            onMouseLeave={(e) => {
              if (!cargando) {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }
            }}
          >
            {cargando ? (
              <>
                <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span>
                Procesando...
              </>
            ) : (
              "🚀 Iniciar Sesión"
            )}
          </button>
        </form>

        {/* Mensaje de estado */}
        {mensaje && (
          <div style={{
            marginTop: "20px",
            padding: "15px",
            background: mensaje.includes("✅") 
              ? "rgba(34, 197, 94, 0.1)" 
              : mensaje.includes("❌") 
                ? "rgba(239, 68, 68, 0.1)" 
                : "rgba(245, 158, 11, 0.1)",
            color: mensaje.includes("✅") 
              ? "#4ade80" 
              : mensaje.includes("❌") 
                ? "#f87171" 
                : "#fbbf24",
            borderRadius: "12px",
            border: "1px solid",
            borderColor: mensaje.includes("✅") 
              ? "rgba(34, 197, 94, 0.3)" 
              : mensaje.includes("❌") 
                ? "rgba(239, 68, 68, 0.3)" 
                : "rgba(245, 158, 11, 0.3)",
            textAlign: "center",
            fontWeight: 500,
            fontSize: "14px"
          }}>
            {mensaje}
          </div>
        )}

        {/* Enlace a registro */}
        <div style={{
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid #334155",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "15px"
        }}>
          <p style={{ margin: "0 0 15px 0" }}>
            ¿No tienes cuenta?{" "}
            <Link
              to="/registro"
              style={{
                color: "#60a5fa",
                textDecoration: "none",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#93c5fd"
                e.currentTarget.style.textDecoration = "underline"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#60a5fa"
                e.currentTarget.style.textDecoration = "none"
              }}
            >
              ¡Regístrate ahora!
            </Link>
          </p>
          
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "20px",
            border: "1px solid #334155"
          }}>
            <span style={{ fontSize: "12px" }}>⚡</span>
            <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
              Únete a nuestra comunidad
            </span>
            <span style={{ fontSize: "12px" }}>⚡</span>
          </div>
        </div>

        {/* Efectos de fondo */}
        <div style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          zIndex: 0
        }} />

        <div style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "160px",
          height: "160px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(25px)",
          zIndex: 0
        }} />
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .login-icon {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}