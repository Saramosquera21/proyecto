import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Menu from "../components/Menu"
import { lugares } from "../lib/lugaresData"

export default function Home() {
  const navigate = useNavigate()

  // Estado del feed de lugares
  const [feed, setFeed] = useState(lugares.slice(0, 15))
  const [mensaje, setMensaje] = useState("")

  // Función para refrescar el feed mezclando lugares
  const actualizarFeed = () => {
    const mezclados = [...lugares].sort(() => Math.random() - 0.5)
    setFeed(mezclados.slice(0, 15))
    setMensaje("Feed actualizado ✅")
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Menu />
      
      {/* Header principal */}
      <div style={{
        padding: "40px 20px 30px",
        textAlign: "center",
        background: "linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Efectos de fondo */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)"
        }} />
        
        <h1 style={{
          margin: "0 0 15px 0",
          fontSize: "48px",
          fontWeight: 800,
          color: "white",
          background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.5px",
          position: "relative",
          zIndex: 1
        }}>
          ¡Bienvenido al Parche!
        </h1>
        
        <p style={{
          margin: "0 auto",
          fontSize: "18px",
          color: "#cbd5e1",
          maxWidth: "600px",
          lineHeight: "1.6",
          position: "relative",
          zIndex: 1,
          fontWeight: 500
        }}>
          Descubre los mejores lugares de Medellín para tu próximo plan
        </p>
        
        {/* Estadísticas */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "30px",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1
        }}>
          {[
            { numero: lugares.length, texto: "Lugares", color: "#3b82f6" },
            { numero: "50+", texto: "Eventos", color: "#8b5cf6" },
            { numero: "4.5⭐", texto: "Rating Promedio", color: "#10b981" }
          ].map((stat, idx) => (
            <div key={idx} style={{
              textAlign: "center",
              padding: "15px 25px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              border: `1px solid ${stat.color}20`,
              backdropFilter: "blur(10px)"
            }}>
              <div style={{
                fontSize: "32px",
                fontWeight: 800,
                color: stat.color,
                marginBottom: "5px"
              }}>
                {stat.numero}
              </div>
              <div style={{
                fontSize: "14px",
                color: "#94a3b8",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                {stat.texto}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        padding: "30px 20px 50px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* Sección de lugares */}
        <div style={{
          marginBottom: "40px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            flexWrap: "wrap",
            gap: "15px"
          }}>
            <h2 style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 700,
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#3b82f6",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px"
              }}>
                🌆
              </span>
              Lugares Recomendados
            </h2>
            
            <div style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap"
            }}>
              <span style={{
                padding: "8px 16px",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                color: "#60a5fa",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: 600,
                border: "1px solid rgba(59, 130, 246, 0.3)"
              }}>
                {feed.length} lugares
              </span>
            </div>
          </div>

          {/* Tarjetas de vista previa */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px"
          }}>
            {feed.map(lugar => (
              <div
                key={lugar.id}
                style={{
                  backgroundColor: "#1e293b",
                  borderRadius: "18px",
                  padding: "20px",
                  border: "1px solid #334155",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)"
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.3)"
                  e.currentTarget.style.borderColor = "#3b82f6"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "#334155"
                }}
              >
                {/* Badge de reseña */}
                {lugar.resena && (
                  <div style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    backgroundColor: "#f59e0b",
                    color: "#1e293b",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 800,
                    zIndex: 2
                  }}>
                    {lugar.resena.split(" ")[0]}
                  </div>
                )}
                
                {/* Imagen con overlay */}
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "18px"
                }}>
                  <img
                    src={lugar.imagen}
                    alt={lugar.nombre}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                    padding: "15px",
                    color: "white"
                  }}>
                    <div style={{
                      fontSize: "12px",
                      color: "#cbd5e1",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      {lugar.etiquetas[0]}
                    </div>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <h3 style={{
                  margin: "0 0 10px 0",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: "1.3"
                }}>
                  {lugar.nombre}
                </h3>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "#94a3b8",
                  fontSize: "14px"
                }}>
                  <span>📍</span>
                  <span style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {lugar.direccion}
                  </span>
                </div>

                <p style={{
                  margin: "0 0 15px 0",
                  fontSize: "14px",
                  color: "#cbd5e1",
                  lineHeight: "1.5",
                  height: "63px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical"
                }}>
                  {lugar.descripcion}
                </p>

                {/* Etiquetas */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "15px"
                }}>
                  {lugar.etiquetas.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: idx === 0 ? "rgba(59, 130, 246, 0.2)" : "rgba(148, 163, 184, 0.1)",
                        color: idx === 0 ? "#60a5fa" : "#94a3b8",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {lugar.etiquetas.length > 3 && (
                    <span style={{
                      backgroundColor: "rgba(148, 163, 184, 0.1)",
                      color: "#94a3b8",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px"
                    }}>
                      +{lugar.etiquetas.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{
          textAlign: "center",
          marginTop: "50px",
          padding: "30px",
          backgroundColor: "rgba(30, 41, 59, 0.5)",
          borderRadius: "20px",
          border: "1px solid #334155",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px"
          }}>
            {/* Ver más lugares */}
            <button
              onClick={() => navigate("/lugares")}
              style={{
                padding: "16px 32px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                minWidth: "200px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb"
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(59, 130, 246, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <span style={{ fontSize: "20px" }}>🌐</span>
              Explorar Todos los Lugares
            </button>

            {/* Actualizar feed */}
            <button
              onClick={actualizarFeed}
              style={{
                padding: "16px 32px",
                backgroundColor: "#f59e0b",
                color: "#1e293b",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                minWidth: "200px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d97706"
                e.currentTarget.style.color = "white"
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(245, 158, 11, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f59e0b"
                e.currentTarget.style.color = "#1e293b"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <span style={{ fontSize: "20px" }}>🔄</span>
              Mezclar Lugares
            </button>
          </div>

          {/* Dar opinión sobre la interfaz */}
          <div style={{ marginTop: "25px" }}>
            <button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeCKUk760CMA-uOk982i01i7E19sD3suRvlx2qp5WGT7WV5Sw/viewform?usp=dialog",
                  "_blank"
                )
              }
              style={{
                padding: "14px 28px",
                backgroundColor: "transparent",
                color: "#10b981",
                border: "2px solid #10b981",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 auto",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.1)"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <span style={{ fontSize: "18px" }}>💬</span>
              Dar mi opinión sobre la interfaz
            </button>
          </div>

          {/* Mensaje de confirmación */}
          {mensaje && (
            <div style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              color: "#86efac",
              borderRadius: "12px",
              border: "1px solid #22c55e",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: 600,
              animation: "fadeIn 0.3s ease"
            }}>
              <span style={{ fontSize: "18px" }}>✅</span>
              {mensaje}
            </div>
          )}
        </div>

        {/* Footer informativo */}
        <div style={{
          marginTop: "50px",
          padding: "25px",
          backgroundColor: "rgba(30, 41, 59, 0.5)",
          borderRadius: "16px",
          border: "1px solid #334155",
          textAlign: "center"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginBottom: "20px"
          }}>
            {[
              { icon: "🎯", text: "Descubre nuevos lugares" },
              { icon: "⭐", text: "Califica tus experiencias" },
              { icon: "📅", text: "Planifica tus salidas" }
            ].map((item, idx) => (
              <div key={idx} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#cbd5e1",
                fontSize: "15px",
                fontWeight: 500
              }}>
                <span style={{ fontSize: "24px" }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          
          <p style={{
            margin: 0,
            fontSize: "14px",
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Únete a la comunidad que está descubriendo los mejores parches de Medellín
          </p>
        </div>
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}