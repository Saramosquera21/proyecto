import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Registro() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMensaje("")
    
    try {
      const res = await fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
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
      overflow: "hidden"
    }}>
      {/* Fondo urbano con gradiente */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
        zIndex: 0
      }} />
      
      {/* Patrones urbanos */}
      <div style={{
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(155, 89, 182, 0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        zIndex: 0
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: "5%",
        width: "200px",
        height: "200px",
        background: "radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        zIndex: 0
      }} />

      {/* Contenido principal */}
      <div style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        {/* Tarjeta de registro */}
        <div style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          position: "relative"
        }}>
          {/* Header con efecto neón */}
          <div style={{
            background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
            padding: "30px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Efecto brillo */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              animation: "shine 3s infinite"
            }} />
            
            <h1 style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}>
              Únete al Parche
            </h1>
            <p style={{
              margin: "10px 0 0 0",
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: 500
            }}>
              Encuentra los mejores planes de Medellín
            </p>
            
            {/* Icono de ubicación */}
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
              <span style={{ fontSize: "28px", color: "white" }}>📍</span>
            </div>
          </div>

          {/* Formulario */}
          <div style={{ padding: "40px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Campo Nombre */}
              <div style={{ position: "relative" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  👤 Tu Nombre
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
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder="Ej: Carlos 'El Parchero'"
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
                    👤
                  </span>
                </div>
              </div>

              {/* Campo Email */}
              <div style={{ position: "relative" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  📧 Email
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ejemplo@medellinparches.com"
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
                    📧
                  </span>
                </div>
              </div>

              {/* Campo Contraseña */}
              <div style={{ position: "relative" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  🔒 Contraseña
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
                <div style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span>💡 Usa mayúsculas, números y símbolos</span>
                </div>
              </div>

              {/* Botón de registro */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "18px",
                  background: loading 
                    ? "#475569" 
                    : "linear-gradient(90deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  position: "relative",
                  overflow: "hidden",
                  marginTop: "10px"
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(139, 92, 246, 0.4)"
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
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <div style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid white",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                      }} />
                      Creando cuenta...
                    </span>
                  </>
                ) : (
                  "🎉 Crear Cuenta"
                )}
              </button>

              {/* Mensaje de estado */}
              {mensaje && (
                <div style={{
                  padding: "16px",
                  backgroundColor: mensaje.includes("Error") ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
                  border: `1px solid ${mensaje.includes("Error") ? "#ef4444" : "#22c55e"}`,
                  borderRadius: "12px",
                  color: mensaje.includes("Error") ? "#fca5a5" : "#86efac",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 600
                }}>
                  {mensaje.includes("Error") ? "❌" : "✅"} {mensaje}
                </div>
              )}
            </form>

            {/* Enlace a login */}
            <div style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center"
            }}>
              <p style={{
                margin: 0,
                color: "#94a3b8",
                fontSize: "15px"
              }}>
                ¿Ya haces parte del parche?
              </p>
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "12px",
                  padding: "12px 24px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#cbd5e1",
                  textDecoration: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                <span>👥</span>
                Iniciar Sesión
              </Link>
            </div>
          </div>

          {/* Footer de la tarjeta */}
          <div style={{
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            fontSize: "12px",
            color: "#64748b",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)"
          }}>
            <p style={{ margin: 0 }}>
              Al registrarte aceptas nuestros <span style={{ color: "#8b5cf6", cursor: "pointer" }}>Términos</span> y{" "}
              <span style={{ color: "#8b5cf6", cursor: "pointer" }}>Política de Privacidad</span>
            </p>
          </div>
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
        
        /* Efecto de escritura para inputs */
        input::placeholder {
          color: #64748b;
          transition: all 0.3s ease;
        }
        
        input:focus::placeholder {
          opacity: 0.5;
        }
        
        /* Scrollbar personalizada */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #8b5cf6;
        }
      `}</style>
    </div>
  )
}