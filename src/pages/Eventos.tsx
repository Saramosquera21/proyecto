import { Link } from "react-router-dom"
import { eventosFuturos } from "../lib/eventosData"
import type { Evento } from "../lib/eventosData"

export default function Eventos() {
  const hoy = new Date()
  
  const eventosFuturosFiltrados = eventosFuturos
    .filter((e: Evento) => new Date(e.fecha) >= hoy)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())

  const eventosPasados = eventosFuturos
    .filter((e: Evento) => new Date(e.fecha) < hoy)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())

  // Función para formatear fecha
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: "40px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: 800,
              color: "#1e293b",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              📅 Eventos de Medellín
            </h1>
            <p style={{
              margin: "10px 0 0 0",
              fontSize: "18px",
              color: "#64748b",
              maxWidth: "600px"
            }}>
              Descubre los próximos eventos y revive las experiencias pasadas
            </p>
          </div>

          {/* Botones de navegación */}
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <Link
              to="/home"
              style={{
                padding: "12px 24px",
                backgroundColor: "#10b981",
                color: "white",
                textDecoration: "none",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(16, 185, 129, 0.3)"
              }}
            >
              ← Volver a Home
            </Link>
            
            <Link
              to="/lugares"
              style={{
                padding: "12px 24px",
                backgroundColor: "#3b82f6",
                color: "white",
                textDecoration: "none",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(59, 130, 246, 0.3)"
              }}
            >
              ← Ver Lugares
            </Link>
          </div>
        </div>

        {/* Estadísticas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
            textAlign: "center",
            border: "2px solid #6366f1"
          }}>
            <div style={{
              fontSize: "40px",
              fontWeight: 800,
              color: "#6366f1",
              marginBottom: "10px"
            }}>
              {eventosFuturosFiltrados.length}
            </div>
            <div style={{
              fontSize: "16px",
              color: "#475569",
              fontWeight: 600
            }}>
              Próximos Eventos
            </div>
          </div>

          <div style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
            textAlign: "center",
            border: "2px solid #10b981"
          }}>
            <div style={{
              fontSize: "40px",
              fontWeight: 800,
              color: "#10b981",
              marginBottom: "10px"
            }}>
              {eventosPasados.length}
            </div>
            <div style={{
              fontSize: "16px",
              color: "#475569",
              fontWeight: 600
            }}>
              Eventos Pasados
            </div>
          </div>

          <div style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
            textAlign: "center",
            border: "2px solid #f59e0b"
          }}>
            <div style={{
              fontSize: "40px",
              fontWeight: 800,
              color: "#f59e0b",
              marginBottom: "10px"
            }}>
              {eventosFuturos.length}
            </div>
            <div style={{
              fontSize: "16px",
              color: "#475569",
              fontWeight: 600
            }}>
              Total de Eventos
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "40px"
      }}>
        {/* Eventos Futuros */}
        <section>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "25px",
            flexWrap: "wrap",
            gap: "15px"
          }}>
            <h2 style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 700,
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#6366f1",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px"
              }}>
                📅
              </span>
              Próximos Eventos
            </h2>
            
            {eventosFuturosFiltrados.length > 0 && (
              <div style={{
                fontSize: "14px",
                color: "#64748b",
                backgroundColor: "#f1f5f9",
                padding: "8px 16px",
                borderRadius: "20px",
                fontWeight: 600
              }}>
                {eventosFuturosFiltrados.length} evento{eventosFuturosFiltrados.length !== 1 ? 's' : ''} por venir
              </div>
            )}
          </div>

          {eventosFuturosFiltrados.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "25px"
            }}>
              {eventosFuturosFiltrados.map((ev: Evento) => {
                const fechaEvento = new Date(ev.fecha)
                const hoy = new Date()
                const diferenciaDias = Math.floor((fechaEvento.getTime() - hoy.getTime()) / (1000 * 3600 * 24))
                
                return (
                  <div
                    key={ev.id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "18px",
                      padding: "25px",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      border: "1px solid #e2e8f0",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)"
                      e.currentTarget.style.boxShadow = "0 15px 40px rgba(99, 102, 241, 0.15)"
                      e.currentTarget.style.borderColor = "#6366f1"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"
                      e.currentTarget.style.borderColor = "#e2e8f0"
                    }}
                  >
                    {/* Badge de "Próximo" */}
                    {diferenciaDias <= 7 && (
                      <div style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
                      }}>
                        🔥 Próximamente
                      </div>
                    )}

                    <h3 style={{
                      margin: "0 0 15px 0",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#1e293b",
                      lineHeight: "1.3"
                    }}>
                      {ev.titulo}
                    </h3>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "20px",
                      flexWrap: "wrap"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "#f0f9ff",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#0369a1"
                      }}>
                        📍 {ev.lugar}
                      </div>
                      
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "#fef3c7",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#92400e"
                      }}>
                        📅 {formatearFecha(ev.fecha)}
                      </div>
                    </div>

                    <p style={{
                      margin: "0 0 20px 0",
                      fontSize: "16px",
                      color: "#475569",
                      lineHeight: "1.6"
                    }}>
                      {ev.descripcion}
                    </p>

                    {/* Contador regresivo */}
                    <div style={{
                      padding: "15px",
                      backgroundColor: "#f8fafc",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0"
                    }}>
                      <div style={{
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                        fontWeight: 600
                      }}>
                        ⏰ Faltan {diferenciaDias} día{diferenciaDias !== 1 ? 's' : ''}
                      </div>
                      
                      <div style={{
                        height: "6px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "3px",
                        overflow: "hidden"
                      }}>
                        <div style={{
                          width: `${Math.min(100, (1 - (diferenciaDias / 365)) * 100)}%`,
                          height: "100%",
                          backgroundColor: diferenciaDias <= 7 ? "#ef4444" : "#10b981",
                          borderRadius: "3px",
                          transition: "width 0.5s ease"
                        }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{
              backgroundColor: "white",
              padding: "50px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
            }}>
              <div style={{
                fontSize: "60px",
                marginBottom: "20px"
              }}>
                📅
              </div>
              <h3 style={{
                fontSize: "24px",
                color: "#1e293b",
                marginBottom: "10px"
              }}>
                No hay eventos próximos programados
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#64748b",
                maxWidth: "400px",
                margin: "0 auto"
              }}>
                Vuelve pronto para descubrir nuevos eventos en Medellín
              </p>
            </div>
          )}
        </section>

        {/* Eventos Pasados */}
        <section>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "25px",
            flexWrap: "wrap",
            gap: "15px"
          }}>
            <h2 style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 700,
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px"
              }}>
                🏆
              </span>
              Eventos Pasados
            </h2>
            
            {eventosPasados.length > 0 && (
              <div style={{
                fontSize: "14px",
                color: "#64748b",
                backgroundColor: "#f1f5f9",
                padding: "8px 16px",
                borderRadius: "20px",
                fontWeight: 600
              }}>
                {eventosPasados.length} evento{eventosPasados.length !== 1 ? 's' : ''} completado{eventosPasados.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {eventosPasados.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "25px"
            }}>
              {eventosPasados.map((ev: Evento) => (
                <div
                  key={ev.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "18px",
                    padding: "25px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    opacity: 0.9
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(16, 185, 129, 0.15)"
                    e.currentTarget.style.opacity = "1"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"
                    e.currentTarget.style.opacity = "0.9"
                  }}
                >
                  {/* Overlay de "Pasado" */}
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "#94a3b8",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    ✔️ Completado
                  </div>

                  <h3 style={{
                    margin: "0 0 15px 0",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#475569",
                    lineHeight: "1.3"
                  }}>
                    {ev.titulo}
                  </h3>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#f1f5f9",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#475569"
                    }}>
                      📍 {ev.lugar}
                    </div>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#f1f5f9",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#475569"
                    }}>
                      📅 {formatearFecha(ev.fecha)}
                    </div>
                  </div>

                  <p style={{
                    margin: "0 0 20px 0",
                    fontSize: "16px",
                    color: "#64748b",
                    lineHeight: "1.6",
                    fontStyle: "italic"
                  }}>
                    {ev.descripcion}
                  </p>

                  {/* Mensaje de evento completado */}
                  <div style={{
                    padding: "12px",
                    backgroundColor: "#dcfce7",
                    borderRadius: "12px",
                    border: "1px solid #86efac",
                    textAlign: "center"
                  }}>
                    <div style={{
                      fontSize: "14px",
                      color: "#166534",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px"
                    }}>
                      🎉 Evento exitosamente realizado
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              backgroundColor: "white",
              padding: "50px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
            }}>
              <div style={{
                fontSize: "60px",
                marginBottom: "20px"
              }}>
                🏆
              </div>
              <h3 style={{
                fontSize: "24px",
                color: "#1e293b",
                marginBottom: "10px"
              }}>
                Aún no hay eventos pasados
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#64748b",
                maxWidth: "400px",
                margin: "0 auto"
              }}>
                Los eventos que se realicen aparecerán aquí
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: "1200px",
        margin: "50px auto 20px",
        padding: "30px",
        backgroundColor: "#1e293b",
        color: "white",
        borderRadius: "20px",
        textAlign: "center"
      }}>
        <h3 style={{
          margin: "0 0 15px 0",
          fontSize: "20px",
          fontWeight: 600,
          color: "#cbd5e1"
        }}>
          ✨ ¡No te pierdas ningún evento!
        </h3>
        <p style={{
          margin: "0 0 20px 0",
          fontSize: "16px",
          color: "#94a3b8",
          maxWidth: "600px",
          margin: "0 auto 20px"
        }}>
          Suscríbete para recibir notificaciones de los próximos eventos en tus lugares favoritos
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap"
        }}>
          <button
            style={{
              padding: "12px 30px",
              backgroundColor: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#4f46e5"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#6366f1"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            🔔 Recibir Notificaciones
          </button>
          
          <button
            style={{
              padding: "12px 30px",
              backgroundColor: "transparent",
              color: "#cbd5e1",
              border: "2px solid #475569",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#334155"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            📱 Descargar Calendario
          </button>
        </div>
      </div>
    </div>
  )
}