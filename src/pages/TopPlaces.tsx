import { Link } from "react-router-dom"
import { topPlaces } from "../lib/lugaresData"

export default function TopPlaces() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: "20px"
    }}>
      {/* Header */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 40px auto",
        padding: "40px 20px 30px",
        textAlign: "center",
        background: "linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderRadius: "20px",
        border: "1px solid #334155",
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
          background: "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)"
        }} />
        
        <h1 style={{
          margin: "0 0 12px 0",
          fontSize: "42px",
          fontWeight: 800,
          color: "white",
          background: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.5px",
          position: "relative",
          zIndex: 1
        }}>
          🏆 Top 10 Lugares Imperdibles
        </h1>
        
        <p style={{
          margin: "0 auto",
          fontSize: "18px",
          color: "#cbd5e1",
          maxWidth: "600px",
          lineHeight: "1.5",
          position: "relative",
          zIndex: 1,
          fontWeight: 500
        }}>
          Los lugares mejor calificados y más recomendados de Medellín
        </p>
        
        {/* Badge de top */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "rgba(245, 158, 11, 0.2)",
          color: "#fbbf24",
          borderRadius: "20px",
          fontSize: "16px",
          fontWeight: 600,
          border: "1px solid rgba(245, 158, 11, 0.3)",
          position: "relative",
          zIndex: 1
        }}>
          <span>⭐</span>
          <span>Selección especial de la comunidad</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 50px auto"
      }}>
        {/* Grid de tarjetas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "30px",
          marginBottom: "50px"
        }}>
          {topPlaces.map((lugar, index) => (
            <div
              key={lugar.id}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "20px",
                border: "1px solid #334155",
                overflow: "hidden",
                transition: "all 0.3s ease",
                position: "relative",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)"
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.4)"
                e.currentTarget.style.borderColor = "#f59e0b"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
                e.currentTarget.style.borderColor = "#334155"
              }}
            >
              {/* Número top */}
              <div style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                width: "40px",
                height: "40px",
                backgroundColor: index < 3 ? "#f59e0b" : "#475569",
                color: index < 3 ? "#1e293b" : "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 800,
                zIndex: 2,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
              }}>
                {index + 1}
              </div>

              {/* Imagen con overlay */}
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
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
                  padding: "15px"
                }}>
                  <div style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "5px"
                  }}>
                    {lugar.nombre}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#fbbf24",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    {lugar.tipo}
                  </div>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div style={{ padding: "25px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "15px",
                  color: "#94a3b8",
                  fontSize: "14px"
                }}>
                  <span>📍</span>
                  <span style={{ color: "#cbd5e1", fontWeight: 500 }}>
                    {lugar.direccion}
                  </span>
                </div>

                <p style={{
                  margin: "0 0 20px 0",
                  fontSize: "15px",
                  color: "#cbd5e1",
                  lineHeight: "1.6",
                  minHeight: "60px"
                }}>
                  {lugar.descripcion}
                </p>

                {/* Calificación */}
                <div style={{
                  padding: "15px",
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  borderRadius: "12px",
                  border: "1px solid #334155"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px"
                  }}>
                    <div style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#f59e0b",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      color: "#1e293b"
                    }}>
                      ⭐
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        marginBottom: "4px"
                      }}>
                        Calificación
                      </div>
                      <div style={{
                        fontSize: "16px",
                        color: "#fbbf24",
                        fontWeight: 700
                      }}>
                        {lugar.calificacion || "4.8/5 ⭐"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <div style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "30px",
          backgroundColor: "rgba(30, 41, 59, 0.5)",
          borderRadius: "20px",
          border: "1px solid #334155",
          backdropFilter: "blur(10px)"
        }}>
          <Link
            to="/home"
            style={{
              padding: "16px 32px",
              backgroundColor: "#10b981",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "all 0.3s ease",
              minWidth: "200px",
              justifyContent: "center"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#059669"
              e.currentTarget.style.transform = "translateY(-3px)"
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#10b981"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            ← Volver a Home
          </Link>
          
          <Link
            to="/lugares"
            style={{
              padding: "16px 32px",
              backgroundColor: "#3b82f6",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "all 0.3s ease",
              minWidth: "200px",
              justifyContent: "center"
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
            ← Ver Todos los Lugares
          </Link>
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
              { icon: "🎯", text: "Basado en reseñas reales" },
              { icon: "⭐", text: "Calificación promedio 4.5+" },
              { icon: "👥", text: "Recomendado por la comunidad" }
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
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Estos lugares han sido seleccionados basándose en calificaciones, 
            reseñas de usuarios y popularidad en la comunidad de Medellín.
          </p>
        </div>
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .top-1 {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}