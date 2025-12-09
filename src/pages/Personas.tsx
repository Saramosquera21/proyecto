import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { personas } from "../lib/personasData"
import type { Persona } from "../lib/personasData"
import Menu from "../components/Menu"

// Listado de ciudades del área metropolitana
const ciudadesAreaMetropolitana = [
  "Medellín",
  "Envigado", 
  "Bello",
  "Itagüí",
  "Sabaneta",
  "La Estrella",
  "Copacabana",
  "Girardota",
  "Caldas"
]

export default function Personas() {
  const [seleccionado, setSeleccionado] = useState<Persona | null>(null)
  const [busqueda, setBusqueda] = useState("")
  const [filtroCiudad, setFiltroCiudad] = useState("")
  const [filtroBarrio] = useState("")
  const [filtroNivel, setFiltroNivel] = useState("")
  const navigate = useNavigate()

  // Obtener todas las ciudades únicas para el filtro
  const ciudadesUnicas = Array.from(new Set(personas.map(p => p.ciudad))).sort()
  
  // Filtrado dinámico
  const listaFiltrada = personas.filter(p => {
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.intereses.some(i => i.toLowerCase().includes(busqueda.toLowerCase()))

    const coincideCiudad = filtroCiudad === "" || p.ciudad === filtroCiudad
    const coincideBarrio = filtroBarrio === "" || p.barrio === filtroBarrio
    const coincideNivel = filtroNivel === "" || p.nivel === filtroNivel

    return coincideBusqueda && coincideCiudad && coincideBarrio && coincideNivel
  })

  const getNivelBadgeClass = (nivel: string) => {
    switch(nivel) {
      case "Principiante": return "badge-principiante"
      case "Intermedio": return "badge-intermedio"
      case "Avanzado": return "badge-avanzado"
      default: return ""
    }
  }

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
          background: "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)"
        }} />
        
        <h1 style={{
          margin: "0 0 12px 0",
          fontSize: "42px",
          fontWeight: 800,
          color: "white",
          background: "linear-gradient(90deg, #8b5cf6 0%, #d946ef 50%, #f59e0b 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.5px",
          position: "relative",
          zIndex: 1
        }}>
          👥 Comunidad de Parches
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
          Conecta con personas que comparten tus intereses en Medellín
        </p>
        
        {/* Contador de personas */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          color: "#60a5fa",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: 600,
          border: "1px solid rgba(59, 130, 246, 0.3)",
          position: "relative",
          zIndex: 1
        }}>
          <span>👥</span>
          <span>Mostrando {listaFiltrada.length} de {personas.length} personas</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 50px auto"
      }}>
        {/* Botón volver a Home */}
        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            transition: "all 0.3s ease",
            border: "none",
            cursor: "pointer",
            marginBottom: "20px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)"
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "none"
          }}
        >
          ← Volver a Home
        </button>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o interés..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            padding: "16px 20px",
            background: "rgba(30, 41, 59, 0.8)",
            border: "2px solid #475569",
            borderRadius: "12px",
            color: "#f1f5f9",
            fontSize: "16px",
            transition: "all 0.3s ease",
            marginBottom: "20px",
            fontFamily: "inherit"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#8b5cf6"
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.2)"
            e.currentTarget.style.background = "rgba(30, 41, 59, 0.95)"
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#475569"
            e.currentTarget.style.boxShadow = "none"
            e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)"
          }}
        />

        {/* Filtros */}
        <div style={{ 
          display: "flex", 
          gap: "15px", 
          marginBottom: "30px", 
          flexWrap: "wrap",
          background: "rgba(30, 41, 59, 0.5)",
          padding: "20px",
          borderRadius: "15px",
          border: "1px solid #334155"
        }}>
          <select 
            value={filtroCiudad} 
            onChange={e => setFiltroCiudad(e.target.value)}
            style={{
              padding: "12px 20px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "2px solid #475569",
              borderRadius: "10px",
              color: "#f1f5f9",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "inherit",
              minWidth: "180px",
              flex: 1
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#8b5cf6"
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.2)"
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#475569"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <option value="">🌆 Todas las ciudades</option>
            {ciudadesUnicas.map(ciudad => (
              <option key={ciudad} value={ciudad}>{ciudad}</option>
            ))}
          </select>

          <select 
            value={filtroNivel} 
            onChange={e => setFiltroNivel(e.target.value)}
            style={{
              padding: "12px 20px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "2px solid #475569",
              borderRadius: "10px",
              color: "#f1f5f9",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "inherit",
              minWidth: "180px",
              flex: 1
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#8b5cf6"
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.2)"
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#475569"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <option value="">📊 Todos los niveles</option>
            <option value="Principiante">🥇 Principiante</option>
            <option value="Intermedio">🥈 Intermedio</option>
            <option value="Avanzado">🥇 Avanzado</option>
          </select>
        </div>

        {/* Grid de tarjetas */}
        {listaFiltrada.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#94a3b8",
            fontSize: "18px",
            background: "rgba(30, 41, 59, 0.5)",
            borderRadius: "20px",
            border: "1px solid #334155"
          }}>
            <h3 style={{ color: "#f1f5f9", fontSize: "24px", marginBottom: "10px" }}>
              No se encontraron resultados
            </h3>
            <p>Intenta con otros términos de búsqueda o cambia los filtros</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px",
            marginBottom: "50px"
          }}>
            {listaFiltrada.map(persona => (
              <div
                key={persona.id}
                onClick={() => setSeleccionado(persona)}
                style={{
                  background: "linear-gradient(145deg, #1e293b, #0f172a)",
                  borderRadius: "20px",
                  border: "1px solid #334155",
                  padding: "25px",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)"
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4)"
                  e.currentTarget.style.borderColor = "#8b5cf6"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "#334155"
                }}
              >
                {/* Línea superior decorativa */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #8b5cf6, #d946ef, #f59e0b)",
                  borderRadius: "20px 20px 0 0"
                }} />

                <img
                  src={persona.foto}
                  alt={persona.nombre}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #8b5cf6",
                    boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)",
                    marginBottom: "20px",
                    transition: "transform 0.3s ease"
                  }}
                />
                
                <h3 style={{ 
                  fontSize: "22px", 
                  fontWeight: 700, 
                  color: "#f1f5f9", 
                  margin: "0 0 10px 0",
                  textAlign: "center"
                }}>
                  {persona.nombre}
                </h3>
                
                <p style={{ 
                  fontSize: "14px", 
                  color: "#94a3b8", 
                  marginBottom: "20px", 
                  lineHeight: "1.5",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textAlign: "center"
                }}>
                  {persona.bio}
                </p>
                
                <div style={{ textAlign: "left", width: "100%", fontSize: "14px", color: "#cbd5e1" }}>
                  <p style={{ margin: "8px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <strong style={{ color: "#f1f5f9", fontWeight: 600, minWidth: "70px" }}>📍 Ciudad:</strong>
                    {persona.ciudad}
                  </p>
                  
                  {persona.barrio && (
                    <p style={{ margin: "8px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                      <strong style={{ color: "#f1f5f9", fontWeight: 600, minWidth: "70px" }}>🏠 Barrio:</strong>
                      {persona.barrio}
                    </p>
                  )}
                  
                  <p style={{ margin: "8px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <strong style={{ color: "#f1f5f9", fontWeight: 600, minWidth: "70px" }}>📊 Nivel:</strong>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      ...(persona.nivel === "Principiante" ? {
                        background: "rgba(34, 197, 94, 0.2)",
                        color: "#4ade80",
                        border: "1px solid rgba(34, 197, 94, 0.3)"
                      } : persona.nivel === "Intermedio" ? {
                        background: "rgba(245, 158, 11, 0.2)",
                        color: "#fbbf24",
                        border: "1px solid rgba(245, 158, 11, 0.3)"
                      } : {
                        background: "rgba(239, 68, 68, 0.2)",
                        color: "#f87171",
                        border: "1px solid rgba(239, 68, 68, 0.3)"
                      })
                    }}>
                      {persona.nivel}
                    </span>
                  </p>
                  
                  <p style={{ margin: "8px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <strong style={{ color: "#f1f5f9", fontWeight: 600, minWidth: "70px" }}>🎯 Intereses:</strong>
                    <span style={{
                      color: "#94a3b8",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {persona.intereses.slice(0, 3).join(", ")}
                      {persona.intereses.length > 3 && "..."}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal con detalles */}
      {seleccionado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
            animation: "fadeIn 0.3s ease"
          }}
          onClick={() => setSeleccionado(null)}
        >
          <div
            style={{
              background: "linear-gradient(145deg, #1e293b, #0f172a)",
              padding: "40px",
              borderRadius: "25px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              border: "1px solid #475569",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              animation: "slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Línea superior decorativa */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: "linear-gradient(90deg, #8b5cf6, #d946ef, #f59e0b)",
              borderRadius: "25px 25px 0 0"
            }} />

            {/* Header del modal */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", gap: "25px" }}>
              <img
                src={seleccionado.foto}
                alt={seleccionado.nombre}
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "5px solid #8b5cf6",
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)"
                }}
              />
              
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#f1f5f9",
                  margin: "0 0 10px 0",
                  background: "linear-gradient(90deg, #8b5cf6, #d946ef)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  {seleccionado.nombre}
                </h2>
                
                <p style={{ fontSize: "16px", color: "#94a3b8", margin: "5px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>📍</span>
                  {seleccionado.ciudad}
                  {seleccionado.barrio && `, ${seleccionado.barrio}`}
                </p>
                
                <p style={{ fontSize: "16px", color: "#94a3b8", margin: "5px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>📊</span>
                  <span style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    ...(seleccionado.nivel === "Principiante" ? {
                      background: "rgba(34, 197, 94, 0.2)",
                      color: "#4ade80",
                      border: "1px solid rgba(34, 197, 94, 0.3)"
                    } : seleccionado.nivel === "Intermedio" ? {
                      background: "rgba(245, 158, 11, 0.2)",
                      color: "#fbbf24",
                      border: "1px solid rgba(245, 158, 11, 0.3)"
                    } : {
                      background: "rgba(239, 68, 68, 0.2)",
                      color: "#f87171",
                      border: "1px solid rgba(239, 68, 68, 0.3)"
                    })
                  }}>
                    {seleccionado.nivel}
                  </span>
                </p>
              </div>
            </div>

            {/* Bio */}
            <div style={{ 
              marginBottom: "25px", 
              padding: "20px", 
              background: "rgba(30, 41, 59, 0.5)",
              borderRadius: "15px",
              border: "1px solid #334155"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#f1f5f9", margin: "0 0 15px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>📝</span> Sobre mí
              </h3>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: "1.6" }}>{seleccionado.bio}</p>
            </div>

            {/* Intereses */}
            <div style={{ 
              marginBottom: "25px", 
              padding: "20px", 
              background: "rgba(30, 41, 59, 0.5)",
              borderRadius: "15px",
              border: "1px solid #334155"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#f1f5f9", margin: "0 0 15px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>🎯</span> Intereses
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {seleccionado.intereses.map((interes, index) => (
                  <span 
                    key={index}
                    style={{
                      background: "rgba(59, 130, 246, 0.15)",
                      color: "#60a5fa",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: 500,
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      transition: "all 0.3s ease",
                      cursor: "default"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(59, 130, 246, 0.25)"
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(59, 130, 246, 0.15)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    {interes}
                  </span>
                ))}
              </div>
            </div>

            {/* Lugares para parchar */}
            <div style={{ 
              marginBottom: "25px", 
              padding: "20px", 
              background: "rgba(30, 41, 59, 0.5)",
              borderRadius: "15px",
              border: "1px solid #334155"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#f1f5f9", margin: "0 0 15px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>📍</span> Donde le gusta parchar
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {seleccionado.parchar.map((lugar, index) => (
                  <span 
                    key={index}
                    style={{
                      background: "rgba(34, 197, 94, 0.15)",
                      color: "#4ade80",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: 500,
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      transition: "all 0.3s ease",
                      cursor: "default"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(34, 197, 94, 0.25)"
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(34, 197, 94, 0.15)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    {lugar}
                  </span>
                ))}
              </div>
            </div>

            {/* Contacto */}
            <div style={{ 
              marginBottom: "25px", 
              padding: "20px", 
              background: "rgba(30, 41, 59, 0.5)",
              borderRadius: "15px",
              border: "1px solid #334155"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#f1f5f9", margin: "0 0 15px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>📱</span> Contacto
              </h3>
              <div style={{ color: "#cbd5e1", fontSize: "15px" }}>
                <p style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: "12px" }}>
                  <strong style={{ color: "#f1f5f9", minWidth: "100px" }}>📧 Email:</strong>
                  {seleccionado.email}
                </p>
                {seleccionado.telefono && (
                  <p style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: "12px" }}>
                    <strong style={{ color: "#f1f5f9", minWidth: "100px" }}>📞 Teléfono:</strong>
                    {seleccionado.telefono}
                  </p>
                )}
                {seleccionado.red_social && (
                  <p style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: "12px" }}>
                    <strong style={{ color: "#f1f5f9", minWidth: "100px" }}>🌐 Red social:</strong>
                    {seleccionado.red_social}
                  </p>
                )}
              </div>
            </div>

            {/* Botones de interacción */}
            <div style={{ display: "flex", gap: "15px", margin: "30px 0" }}>
              <button
                onClick={() => alert(`¡Has seguido a ${seleccionado.nombre}!`)}
                style={{
                  flex: 1,
                  padding: "16px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)"
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(16, 185, 129, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <span>👤</span> Seguir
              </button>
              
              <button
                onClick={() => alert(`${seleccionado.nombre} agregado a favoritos`)}
                style={{
                  flex: 1,
                  padding: "16px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)"
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(245, 158, 11, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <span>⭐</span> Favorito
              </button>
            </div>

            {/* Botón cerrar */}
            <button
              onClick={() => setSeleccionado(null)}
              style={{
                width: "100%",
                padding: "16px",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#f87171",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              ✕ Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Estilos CSS inline */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6, #d946ef);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7c3aed, #c026d3);
        }
        
        @media (max-width: 768px) {
          .modal-header {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }
          
          .modal-foto {
            width: 120px;
            height: 120px;
          }
          
          .botones-interaccion {
            flex-direction: column;
          }
          
          .filtros-container {
            flex-direction: column;
          }
          
          .filtro-select {
            min-width: 100%;
          }
          
          .personas-header h1 {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  )
}