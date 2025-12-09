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
  <div className="space-y-2">
    {consejos.map((consejo, index) => (
      <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
        {consejo}
      </p>
    ))}
  </div>
)

}