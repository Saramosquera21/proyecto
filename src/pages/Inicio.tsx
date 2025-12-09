// src/pages/Inicio.tsx
import LoginCard from "../components/LoginCard"

export default function Inicio() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
        background: `
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255,255,255,0.08) 0%, transparent 50%)
        `
      }} />
      
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
        top: "-150px",
        right: "-150px"
      }} />
      
      <div style={{
        position: "absolute",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        bottom: "-100px",
        left: "-100px"
      }} />

      {/* Contenido principal */}
      <div style={{
        width: "100%",
        maxWidth: "500px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "50px 40px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        position: "relative",
        zIndex: 1,
        textAlign: "center"
      }}>
        {/* Logo/Icono */}
        <div style={{
          width: "80px",
          height: "80px",
          margin: "0 auto 25px",
          backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          color: "white",
          boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)"
        }}>
          🏙️
        </div>

        {/* Título */}
        <h1 style={{
          margin: "0 0 10px 0",
          fontSize: "36px",
          fontWeight: 700,
          color: "#2d3748",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.5px"
        }}>
          Bienvenido a Medellín Parches
        </h1>
        
        <p style={{
          margin: "0 0 40px 0",
          fontSize: "16px",
          color: "#718096",
          lineHeight: "1.6",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          Descubre los mejores lugares, eventos y experiencias que la ciudad tiene para ofrecer
        </p>

        {/* Login Card */}
        <div style={{
          marginBottom: "35px",
          padding: "25px",
          backgroundColor: "#f8fafc",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
        }}>
          <LoginCard />
        </div>

        {/* Enlace a registro */}
        <div style={{
          paddingTop: "25px",
          borderTop: "1px solid #e2e8f0",
          textAlign: "center"
        }}>
          <p style={{
            margin: "0 0 20px 0",
            fontSize: "16px",
            color: "#718096",
            fontWeight: 500
          }}>
            ¿No tienes cuenta aún?
          </p>
          
          <a
            href="/registro"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              backgroundColor: "transparent",
              color: "#667eea",
              textDecoration: "none",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              border: "2px solid #667eea",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#667eea"
              e.currentTarget.style.color = "white"
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.3)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "#667eea"
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>
              🎉 Crear Cuenta
            </span>
          </a>
          
          <p style={{
            margin: "20px 0 0 0",
            fontSize: "14px",
            color: "#a0aec0",
            fontStyle: "italic"
          }}>
            ¡Únete a la comunidad y descubre Medellín como nunca antes!
          </p>
        </div>

        {/* Footer informativo */}
        <div style={{
          marginTop: "40px",
          padding: "15px",
          backgroundColor: "#f1f5f9",
          borderRadius: "12px",
          fontSize: "14px",
          color: "#64748b"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "5px"
          }}>
            <span>🔐</span>
            <strong style={{ color: "#4a5568" }}>Seguridad garantizada</strong>
          </div>
          <p style={{ margin: 0, fontSize: "13px" }}>
            Tus datos están protegidos con encriptación de última generación
          </p>
        </div>
      </div>
    </div>
  )
}