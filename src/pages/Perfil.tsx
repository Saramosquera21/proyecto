import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

interface PerfilUsuario {
  id?: number
  nombre?: string
  email?: string
  foto?: string
  bio?: string
  favoritos?: string[]
  visitados?: string[]
  tema?: "oscuro" | "claro"
  intereses?: string[]
  meta?: string
  nivel?: string
  frase?: string
  lugar_actual?: string
  red_social?: string
  telefono?: string
  ocultar?: { [key: string]: boolean }
  seguidores?: string[]
  siguiendo?: string[]
}

export default function Perfil() {
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null)
  const [mensaje, setMensaje] = useState(
    !localStorage.getItem("token") ? "No hay sesión iniciada" : ""
  )
  const [cargandoFoto, setCargandoFoto] = useState(false)
  const navigate = useNavigate()

  // Cargar perfil
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    const cargarPerfil = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/perfil", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (res.ok) {
          setPerfil(data.usuario || data.perfil)
        } else {
          setMensaje(data.message || "Error al cargar perfil")
        }
      } catch {
        setMensaje("Error en el servidor")
      }
    }

    cargarPerfil()
  }, [])

  // Aplica el tema globalmente
  useEffect(() => {
    const temaActual = perfil?.tema || "claro"
    const root = document.documentElement
    root.classList.remove("dark", "light")
    root.classList.add(temaActual === "oscuro" ? "dark" : "light")
  }, [perfil?.tema])

  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    
    const file = e.target.files[0]
    const token = localStorage.getItem("token")
    
    if (!token) {
      setMensaje("No hay sesión iniciada")
      return
    }

    setCargandoFoto(true)
    
    try {
      const formData = new FormData()
      formData.append("foto", file)

      const res = await fetch("http://localhost:3000/api/upload-foto", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()
      
      if (res.ok && data.foto) {
        // Actualizar el perfil con la nueva foto
        setPerfil(prev => prev ? { ...prev, foto: data.foto } : null)
        setMensaje("Foto actualizada correctamente ✅")
        
        // También actualizar en el servidor el perfil completo
        await actualizarPerfilEnServidor(data.foto, token)
      } else {
        setMensaje(data.message || "Error al subir la foto")
      }
    } catch (error) {
      console.error("Error:", error)
      setMensaje("Error al subir la foto")
    } finally {
      setCargandoFoto(false)
      // Limpiar el input para permitir seleccionar la misma foto de nuevo
      e.target.value = ""
    }
  }

  // Función para actualizar el perfil en el servidor con la nueva foto
  const actualizarPerfilEnServidor = async (fotoUrl: string, token: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ foto: fotoUrl })
      })
      
      if (!res.ok) {
        const data = await res.json()
        console.error("Error al actualizar perfil:", data.message)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const actualizarPerfil = async () => {
    const token = localStorage.getItem("token")
    if (!token || !perfil) return
    
    try {
      const res = await fetch("http://localhost:3000/api/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(perfil)
      })
      const data = await res.json()
      if (!res.ok) {
        setMensaje(data.message || "Error al actualizar perfil")
      } else {
        setPerfil(data.perfil || perfil)
        setMensaje("Perfil actualizado correctamente ✅")
      }
    } catch {
      setMensaje("Error en el servidor")
    }
  }

  if (mensaje === "No hay sesión iniciada") return <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "50px" }}>{mensaje}</p>
  if (!perfil) return <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "50px" }}>Cargando perfil...</p>

  // URL de imagen por defecto si no hay foto
  const fotoUrl = perfil.foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"

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
          background: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
        }} />
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          position: "relative",
          zIndex: 1
        }}>
          <div>
            <h1 style={{
              margin: "0 0 12px 0",
              fontSize: "42px",
              fontWeight: 800,
              color: "white",
              background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #d946ef 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.5px",
              textAlign: "left"
            }}>
              👤 {perfil.nombre}
            </h1>
            <p style={{
              margin: 0,
              fontSize: "18px",
              color: "#94a3b8",
              textAlign: "left"
            }}>
              {perfil.email}
            </p>
          </div>
          
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
              gap: "12px",
              transition: "all 0.3s ease"
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
            ← Ir al Home
          </Link>
        </div>

        {/* Badge de nivel */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "10px",
          padding: "10px 24px",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          color: "#60a5fa",
          borderRadius: "20px",
          fontSize: "16px",
          fontWeight: 600,
          border: "1px solid rgba(59, 130, 246, 0.3)",
          position: "relative",
          zIndex: 1
        }}>
          <span>🏆</span>
          <span>Nivel: {perfil.nivel || "Explorador"}</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 50px auto"
      }}>
        {/* Grid de dos columnas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "30px",
          marginBottom: "50px"
        }}>
          {/* Columna izquierda - Foto y estadísticas */}
          <div style={{
            backgroundColor: "#1e293b",
            borderRadius: "20px",
            border: "1px solid #334155",
            padding: "30px",
            height: "fit-content"
          }}>
            {/* Foto circular */}
            <div style={{
              position: "relative",
              marginBottom: "30px",
              textAlign: "center"
            }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={fotoUrl}
                  alt="Foto de perfil"
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #3b82f6",
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                    margin: "0 auto 20px",
                    opacity: cargandoFoto ? 0.7 : 1,
                    transition: "opacity 0.3s ease"
                  }}
                />
                {cargandoFoto && (
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#60a5fa",
                    fontWeight: 600
                  }}>
                    Subiendo...
                  </div>
                )}
              </div>
              
              <div style={{ position: "relative" }}>
                <label style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  color: "#60a5fa",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 500,
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  transition: "all 0.3s ease",
                  pointerEvents: cargandoFoto ? "none" : "auto",
                  opacity: cargandoFoto ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!cargandoFoto) {
                    e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.2)"
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!cargandoFoto) {
                    e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.1)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }
                }}>
                  {cargandoFoto ? "📤 Subiendo..." : "📷 Cambiar foto"}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFotoChange}
                    style={{ display: "none" }}
                    disabled={cargandoFoto}
                  />
                </label>
                
                <div style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  marginTop: "8px"
                }}>
                  JPEG, PNG o GIF (max 5MB)
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div style={{
              padding: "20px",
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              borderRadius: "15px",
              border: "1px solid #334155"
            }}>
              <h3 style={{
                margin: "0 0 20px 0",
                fontSize: "20px",
                fontWeight: 600,
                color: "#f1f5f9",
                textAlign: "center"
              }}>
                📊 Tus Estadísticas
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px"
              }}>
                <div style={{
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(59, 130, 246, 0.3)"
                }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#60a5fa",
                    marginBottom: "5px"
                  }}>
                    {perfil.seguidores?.length || 0}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#94a3b8",
                    fontWeight: 500
                  }}>
                    Seguidores
                  </div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(139, 92, 246, 0.3)"
                }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#a78bfa",
                    marginBottom: "5px"
                  }}>
                    {perfil.siguiendo?.length || 0}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#94a3b8",
                    fontWeight: 500
                  }}>
                    Siguiendo
                  </div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(34, 197, 94, 0.3)"
                }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#4ade80",
                    marginBottom: "5px"
                  }}>
                    {perfil.favoritos?.length || 0}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#94a3b8",
                    fontWeight: 500
                  }}>
                    Favoritos
                  </div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(245, 158, 11, 0.3)"
                }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#fbbf24",
                    marginBottom: "5px"
                  }}>
                    {perfil.visitados?.length || 0}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#94a3b8",
                    fontWeight: 500
                  }}>
                    Visitados
                  </div>
                </div>
              </div>
            </div>

            {/* Frase favorita */}
            {perfil.frase && (
              <div style={{
                marginTop: "25px",
                padding: "20px",
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                borderRadius: "15px",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "18px",
                  color: "#fbbf24",
                  fontStyle: "italic",
                  lineHeight: "1.5"
                }}>
                  "{perfil.frase}"
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha - Información editable */}
          <div style={{
            backgroundColor: "#1e293b",
            borderRadius: "20px",
            border: "1px solid #334155",
            padding: "30px"
          }}>
            {/* Bio */}
            <div style={{ marginBottom: "30px" }}>
              <label style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#f1f5f9"
              }}>
                ✏️ Biografía
              </label>
              <textarea
                value={perfil.bio || ""}
                onChange={e => setPerfil({ ...perfil, bio: e.target.value })}
                placeholder="Cuéntanos sobre ti..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "15px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid #334155",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  resize: "vertical",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6"
                  e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#334155"
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                }}
              />
            </div>

            {/* Lugar actual */}
            <div style={{ marginBottom: "30px" }}>
              <label style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#f1f5f9"
              }}>
                📍 Lugar Actual
              </label>
              <input
                value={perfil.lugar_actual || ""}
                onChange={e => setPerfil({ ...perfil, lugar_actual: e.target.value })}
                placeholder="¿Dónde estás ahora?"
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid #334155",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6"
                  e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#334155"
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                }}
              />
            </div>

            {/* Intereses */}
            <div style={{ marginBottom: "30px" }}>
              <label style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#f1f5f9"
              }}>
                🎯 Intereses
              </label>
              <textarea
                value={(perfil.intereses || []).join(", ")}
                onChange={e => setPerfil({ ...perfil, intereses: e.target.value.split(",").map(i => i.trim()) })}
                placeholder="Tus intereses (separados por coma)"
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "15px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid #334155",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  resize: "vertical",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6"
                  e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#334155"
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                }}
              />
            </div>

            {/* Meta personal */}
            <div style={{ marginBottom: "30px" }}>
              <label style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#f1f5f9"
              }}>
                🎯 Meta Personal
              </label>
              <textarea
                value={perfil.meta || ""}
                onChange={e => setPerfil({ ...perfil, meta: e.target.value })}
                placeholder="¿Cuál es tu objetivo en la app?"
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "15px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid #334155",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  resize: "vertical",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6"
                  e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#334155"
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                }}
              />
            </div>

            {/* Listas de favoritos y visitados */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "30px"
            }}>
              <div>
                <label style={{
                  display: "block",
                  marginBottom: "12px",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#f1f5f9"
                }}>
                  ❤️ Favoritos
                </label>
                <textarea
                  value={(perfil.favoritos || []).join(", ")}
                  onChange={e => setPerfil({ ...perfil, favoritos: e.target.value.split(",").map(f => f.trim()) })}
                  placeholder="Tus lugares favoritos"
                  style={{
                    width: "100%",
                    minHeight: "120px",
                    padding: "15px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "2px solid #334155",
                    borderRadius: "12px",
                    color: "#f1f5f9",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    resize: "vertical",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6"
                    e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#334155"
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  marginBottom: "12px",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#f1f5f9"
                }}>
                  🗺️ Visitados
                </label>
                <textarea
                  value={(perfil.visitados || []).join(", ")}
                  onChange={e => setPerfil({ ...perfil, visitados: e.target.value.split(",").map(v => v.trim()) })}
                  placeholder="Lugares que has visitado"
                  style={{
                    width: "100%",
                    minHeight: "120px",
                    padding: "15px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "2px solid #334155",
                    borderRadius: "12px",
                    color: "#f1f5f9",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    resize: "vertical",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6"
                    e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#334155"
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
                  }}
                />
              </div>
            </div>

            {/* Configuración de privacidad */}
            <div style={{
              padding: "25px",
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              borderRadius: "15px",
              border: "1px solid #334155",
              marginBottom: "30px"
            }}>
              <h3 style={{
                margin: "0 0 20px 0",
                fontSize: "20px",
                fontWeight: 600,
                color: "#f1f5f9"
              }}>
                🔒 Configuración de Privacidad
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px"
              }}>
                {/* Red social */}
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#cbd5e1"
                  }}>
                    📱 Red Social
                  </label>
                  {!perfil.ocultar?.red_social ? (
                    <div>
                      <input
                        value={perfil.red_social || ""}
                        onChange={e => setPerfil({ ...perfil, red_social: e.target.value })}
                        placeholder="@tu_usuario"
                        style={{
                          width: "100%",
                          padding: "12px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "2px solid #334155",
                          borderRadius: "8px",
                          color: "#f1f5f9",
                          marginBottom: "10px"
                        }}
                      />
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#94a3b8",
                        cursor: "pointer"
                      }}>
                        <input
                          type="checkbox"
                          checked={perfil.ocultar?.red_social || false}
                          onChange={e => setPerfil({ ...perfil, ocultar: { ...perfil.ocultar, red_social: e.target.checked } })}
                          style={{ cursor: "pointer" }}
                        />
                        Ocultar
                      </label>
                    </div>
                  ) : (
                    <button
                      onClick={() => setPerfil({ ...perfil, ocultar: { ...perfil.ocultar, red_social: false } })}
                      style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        color: "#60a5fa",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 500
                      }}
                    >
                      Mostrar red social
                    </button>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#cbd5e1"
                  }}>
                    📞 Teléfono
                  </label>
                  {!perfil.ocultar?.telefono ? (
                    <div>
                      <input
                        value={perfil.telefono || ""}
                        onChange={e => setPerfil({ ...perfil, telefono: e.target.value })}
                        placeholder="+57 300 123 4567"
                        style={{
                          width: "100%",
                          padding: "12px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "2px solid #334155",
                          borderRadius: "8px",
                          color: "#f1f5f9",
                          marginBottom: "10px"
                        }}
                      />
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#94a3b8",
                        cursor: "pointer"
                      }}>
                        <input
                          type="checkbox"
                          checked={perfil.ocultar?.telefono || false}
                          onChange={e =>
                            setPerfil({
                              ...perfil,
                              ocultar: { ...perfil.ocultar, telefono: e.target.checked }
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                        Ocultar
                      </label>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setPerfil({
                          ...perfil,
                          ocultar: { ...perfil.ocultar, telefono: false }
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        color: "#60a5fa",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 500
                      }}
                    >
                      Mostrar teléfono
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-between"
            }}>
              <button
                onClick={actualizarPerfil}
                style={{
                  flex: 1,
                  padding: "16px 32px",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
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
                💾 Guardar Cambios
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token")
                  navigate("/")
                }}
                style={{
                  padding: "16px 32px",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  color: "#f87171",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)"
                  e.currentTarget.style.transform = "translateY(-3px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Mensaje de estado */}
        {mensaje && (
          <div style={{
            padding: "20px",
            backgroundColor: mensaje.includes("✅") 
              ? "rgba(34, 197, 94, 0.1)" 
              : "rgba(239, 68, 68, 0.1)",
            color: mensaje.includes("✅") ? "#4ade80" : "#f87171",
            borderRadius: "12px",
            border: "1px solid",
            borderColor: mensaje.includes("✅") 
              ? "rgba(34, 197, 94, 0.3)" 
              : "rgba(239, 68, 68, 0.3)",
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: 500
          }}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  )
}