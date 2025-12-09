import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMensaje("")
    
    try {
      const res = await fetch(`http://localhost:3000/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      setMensaje(data.message)
      
      if (res.ok) {
        setTimeout(() => {
          navigate("/")
        }, 1500)
      }
    } catch {
      setMensaje("Error en el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      {/* Fondo con efectos */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)
        `
      }} />
      
      {/* Tarjeta de reset */}
      <div style={{
        width: "100%",
        maxWidth: "480px",
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        position: "relative",
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(90deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)",
          padding: "35px 30px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
            animation: "shine 3s infinite"
          }} />
          
          <h1 style={{
            margin: "0 0 10px 0",
            fontSize: "32px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "0.5px"
          }}>
            🔐 Nueva Contraseña
          </h1>
          <p style={{
            margin: 0,
            fontSize: "15px",
            color: "rgba(255, 255, 255, 0.8)",
            fontWeight: 500
          }}>
            Crea una nueva contraseña segura para tu cuenta
          </p>
          
          {/* Icono de seguridad */}
          <div style={{
            width: "60px",
            height: "60px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px auto 0",
            border: "2px solid rgba(255, 255, 255, 0.3)"
          }}>
            <span style={{ fontSize: "28px", color: "white" }}>🔒</span>
          </div>
        </div>

        {/* Formulario */}
        <div style={{ padding: "40px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Campo de contraseña */}
            <div style={{ position: "relative" }}>
              <label style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                🔑 Nueva Contraseña
              </label>
              <div style={{
                position: "relative",
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                borderRadius: "12px",
                border: "2px solid #334155",
                transition: "all 0.3s ease",
                overflow: "hidden"
              }}>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Mínimo 8 caracteres"
                  style={{
                    width: "100%",
                    padding: "16px 20px 16px 50px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#6366f1"
                    e.target.parentElement.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)"
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#334155"
                    e.target.parentElement.style.boxShadow = "none"
                  }}
                />
                <span style={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748b",
                  fontSize: "18px"
                }}>
                  🔒
                </span>
              </div>
              
              {/* Requisitos de contraseña */}
              <div style={{
                marginTop: "12px",
                padding: "12px",
                backgroundColor: "rgba(30, 41, 59, 0.3)",
                borderRadius: "8px",
                border: "1px solid #334155"
              }}>
                <div style={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontWeight: 600,
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  ⚡ Requisitos de seguridad:
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "8px",
                  fontSize: "12px",
                  color: "#94a3b8"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: password.length >= 8 ? "#10b981" : "#64748b"
                    }} />
                    <span>8+ caracteres</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: /[A-Z]/.test(password) ? "#10b981" : "#64748b"
                    }} />
                    <span>Mayúsculas</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: /\d/.test(password) ? "#10b981" : "#64748b"
                    }} />
                    <span>Números</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: /[^A-Za-z0-9]/.test(password) ? "#10b981" : "#64748b"
                    }} />
                    <span>Símbolos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de cambio */}
            <button
              type="submit"
              disabled={loading || password.length < 8}
              style={{
                padding: "18px",
                background: loading 
                  ? "#475569" 
                  : password.length >= 8
                    ? "linear-gradient(90deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)"
                    : "linear-gradient(90deg, #475569 0%, #334155 50%, #1e293b 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: password.length >= 8 && !loading ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "1px",
                position: "relative",
                overflow: "hidden",
                marginTop: "10px"
              }}
              onMouseEnter={(e) => {
                if (password.length >= 8 && !loading) {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(139, 92, 246, 0.4)"
                }
              }}
              onMouseLeave={(e) => {
                if (password.length >= 8 && !loading) {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <div style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid white",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  Procesando...
                </span>
              ) : (
                "🔄 Cambiar Contraseña"
              )}
            </button>

            {/* Mensaje de estado */}
            {mensaje && (
              <div style={{
                padding: "16px",
                backgroundColor: mensaje.includes("Error") || mensaje.includes("inválido") 
                  ? "rgba(239, 68, 68, 0.1)" 
                  : "rgba(34, 197, 94, 0.1)",
                border: `1px solid ${
                  mensaje.includes("Error") || mensaje.includes("inválido") 
                    ? "#ef4444" 
                    : "#22c55e"
                }`,
                borderRadius: "12px",
                color: mensaje.includes("Error") || mensaje.includes("inválido") 
                  ? "#fca5a5" 
                  : "#86efac",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px"
              }}>
                {mensaje.includes("Error") || mensaje.includes("inválido") ? "❌" : "✅"} {mensaje}
              </div>
            )}
          </form>

          {/* Información adicional */}
          <div style={{
            marginTop: "30px",
            paddingTop: "25px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center"
          }}>
            <div style={{
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
                marginBottom: "8px"
              }}>
                <span style={{ color: "#60a5fa", fontSize: "18px" }}>💡</span>
                <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: 600 }}>
                  Consejos de seguridad
                </span>
              </div>
              <p style={{
                margin: 0,
                fontSize: "13px",
                color: "#94a3b8",
                lineHeight: "1.5"
              }}>
                Usa una contraseña única que no hayas utilizado en otros sitios y combina letras, números y símbolos
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                padding: "12px 24px",
                backgroundColor: "transparent",
                color: "#cbd5e1",
                border: "1px solid #475569",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                e.currentTarget.style.borderColor = "#6366f1"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.borderColor = "#475569"
              }}
            >
              ← Volver al inicio de sesión
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          fontSize: "12px",
          color: "#64748b",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          <p style={{ margin: 0 }}>
            Tu seguridad es importante para nosotros. Todos los datos están encriptados.
          </p>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input::placeholder {
          color: #64748b;
          transition: all 0.3s ease;
        }
        
        input:focus::placeholder {
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}