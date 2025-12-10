import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function RegisterForm() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensaje("")
    
    // Validaciones
    if (password !== confirmPassword) {
      setMensaje("❌ Las contraseñas no coinciden")
      return
    }
    
    if (password.length < 6) {
      setMensaje("❌ La contraseña debe tener al menos 6 caracteres")
      return
    }
    
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
        // Limpiar formulario
        setNombre("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        
        // Mostrar mensaje de éxito y redirigir
        setMensaje("✅ ¡Registro exitoso! Redirigiendo al login...")
        setTimeout(() => navigate("/"), 2000)
      }
    } catch {
      setMensaje("⚠️ Error en el servidor. Intenta de nuevo.")
    } finally {
      setLoading(false)
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
        maxWidth: "500px",
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
          background: "linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)",
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
            background: "linear-gradient(135deg, #10b981, #3b82f6)",
            borderRadius: "20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
            animation: "float 3s ease-in-out infinite"
          }}>
            <span style={{ fontSize: "40px", color: "white" }}>🚀</span>
          </div>
          <h2 style={{
            margin: "0 0 8px 0",
            fontSize: "32px",
            fontWeight: 800,
            color: "white",
            background: "linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Únete a la comunidad
          </h2>
          <p style={{
            margin: 0,
            fontSize: "16px",
            color: "#94a3b8"
          }}>
            Crea tu cuenta y comienza a explorar
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Campo Nombre */}
          <div>
            <label htmlFor="nombre" style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#e2e8f0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              👤 Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={loading}
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
                e.target.style.borderColor = "#10b981"
                e.target.style.background = "rgba(16, 185, 129, 0.05)"
                e.target.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.1)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#475569"
                e.target.style.background = "rgba(255, 255, 255, 0.05)"
                e.target.style.boxShadow = "none"
              }}
            />
          </div>

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
              disabled={loading}
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
            <label htmlFor="password" style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#e2e8f0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              🔑 Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px 50px 16px 20px",
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "18px",
                  padding: "5px",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#60a5fa"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#94a3b8"
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <p style={{
              fontSize: "12px",
              color: "#64748b",
              margin: "8px 0 0 0",
              fontStyle: "italic"
            }}>
              La contraseña debe tener al menos 6 caracteres
            </p>
          </div>

          {/* Campo Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#e2e8f0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              🔒 Confirmar contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px 50px 16px 20px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid #475569",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  fontFamily: "inherit"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#10b981"
                  e.target.style.background = "rgba(16, 185, 129, 0.05)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#475569"
                  e.target.style.background = "rgba(255, 255, 255, 0.05)"
                  e.target.style.boxShadow = "none"
                }}
              />
              {password && confirmPassword && password === confirmPassword && (
                <div style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#10b981",
                  fontSize: "18px"
                }}>
                  ✅
                </div>
              )}
            </div>
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              background: loading 
                ? "linear-gradient(135deg, #475569, #64748b)" 
                : "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.4)"
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }
            }}
          >
            {loading ? (
              <>
                <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span>
                Creando tu cuenta...
              </>
            ) : (
              "🚀 Crear cuenta"
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

        {/* Enlace a login */}
        <div style={{
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid #334155",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "15px"
        }}>
          <p style={{ margin: "0 0 15px 0" }}>
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/"
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
              Inicia sesión aquí
            </Link>
          </p>
          
          {/* Beneficios de registro */}
          <div style={{
            background: "rgba(30, 41, 59, 0.5)",
            borderRadius: "15px",
            padding: "20px",
            marginTop: "20px",
            border: "1px solid #334155"
          }}>
            <h4 style={{
              margin: "0 0 15px 0",
              fontSize: "16px",
              fontWeight: 600,
              color: "#f1f5f9",
              textAlign: "center"
            }}>
              🎁 Beneficios de registrarte
            </h4>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
              fontSize: "13px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#cbd5e1" }}>
                <span>⭐</span>
                <span>Guardar favoritos</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#cbd5e1" }}>
                <span>🤝</span>
                <span>Conectar con otros</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#cbd5e1" }}>
                <span>📱</span>
                <span>Sincronización</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#cbd5e1" }}>
                <span>🔔</span>
                <span>Notificaciones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Efectos de fondo */}
        <div style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        form {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}