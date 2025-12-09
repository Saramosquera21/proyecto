import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { lugares } from "../lib/lugaresData"
import ConsejosLugar from "../components/ConsejosLugar"

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
}

export default function ConsejosPage() {
  const [filtroEtiqueta, setFiltroEtiqueta] = useState<string>("")

  // Obtener etiquetas únicas
  const etiquetasDisponibles = useMemo(() => {
    const set = new Set<string>()
    for (const l of lugares) {
      for (const tag of l.etiquetas) {
        set.add(tag)
      }
    }
    return Array.from(set).sort((a, b) =>
      normalizar(a).localeCompare(normalizar(b))
    )
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "30px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)"
      }}>
        {/* Header */}
        <div style={{ marginBottom: "35px" }}>
          <h1 style={{
            margin: "0 0 12px 0",
            fontSize: "36px",
            fontWeight: 700,
            color: "#1e293b",
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            📋 Consejos por Categoría
          </h1>
          <p style={{
            margin: 0,
            fontSize: "18px",
            color: "#64748b",
            lineHeight: "1.5"
          }}>
            Selecciona una categoría para ver consejos útiles relacionados con ese tipo de lugar.
          </p>
        </div>

        {/* Selector de etiquetas */}
        <div style={{
          backgroundColor: "#f1f5f9",
          borderRadius: "14px",
          padding: "25px",
          marginBottom: "30px",
          border: "2px solid #e2e8f0"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "10px"
          }}>
            <span style={{
              fontWeight: 600,
              color: "#475569",
              fontSize: "17px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              🔍 Seleccionar categoría:
            </span>
            
            <select
              value={filtroEtiqueta}
              onChange={(e) => setFiltroEtiqueta(e.target.value)}
              style={{
                padding: "12px 18px",
                borderRadius: "10px",
                border: "2px solid #3b82f6",
                fontSize: "16px",
                minWidth: "250px",
                backgroundColor: "white",
                color: "#1e293b",
                fontWeight: 500,
                cursor: "pointer",
                flex: 1,
                maxWidth: "350px"
              }}
            >
              <option value="">-- Todas las categorías --</option>
              {etiquetasDisponibles.map(tag => (
                <option key={tag} value={tag} style={{ padding: "8px" }}>
                  {tag}
                </option>
              ))}
            </select>
            
            {filtroEtiqueta && (
              <button
                onClick={() => setFiltroEtiqueta("")}
                style={{
                  padding: "12px 22px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "15px",
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
              margin: "15px 0 0 0",
              padding: "12px",
              backgroundColor: "#dbeafe",
              borderRadius: "8px",
              color: "#1d4ed8",
              fontSize: "15px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              ✅ Mostrando consejos para: <strong>{filtroEtiqueta}</strong>
            </p>
          )}
        </div>

        {/* Consejos filtrados */}
        <div>
          {filtroEtiqueta ? (
            <div style={{
              backgroundColor: "#f0f9ff",
              borderRadius: "16px",
              padding: "30px",
              border: "2px solid #bae6fd",
              boxShadow: "0 6px 20px rgba(14, 165, 233, 0.1)"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "25px"
              }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  color: "white",
                  fontWeight: "bold"
                }}>
                  💡
                </div>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontSize: "26px",
                    fontWeight: 700,
                    color: "#1e293b"
                  }}>
                    Consejos para {filtroEtiqueta}
                  </h2>
                  <p style={{
                    margin: "5px 0 0 0",
                    fontSize: "15px",
                    color: "#64748b"
                  }}>
                    Recomendaciones para disfrutar al máximo tu experiencia
                  </p>
                </div>
              </div>
              
              <ConsejosLugar etiquetas={[filtroEtiqueta]} />
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "60px 30px",
              backgroundColor: "#f8fafc",
              borderRadius: "16px",
              border: "2px dashed #cbd5e1"
            }}>
              <div style={{
                fontSize: "60px",
                marginBottom: "20px",
                opacity: 0.6
              }}>
                🎯
              </div>
              <h3 style={{
                margin: "0 0 12px 0",
                fontSize: "24px",
                fontWeight: 600,
                color: "#475569"
              }}>
                Selecciona una categoría
              </h3>
              <p style={{
                margin: 0,
                fontSize: "16px",
                color: "#94a3b8",
                maxWidth: "400px",
                margin: "0 auto"
              }}>
                Elige una categoría de la lista para ver consejos específicos
              </p>
            </div>
          )}
        </div>

        {/* Botones de navegación */}
        <div style={{
          display: "flex",
          gap: "15px",
          marginTop: "45px",
          paddingTop: "25px",
          borderTop: "2px solid #e2e8f0",
          flexWrap: "wrap"
        }}>
          <Link
            to="/home"
            style={{
              padding: "14px 28px",
              backgroundColor: "#10b981",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.25)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#059669"
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.35)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#10b981"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(16, 185, 129, 0.25)"
            }}
          >
            ← Volver a Home
          </Link>
          
          <Link
            to="/lugares"
            style={{
              padding: "14px 28px",
              backgroundColor: "#3b82f6",
              color: "white",
              textDecoration: "none",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(59, 130, 246, 0.25)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb"
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.35)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(59, 130, 246, 0.25)"
            }}
          >
            ← Ver Lugares
          </Link>
        </div>

        {/* Footer informativo */}
        <div style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f1f5f9",
          borderRadius: "12px",
          fontSize: "14px",
          color: "#64748b"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "10px"
          }}>
            <span style={{ fontSize: "18px" }}>💡</span>
            <strong style={{ color: "#475569" }}>Tip:</strong>
          </div>
          <p style={{ margin: 0, lineHeight: "1.5" }}>
            Estos consejos están diseñados para mejorar tu experiencia y garantizar que respetes tanto el lugar como a los demás visitantes.
          </p>
        </div>
      </div>
    </div>
  )
}