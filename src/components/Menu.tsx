import { Link, useLocation } from "react-router-dom"

export default function Menu() {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      borderBottom: "1px solid #334155",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)",
      padding: "15px 0"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Logo/Brand */}
        <Link 
          to="/home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "white",
            fontSize: "22px",
            fontWeight: 800,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
          }}
        >

          <span>Dropen</span>
        </Link>

        {/* Navegación principal */}
        <div style={{
          display: "flex",
          gap: "8px",
          alignItems: "center"
        }}>
          <NavLink to="/home" active={isActive("/home")} icon="🏠">
            Inicio
          </NavLink>
          <NavLink to="/perfil" active={isActive("/perfil")} icon="👤">
            Perfil
          </NavLink>
          <NavLink to="/personas" active={isActive("/personas")} icon="👥">
            Personas
          </NavLink>
          <NavLink to="/lugares" active={isActive("/lugares")} icon="📍">
            Lugares
          </NavLink>
          <NavLink to="/eventos" active={isActive("/eventos")} icon="🎉">
            Eventos
          </NavLink>
        </div>

        {/* Indicador de página activa */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#94a3b8",
          fontSize: "14px",
          fontWeight: 500
        }}>
          <div style={{
            width: "8px",
            height: "8px",
            background: "#10b981",
            borderRadius: "50%",
            animation: "pulse 2s infinite"
          }} />
          <span>Conectado</span>
        </div>
      </div>

      {/* Estilos CSS */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Componente para enlaces de navegación
interface NavLinkProps {
  to: string
  active: boolean
  icon: string
  children: React.ReactNode
}

function NavLink({ to, active, icon, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        padding: "12px 20px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "15px",
        fontWeight: 600,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        background: active 
          ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))" 
          : "transparent",
        border: active 
          ? "1px solid rgba(59, 130, 246, 0.3)" 
          : "1px solid transparent",
        color: active ? "#60a5fa" : "#cbd5e1"
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"
          e.currentTarget.style.color = "#f1f5f9"
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.borderColor = "#475569"
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.color = "#cbd5e1"
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.borderColor = "transparent"
        }
      }}
    >
      {/* Indicador activo */}
      {active && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          height: "3px",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          borderRadius: "3px"
        }} />
      )}

      {/* Icono */}
      <span style={{
        fontSize: "18px",
        filter: active ? "drop-shadow(0 0 8px rgba(96, 165, 250, 0.5))" : "none",
        transition: "all 0.3s ease"
      }}>
        {icon}
      </span>

      {/* Texto */}
      <span style={{
        position: "relative",
        zIndex: 1
      }}>
        {children}
      </span>

      {/* Efecto hover */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
        opacity: 0,
        transition: "opacity 0.3s ease",
        zIndex: 0
      }} />
    </Link>
  )
}