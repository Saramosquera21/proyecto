interface ConsejosLugarProps {
  etiquetas: string[]
}

export default function ConsejosLugar({ etiquetas }: ConsejosLugarProps) {
  const obtenerConsejos = (): string[] => {
    const consejos: string[] = []
    
    // Consejos generales para todos los lugares
    consejos.push("Respeta siempre al personal y a los demás visitantes.")
    consejos.push("Consulta los horarios antes de visitar para evitar inconvenientes.")
    
    // Consejos por categoría específica
    if (etiquetas.includes("Café") || etiquetas.includes("Cafetería")) {
      consejos.push("Saluda al personal al entrar - es una muestra de educación.")
      consejos.push("Si vas a trabajar, limita tu tiempo en mesas durante horas pico.")
      consejos.push("Apaga el sonido de tu celular o usa audífonos.")
      if (etiquetas.includes("Trabajar")) {
        consejos.push("Compra algo regularmente si usas el espacio para trabajar.")
      }
    }
    
    if (etiquetas.includes("Restaurante")) {
      consejos.push("Respeta los tiempos de espera, especialmente en horas pico.")
      consejos.push("Si tienes niños, asegúrate de supervisarlos en todo momento.")
      consejos.push("Considera dejar propina si el servicio fue bueno (10% es lo común).")
      if (etiquetas.includes("Alta Cocina") || etiquetas.includes("Gourmet")) {
        consejos.push("Viste de manera apropiada para el tipo de restaurante.")
        consejos.push("Reserva con anticipación para asegurar tu mesa.")
      }
    }
    
    if (etiquetas.includes("Bar") || etiquetas.includes("Pub")) {
      consejos.push("Bebe con responsabilidad y conoce tus límites.")
      consejos.push("Cuida tus pertenencias en espacios concurridos.")
      consejos.push("Respeta el espacio personal de los demás.")
      if (etiquetas.includes("Zona Rosa") || etiquetas.includes("Vida Nocturna")) {
        consejos.push("Llega temprano para evitar filas largas.")
        consejos.push("Considera usar transporte seguro para regresar a casa.")
      }
    }
    
    if (etiquetas.includes("Museo") || etiquetas.includes("Galería") || etiquetas.includes("Arte")) {
      consejos.push("Habla en voz baja para no interrumpir a otros visitantes.")
      consejos.push("No toques las obras a menos que esté permitido explícitamente.")
      consejos.push("Respeta las políticas de fotografía (sin flash generalmente).")
      consejos.push("Deja mochilas grandes en guardarropa si está disponible.")
    }
    
    if (etiquetas.includes("Parque") || etiquetas.includes("Jardín") || etiquetas.includes("Naturaleza")) {
      consejos.push("No dejes basura - lleva contigo lo que traigas.")
      consejos.push("Respeta la flora y fauna del lugar.")
      consejos.push("Mantén a las mascotas con correa si están permitidas.")
      consejos.push("Usa senderos marcados para no dañar el ecosistema.")
      if (etiquetas.includes("Familiar")) {
        consejos.push("Supervisa a los niños en áreas de juego.")
      }
    }
    
    if (etiquetas.includes("Mirador") || etiquetas.includes("Vistas")) {
      consejos.push("Ten cuidado cerca de bordes y barandales.")
      consejos.push("Respeta el espacio para que todos puedan tomar fotos.")
      consejos.push("Lleva protección solar si es un espacio abierto.")
    }
    
    if (etiquetas.includes("Centro Comercial") || etiquetas.includes("Compras")) {
      consejos.push("Estaciona en lugares designados.")
      consejos.push("Mantén a los niños cerca en áreas concurridas.")
      consejos.push("Guarda tus compras de valor de manera segura.")
    }
    
    if (etiquetas.includes("Cultural") || etiquetas.includes("Histórico")) {
      consejos.push("Infórmate sobre la historia del lugar antes de visitar.")
      consejos.push("Respeta las tradiciones y costumbres locales.")
      consejos.push("Pregunta antes de tomar fotos a personas.")
    }
    
    if (etiquetas.includes("Tranquilo") || etiquetas.includes("Acogedor")) {
      consejos.push("Mantén conversaciones en tono bajo.")
      consejos.push("Disfruta del ambiente sin prisas.")
    }
    
    if (etiquetas.includes("Gatos") || etiquetas.includes("Mascotas")) {
      consejos.push("Respeta el espacio de los animales, no los fuerces a interactuar.")
      consejos.push("Lávate las manos antes y después de tocar a los animales.")
      consejos.push("Pregunta al personal sobre las reglas de interacción.")
    }
    
    if (etiquetas.includes("Rooftop") || etiquetas.includes("Terraza")) {
      consejos.push("Ten cuidado con las alturas, especialmente si has consumido alcohol.")
      consejos.push("Viste apropiadamente para el clima (puede hacer más frío/viento).")
      consejos.push("Reserva con anticipación, especialmente los fines de semana.")
    }
    
    if (etiquetas.includes("Económico") || etiquetas.includes("Asequible")) {
      consejos.push("Lleva efectivo por si no aceptan tarjetas.")
      consejos.push("Sé paciente, pueden haber más clientes por los precios accesibles.")
    }
    
    if (etiquetas.includes("Premium") || etiquetas.includes("Exclusivo")) {
      consejos.push("Viste de manera apropiada para el establecimiento.")
      consejos.push("Reserva con días de anticipación.")
      consejos.push("Consulta la política de cancelación.")
    }
    
    if (etiquetas.includes("24 horas")) {
      consejos.push("Ten precaución si visitas muy tarde o muy temprano.")
      consejos.push("Verifica que el transporte esté disponible a tu hora de visita.")
    }
    
    if (etiquetas.includes("Especialidad") || etiquetas.includes("Gourmet")) {
      consejos.push("Pregunta al staff sobre recomendaciones - son expertos.")
      consejos.push("Disfruta la experiencia completa, no tengas prisa.")
    }
    
    if (etiquetas.includes("Saludable") || etiquetas.includes("Comida Fit")) {
      consejos.push("Pregunta sobre ingredientes si tienes restricciones alimenticias.")
      consejos.push("Disfruta de las opciones diferentes a lo tradicional.")
    }
    
    if (etiquetas.includes("Sin Gluten") || etiquetas.includes("Opciones Especiales")) {
      consejos.push("Informa claramente sobre tus alergias o restricciones.")
      consejos.push("Verifica que la preparación sea en áreas separadas.")
    }
    
    // Consejos para lugares al aire libre
    if (etiquetas.includes("Aire Libre") || etiquetas.includes("Senderismo") || etiquetas.includes("Ecoturismo")) {
      consejos.push("Lleva agua suficiente y protección solar.")
      consejos.push("Usa calzado adecuado para el terreno.")
      consejos.push("Informa a alguien sobre tu ruta si vas a áreas remotas.")
    }
    
    // Consejos para lugares deportivos o de actividad
    if (etiquetas.includes("Deporte") || etiquetas.includes("Aventuras") || etiquetas.includes("Extremo")) {
      consejos.push("Usa el equipo de seguridad proporcionado.")
      consejos.push("Sigue las instrucciones del personal capacitado.")
      consejos.push("Conoce tus límites físicos.")
    }
    
    // Consejos para lugares con música en vivo
    if (etiquetas.includes("Música") || etiquetas.includes("Shows en Vivo") || etiquetas.includes("Conciertos")) {
      consejos.push("Respeta el espacio para bailar de los demás.")
      consejos.push("No bloquees la vista del escenario.")
      consejos.push("Considera llevar protección auditiva si es muy ruidoso.")
    }
    
    // Consejos para lugares de trabajo/estudio
    if (etiquetas.includes("Trabajar") || etiquetas.includes("Estudiar")) {
      consejos.push("Usa audífonos si necesitas sonido.")
      consejos.push("Ordena tu espacio cuando termines.")
      consejos.push("Sé consciente del tiempo si el lugar está lleno.")
    }
    
    // Consejos para lugares gratuitos
    if (etiquetas.includes("Gratis")) {
      consejos.push("Considera hacer una donación si hay opción.")
      consejos.push("Valora el mantenimiento del lugar cuidándolo.")
    }
    
    // Consejos para lugares populares/turísticos
    if (etiquetas.includes("Turístico") || etiquetas.includes("Emblemático") || etiquetas.includes("Icono")) {
      consejos.push("Visita temprano para evitar multitudes.")
      consejos.push("Ten cuidado con tus pertenencias en áreas concurridas.")
      consejos.push("Investiga sobre el lugar para apreciarlo mejor.")
    }
    
    // Consejos para lugares en zonas específicas
    if (etiquetas.includes("El Poblado") || etiquetas.includes("Zona Rosa")) {
      consejos.push("Considera el tráfico al planificar tu visita.")
      consejos.push("Explora las zonas aledañas - hay mucho por descubrir.")
    }
    
    if (etiquetas.includes("Centro") || etiquetas.includes("La Candelaria")) {
      consejos.push("Ten cuidado con tus pertenencias en áreas muy concurridas.")
      consejos.push("Aprovecha para visitar varios lugares cercanos.")
    }
    
    // Eliminar duplicados y limitar a 6-8 consejos más relevantes
    const consejosUnicos = [...new Set(consejos)]
    return consejosUnicos.slice(0, 8)
  }

  const consejos = obtenerConsejos()

  if (consejos.length === 0) return null

  return (
    <div style={{
      background: "linear-gradient(145deg, #1e293b, #0f172a)",
      borderRadius: "16px",
      border: "1px solid #334155",
      padding: "25px",
      margin: "20px 0",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Línea decorativa */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #d946ef)",
        borderRadius: "16px 16px 0 0"
      }} />

      {/* Icono y título */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "20px",
          boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
        }}>
          💡
        </div>
        <h3 style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: 700,
          color: "#f1f5f9",
          background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          Consejos para tu visita
        </h3>
      </div>

      {/* Badge con número de consejos */}
      <div style={{
        display: "inline-block",
        padding: "6px 12px",
        background: "rgba(34, 197, 94, 0.15)",
        color: "#4ade80",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        border: "1px solid rgba(34, 197, 94, 0.3)",
        marginBottom: "20px",
        letterSpacing: "0.5px"
      }}>
        {consejos.length} consejos personalizados
      </div>

      {/* Lista de consejos */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        {consejos.map((consejo, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "16px",
              background: "rgba(30, 41, 59, 0.5)",
              borderRadius: "12px",
              border: "1px solid #475569",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(5px)"
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)"
              e.currentTarget.style.borderColor = "#3b82f6"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)"
              e.currentTarget.style.background = "rgba(30, 41, 59, 0.5)"
              e.currentTarget.style.borderColor = "#475569"
            }}
          >
            {/* Número del consejo */}
            <div style={{
              minWidth: "28px",
              height: "28px",
              background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              flexShrink: 0,
              boxShadow: "0 4px 10px rgba(139, 92, 246, 0.3)"
            }}>
              {index + 1}
            </div>

            {/* Texto del consejo */}
            <p style={{
              margin: 0,
              fontSize: "15px",
              color: "#cbd5e1",
              lineHeight: "1.5",
              flex: 1
            }}>
              {consejo}
            </p>

            {/* Icono decorativo */}
            <div style={{
              color: "#94a3b8",
              fontSize: "18px",
              opacity: 0.5,
              marginLeft: "10px"
            }}>
              👁️
            </div>
          </div>
        ))}
      </div>

      {/* Pie de sección */}
      <div style={{
        marginTop: "25px",
        paddingTop: "20px",
        borderTop: "1px solid #334155",
        textAlign: "center"
      }}>
        <p style={{
          margin: 0,
          fontSize: "13px",
          color: "#94a3b8",
          fontStyle: "italic",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}>
          <span>⭐</span>
          Estos consejos están personalizados según las etiquetas del lugar
          <span>⭐</span>
        </p>
        
        {/* Etiquetas aplicadas */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
          marginTop: "15px"
        }}>
          {etiquetas.slice(0, 5).map((etiqueta, idx) => (
            <span 
              key={idx}
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
          {etiquetas.length > 5 && (
            <span style={{
              background: "rgba(100, 116, 139, 0.2)",
              color: "#94a3b8",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 500
            }}>
              +{etiquetas.length - 5} más
            </span>
          )}
        </div>
      </div>

      {/* Efectos de fondo */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "-50px",
        width: "100px",
        height: "100px",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(20px)",
        zIndex: 0
      }} />

      <div style={{
        position: "absolute",
        bottom: "-30px",
        left: "-30px",
        width: "80px",
        height: "80px",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(15px)",
        zIndex: 0
      }} />
    </div>
  )
}