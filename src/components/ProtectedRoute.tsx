import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { getToken } from "../lib/storage"

type Props = { children: React.ReactNode }

export default function ProtectedRoute({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [redirectCount, setRedirectCount] = useState(5)

  useEffect(() => {
    const token = getToken()
    setIsAuthenticated(!!token)
    
    if (!token) {
      setShowModal(true)
      
      // Contador regresivo para redirigir
      const countdown = setInterval(() => {
        setRedirectCount(prev => {
          if (prev <= 1) {
            clearInterval(countdown)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Redirigir automáticamente después de 5 segundos
      const timeout = setTimeout(() => {
        setShowModal(false)
      }, 5000)

      return () => {
        clearInterval(countdown)
        clearTimeout(timeout)
      }
    }
  }, [])

  // Si aún está verificando
  if (isAuthenticated === null) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{
          textAlign: "center",
          padding: "40px"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "spin 1.5s linear infinite",
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
          }}>
            <span style={{ fontSize: "32px", color: "white" }}>🔒</span>
          </div>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#f1f5f9",
            marginBottom: "10px",
            background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Verificando acceso...
          </h2>
          <p style={{
            color: "#94a3b8",
            fontSize: "16px",
            maxWidth: "400px",
            margin: "0 auto",
            lineHeight: "1.5"
          }}>
            Estamos verificando tu sesión para garantizar tu seguridad
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  // Si no está autenticado, mostrar modal y redirigir
  if (!isAuthenticated) {
    return (
      <>
        {/* Modal de acceso denegado */}
        {showModal && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
            animation: "fadeIn 0.3s ease"
          }}>
            <div style={{
              background: "linear-gradient(145deg, #1e293b, #0f172a)",
              padding: "40px",
              borderRadius: "25px",
              maxWidth: "500px",
              width: "100%",
              border: "1px solid #475569",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Línea decorativa */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "5px",
                background: "linear-gradient(90deg, #ef4444, #f97316)",
                borderRadius: "25px 25px 0 0"
              }} />

              {/* Icono de advertencia */}
              <div style={{
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(245, 158, 11, 0.2))",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 25px",
                border: "2px solid rgba(239, 68, 68, 0.3)"
              }}>
                <span style={{ fontSize: "48px", color: "#f87171" }}>⚠️</span>
              </div>

              {/* Título */}
              <h2 style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#f1f5f9",
                marginBottom: "15px",
                background: "linear-gradient(90deg, #f87171, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Acceso Restringido
              </h2>

              {/* Mensaje */}
              <p style={{
                color: "#cbd5e1",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "25px"
              }}>
                Esta área está protegida y requiere autenticación. 
                Serás redirigido automáticamente a la página de inicio de sesión.
              </p>

              {/* Contador regresivo */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 24px",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#f87171",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: 700,
                border: "1px solid rgba(239, 68, 68, 0.3)",
                marginBottom: "30px"
              }}>
                <span>⏱️</span>
                <span>Redirigiendo en {redirectCount} segundos</span>
              </div>

              {/* Botones de acción */}
              <div style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center"
              }}>
                <button
                  onClick={() => {
                    setShowModal(false)
                    window.location.href = "/"
                  }}
                  style={{
                    padding: "14px 28px",
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)"
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  <span>🔑</span>
                  Ir a Login
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "14px 28px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#94a3b8",
                    border: "1px solid #475569",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                    e.currentTarget.style.color = "#f1f5f9"
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"
                    e.currentTarget.style.color = "#94a3b8"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  Cancelar
                </button>
              </div>

              {/* Información adicional */}
              <div style={{
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: "1px solid #334155",
                fontSize: "13px",
                color: "#64748b"
              }}>
                <p style={{ margin: 0 }}>
                  Si ya tienes una cuenta, asegúrate de haber iniciado sesión correctamente
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Redirigir al login después de 5 segundos */}
        {!showModal && <Navigate to="/" replace />}
      </>
    )
  }

  // Si está autenticado, mostrar contenido protegido
  return <>{children}</>
}

// Estilos CSS para animaciones
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`

// Agregar estilos al documento
const styleSheet = document.createElement("style")
styleSheet.textContent = styles
document.head.appendChild(styleSheet)