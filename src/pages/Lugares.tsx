import { useState, useEffect, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
import { lugares } from "../lib/lugaresData"
import type { Lugar } from "../lib/lugaresData"
import Menu from "../components/Menu"

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // quita acentos
    .trim()
}

export default function Lugares() {
  const [seleccionado, setSeleccionado] = useState<Lugar | null>(null)
  const [comentarios, setComentarios] = useState<{ usuario: string; texto: string }[]>([])
  const [nuevoComentario, setNuevoComentario] = useState("")
  const [filtroEtiqueta, setFiltroEtiqueta] = useState<string>("")
  const navigate = useNavigate()

  // Etiquetas disponibles (únicas) a partir del dataset
  const etiquetasDisponibles = useMemo(() => {
    const set = new Set<string>()
    for (const l of lugares) {
      for (const tag of l.etiquetas) {
        set.add(tag)
      }
    }
    // Ordena alfabéticamente ignorando acentos y mayúsculas
    return Array.from(set).sort((a, b) =>
      normalizar(a).localeCompare(normalizar(b))
    )
  }, [])

  useEffect(() => {
    if (seleccionado) {
      fetch(`http://localhost:3000/api/comentarios/${seleccionado.id}`)
        .then(res => res.json())
        .then(data => setComentarios(data))
        .catch(() => setComentarios([]))
    }
  }, [seleccionado])

  const agregarComentario = async () => {
    if (!seleccionado || nuevoComentario.trim() === "") return

    const comentario = { lugar_id: seleccionado.id, usuario: "Usuario registrado", texto: nuevoComentario }

    const res = await fetch("http://localhost:3000/api/comentarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comentario)
    })

    if (res.ok) {
      const nuevo = await res.json()
      setComentarios([...comentarios, nuevo])
      setNuevoComentario("")
    }
  }

  // Lista filtrada usando normalización
  const listaFiltrada = useMemo(() => {
    if (!filtroEtiqueta) return lugares
    const filtroNorm = normalizar(filtroEtiqueta)
    return lugares.filter(l =>
      l.etiquetas.some(tag => normalizar(tag) === filtroNorm)
    )
  }, [filtroEtiqueta])

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Menu />
      
      {/* Header */}
      <div style={{
        padding: "30px 20px",
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
          margin: "0 0 12px 0",
          fontSize: "40px",
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
          🗺️ Lugares de Medellín
        </h1>
        
        <p style={{
          margin: "0 auto 25px auto",
          fontSize: "17px",
          color: "#cbd5e1",
          maxWidth: "600px",
          lineHeight: "1.5",
          position: "relative",
          zIndex: 1,
          fontWeight: 500
        }}>
          Explora los mejores lugares que la ciudad tiene para ofrecer
        </p>

        {/* Volver a Home */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <button
            onClick={() => navigate("/home")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              marginBottom: "20px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb"
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.3)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            ← Volver a Home
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        padding: "30px 20px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* Filtro y botones de navegación */}
        <div style={{
          backgroundColor: "rgba(30, 41, 59, 0.7)",
          borderRadius: "16px",
          padding: "25px",
          marginBottom: "30px",
          border: "1px solid #334155",
          backdropFilter: "blur(10px)"
        }}>
          {/* Filtro por etiqueta */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "10px",
              flexWrap: "wrap"
            }}>
              <span style={{
                fontWeight: 600,
                color: "#cbd5e1",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                🔍 Filtrar por:
              </span>
              
              <select
                value={filtroEtiqueta}
                onChange={(e) => setFiltroEtiqueta(e.target.value)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #3b82f6",
                  fontSize: "15px",
                  minWidth: "220px",
                  backgroundColor: "#1e293b",
                  color: "white",
                  fontWeight: 500,
                  cursor: "pointer",
                  flex: 1,
                  maxWidth: "300px"
                }}
              >
                <option value="">Todas las categorías</option>
                {etiquetasDisponibles.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              
              {filtroEtiqueta && (
                <button
                  onClick={() => setFiltroEtiqueta("")}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#dc2626"
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ef4444"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  ✕ Limpiar filtro
                </button>
              )}
            </div>
            
            {filtroEtiqueta && (
              <p style={{
                margin: "10px 0 0 0",
                padding: "10px 15px",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderRadius: "8px",
                color: "#60a5fa",
                fontSize: "14px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                ✅ Mostrando {listaFiltrada.length} lugar{listaFiltrada.length !== 1 ? 'es' : ''} con etiqueta: <strong>{filtroEtiqueta}</strong>
              </p>
            )}
          </div>

          {/* Botones de navegación adicionales */}
          <div style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap"
          }}>
            <Link
              to="/consejos"
              style={{
                padding: "14px 24px",
                backgroundColor: "#8b5cf6",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                flex: 1,
                maxWidth: "250px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#7c3aed"
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(139, 92, 246, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#8b5cf6"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              📋 Ver todos los consejos
            </Link>
            
            <Link
              to="/top-places"
              style={{
                padding: "14px 24px",
                backgroundColor: "#f59e0b",
                color: "#1e293b",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                flex: 1,
                maxWidth: "250px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d97706"
                e.currentTarget.style.color = "white"
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(245, 158, 11, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f59e0b"
                e.currentTarget.style.color = "#1e293b"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              🏆 Top Places
            </Link>
          </div>
        </div>

        {/* Tarjetas de lugares */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px",
            marginBottom: "40px"
          }}
        >
          {listaFiltrada.map(lugar => (
            <div
              key={lugar.id}
              onClick={() => setSeleccionado(lugar)}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "18px",
                padding: "20px",
                border: "1px solid #334155",
                cursor: "pointer",
                transition: "all 0.3s ease",
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
              
              <img
                src={lugar.imagen}
                alt={lugar.nombre}
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "12px",
                  marginBottom: "18px",
                  objectFit: "cover"
                }}
              />
              <h3 style={{
                margin: "0 0 10px 0",
                fontSize: "20px",
                fontWeight: 700,
                color: "white"
              }}>
                {lugar.nombre}
              </h3>
              <p style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}>
                📍 {lugar.direccion}
              </p>
              <p style={{
                fontSize: "14px",
                color: "#cbd5e1",
                marginBottom: "15px",
                lineHeight: "1.5",
                height: "63px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical"
              }}>
                {lugar.descripcion}
              </p>
              <p style={{
                fontSize: "15px",
                color: "#fbbf24",
                fontWeight: "bold",
                margin: "10px 0"
              }}>
                💰 {lugar.presupuesto}
              </p>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "15px"
              }}>
                {lugar.etiquetas.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: "#334155",
                      color: "#cbd5e1",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {lugar.etiquetas.length > 3 && (
                  <span style={{
                    backgroundColor: "#475569",
                    color: "#94a3b8",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px"
                  }}>
                    +{lugar.etiquetas.length - 3} más
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalles y comentarios */}
      {seleccionado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px"
          }}
          onClick={() => setSeleccionado(null)}
        >
          <div
            style={{
              backgroundColor: "#1e293b",
              padding: "30px",
              borderRadius: "20px",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              border: "2px solid #3b82f6",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSeleccionado(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}
            >
              ✕
            </button>
            
            <img
              src={seleccionado.imagen}
              alt={seleccionado.nombre}
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "15px",
                marginBottom: "20px",
                objectFit: "cover"
              }}
            />
            
            <h2 style={{
              margin: "0 0 15px 0",
              color: "white",
              fontSize: "28px",
              fontWeight: 700
            }}>
              {seleccionado.nombre}
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginBottom: "25px"
            }}>
              <div style={{
                backgroundColor: "#334155",
                padding: "15px",
                borderRadius: "10px"
              }}>
                <strong style={{ color: "#94a3b8" }}>📍 Dirección:</strong>
                <p style={{ margin: "5px 0 0 0", color: "white" }}>{seleccionado.direccion}</p>
              </div>
              
              <div style={{
                backgroundColor: "#334155",
                padding: "15px",
                borderRadius: "10px"
              }}>
                <strong style={{ color: "#94a3b8" }}>⏰ Horario:</strong>
                <p style={{ margin: "5px 0 0 0", color: "white" }}>
                  {seleccionado.horarioApertura} – {seleccionado.horarioCierre}
                </p>
              </div>
              
              <div style={{
                backgroundColor: "#334155",
                padding: "15px",
                borderRadius: "10px"
              }}>
                <strong style={{ color: "#94a3b8" }}>💰 Presupuesto:</strong>
                <p style={{ margin: "5px 0 0 0", color: "white" }}>{seleccionado.presupuesto}</p>
              </div>
              
              <div style={{
                backgroundColor: "#334155",
                padding: "15px",
                borderRadius: "10px"
              }}>
                <strong style={{ color: "#94a3b8" }}>⭐ Reseña:</strong>
                <p style={{ margin: "5px 0 0 0", color: "white" }}>{seleccionado.resena}</p>
              </div>
            </div>
            
            <p style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#cbd5e1",
              marginBottom: "25px"
            }}>
              {seleccionado.descripcion}
            </p>
            
            <div style={{ marginBottom: "25px" }}>
              <strong style={{ color: "#94a3b8" }}>📅 Días abierto:</strong>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "10px"
              }}>
                {seleccionado.diasAbierto.map(dia => (
                  <span
                    key={dia}
                    style={{
                      backgroundColor: "#10b981",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "bold"
                    }}
                  >
                    {dia}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: "25px" }}>
              <strong style={{ color: "#94a3b8" }}>🏷️ Etiquetas:</strong>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "10px"
              }}>
                {seleccionado.etiquetas.map(tag => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Sección de comentarios */}
            <div style={{
              borderTop: "2px solid #334155",
              paddingTop: "25px",
              marginTop: "25px"
            }}>
              <h3 style={{
                margin: "0 0 20px 0",
                color: "white",
                fontSize: "22px"
              }}>
                💬 Comentarios
              </h3>
              
              {comentarios.length > 0 ? (
                <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "20px" }}>
                  {comentarios.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: "#334155",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "10px"
                      }}
                    >
                      <strong style={{ color: "#60a5fa" }}>{c.usuario}:</strong>
                      <p style={{ margin: "5px 0 0 0", color: "#cbd5e1" }}>{c.texto}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#94a3b8", fontStyle: "italic" }}>No hay comentarios aún.</p>
              )}
              
              <div>
                <textarea
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="Escribe tu comentario sobre este lugar..."
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "10px",
                    border: "2px solid #475569",
                    minHeight: "100px",
                    fontSize: "16px",
                    marginBottom: "15px",
                    resize: "vertical",
                    backgroundColor: "#334155",
                    color: "white"
                  }}
                />
                <button
                  onClick={agregarComentario}
                  disabled={!nuevoComentario.trim()}
                  style={{
                    padding: "12px 30px",
                    backgroundColor: nuevoComentario.trim() ? "#10b981" : "#475569",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: nuevoComentario.trim() ? "pointer" : "not-allowed",
                    fontSize: "16px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginLeft: "auto"
                  }}
                >
                  📝 Agregar comentario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}