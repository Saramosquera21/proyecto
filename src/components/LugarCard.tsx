import type { Lugar } from "../lib/lugaresData"
import ConsejosLugar from "./ConsejosLugar"

type Props = {
  lugar: Lugar
  onClick: () => void
}

export default function LugarCard({ lugar, onClick }: Props) {
  // Función para obtener color según presupuesto
  const getPresupuestoColor = (presupuesto: string) => {
    switch(presupuesto.toLowerCase()) {
      case "económico": return { bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80", border: "rgba(34, 197, 94, 0.3)" }
      case "medio": return { bg: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", border: "rgba(245, 158, 11, 0.3)" }
      case "alto": return { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171", border: "rgba(239, 68, 68, 0.3)" }
      default: return { bg: "rgba(100, 116, 139, 0.15)", color: "#94a3b8", border: "rgba(100, 116, 139, 0.3)" }
    }
  }

  const presupuestoColor = getPresupuestoColor(lugar.presupuesto)

  return (
    <div
      onClick={onClick}
      style={{
        background: "linear-gradient(145deg, #1e293b, #0f172a)",
        borderRadius: "20px",
        border: "1px solid #334155",
        padding: "25px",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.02)"
        e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.4)"
        e.currentTarget.style.borderColor = "#8b5cf6"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)"
        e.currentTarget.style.boxShadow = "none"
        e.currentTarget.style.borderColor = "#334155"
      }}
    >
      {/* Línea decorativa superior */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #d946ef)",
        borderRadius: "20px 20px 0 0"
      }} />

      {/* Imagen con overlay */}
      <div style={{
        position: "relative",
        height: "200px",
        borderRadius: "15px",
        overflow: "hidden",
        marginBottom: "20px",
        border: "1px solid #475569"
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
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
          }}
        />
        
        {/* Badge de calificación */}
        {lugar.calificacion && (
          <div style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            color: "#fbbf24",
            padding: "8px 12px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            fontWeight: 700,
            border: "1px solid rgba(245, 158, 11, 0.3)"
          }}>
            <span>⭐</span>
            <span>{lugar.calificacion}</span>
          </div>
        )}

        {/* Badge de tipo */}
        <div style={{
          position: "absolute",
          bottom: "15px",
          left: "15px",
          background: "rgba(59, 130, 246, 0.8)",
          backdropFilter: "blur(10px)",
          color: "white",
          padding: "6px 12px",
          borderRadius: "15px",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          border: "1px solid rgba(59, 130, 246, 0.5)"
        }}>
          {lugar.tipo}
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{ flex: 1 }}>
        {/* Nombre y ubicación */}
        <div style={{ marginBottom: "15px" }}>
          <h3 style={{
            margin: "0 0 10px 0",
            fontSize: "22px",
            fontWeight: 700,
            color: "#f1f5f9",
            lineHeight: "1.3"
          }}>
            {lugar.nombre}
          </h3>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#94a3b8",
            fontSize: "14px"
          }}>
            <span style={{ fontSize: "16px" }}>📍</span>
            <span style={{ color: "#cbd5e1", fontWeight: 500 }}>
              {lugar.direccion}
            </span>
          </div>
        </div>

        {/* Descripción */}
        {lugar.descripcion && (
          <p style={{
            margin: "0 0 20px 0",
            fontSize: "14px",
            color: "#94a3b8",
            lineHeight: "1.6",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOriental: "vertical",
            overflow: "hidden"
          }}>
            {lugar.descripcion}
          </p>
        )}

        {/* Reseña y presupuesto */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "15px",
          background: "rgba(30, 41, 59, 0.5)",
          borderRadius: "12px",
          border: "1px solid #334155"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#cbd5e1",
            fontSize: "14px"
          }}>
            <span style={{ fontSize: "18px" }}>💬</span>
            <span style={{ fontWeight: 500 }}>{lugar.resena}</span>
          </div>
          
          <div style={{
            padding: "6px 12px",
            background: presupuestoColor.bg,
            color: presupuestoColor.color,
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            border: `1px solid ${presupuestoColor.border}`
          }}>
            {lugar.presupuesto}
          </div>
        </div>

        {/* Etiquetas */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px"
          }}>
            {lugar.etiquetas.slice(0, 4).map((etiqueta, index) => (
              <span
                key={index}
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  color: "#a78bfa",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 500,
                  border: "1px solid rgba(139, 92, 246, 0.3)"
                }}
              >
                {etiqueta}
              </span>
            ))}
            {lugar.etiquetas.length > 4 && (
              <span style={{
                background: "rgba(100, 116, 139, 0.2)",
                color: "#94a3b8",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 500
              }}>
                +{lugar.etiquetas.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Consejos (solo vista previa) */}
        <div style={{
          padding: "15px",
          background: "rgba(30, 41, 59, 0.3)",
          borderRadius: "12px",
          border: "1px solid #475569",
          marginBottom: "15px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px"
          }}>
            <div style={{
              width: "30px",
              height: "30px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              color: "white"
            }}>
              💡
            </div>
            <span style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#f1f5f9"
            }}>
              Consejos personalizados
            </span>
          </div>
          <p style={{
            margin: 0,
            fontSize: "12px",
            color: "#94a3b8",
            fontStyle: "italic"
          }}>
            Haz clic para ver consejos basados en {lugar.etiquetas.length} etiquetas
          </p>
        </div>
      </div>

      {/* Botón de acción */}
      <div style={{
        marginTop: "auto",
        paddingTop: "20px",
        borderTop: "1px solid #334155",
        textAlign: "center"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 20px",
          background: "rgba(59, 130, 246, 0.1)",
          color: "#60a5fa",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: 600,
          border: "1px solid rgba(59, 130, 246, 0.3)",
          transition: "all 0.3s ease"
        }}>
          <span>👁️</span>
          <span>Ver detalles completos</span>
          <span style={{ fontSize: "18px" }}>→</span>
        </div>
      </div>

      {/* Efectos de fondo */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "-60px",
        width: "120px",
        height: "120px",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(15px)",
        zIndex: 0,
        opacity: 0.5
      }} />
    </div>
  )
}