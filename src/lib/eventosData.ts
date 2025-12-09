export interface Evento {
  id: string
  titulo: string
  lugar: string
  fecha: string // formato ISO: "2025-12-08"
  descripcion: string
}

export const eventosFuturos: Evento[] = [
  // DICIEMBRE 2024
  {
    id: "evt-001",
    titulo: "Noche de Jazz Navideño",
    lugar: "Café Velvet",
    fecha: "2024-12-15",
    descripcion: "Concierto acústico de jazz con temática navideña. Música en vivo y cocteles especiales."
  },
  {
    id: "evt-002",
    titulo: "Taller de Barismo",
    lugar: "Pergamino Café",
    fecha: "2024-12-20",
    descripcion: "Aprende técnicas de preparación de café con expertos baristas. Incluye degustación."
  },
  {
    id: "evt-003",
    titulo: "Fiesta de Fin de Año",
    lugar: "Mojitos Restaurant Bar",
    fecha: "2024-12-31",
    descripcion: "Celebración con DJ en vivo, barra libre y fuegos artificiales a medianoche."
  },

  // ENERO 2025
  {
    id: "evt-004",
    titulo: "Exposición de Arte Contemporáneo",
    lugar: "Museo de Antioquia",
    fecha: "2025-01-10",
    descripcion: "Inauguración de exposición con artistas emergentes de Medellín."
  },
  {
    id: "evt-005",
    titulo: "Noche de Tango",
    lugar: "Salon Malaga",
    fecha: "2025-01-18",
    descripcion: "Presentación en vivo de orquesta de tango. Clases básicas incluidas."
  },
  {
    id: "evt-006",
    titulo: "Festival de Comida Saludable",
    lugar: "Al Alma Café",
    fecha: "2025-01-25",
    descripcion: "Degustación de platos saludables, talleres de nutrición y charlas."
  },

  // FEBRERO 2025
  {
    id: "evt-007",
    titulo: "Cena Romántica San Valentín",
    lugar: "Carmen",
    fecha: "2025-02-14",
    descripcion: "Menú especial de 5 tiempos con maridaje de vinos. Música en vivo."
  },
  {
    id: "evt-008",
    titulo: "Concierto de Salsa",
    lugar: "Mojitos Restaurant Bar",
    fecha: "2025-02-21",
    descripcion: "Noche de salsa con orquesta en vivo y pista de baile abierta."
  },
  {
    id: "evt-009",
    titulo: "Tour Nocturno Comuna 13",
    lugar: "Comuna 13",
    fecha: "2025-02-28",
    descripcion: "Recorrido guiado por los grafitis iluminados. Incluye historia del barrio."
  },

  // MARZO 2025
  {
    id: "evt-010",
    titulo: "Festival de Café de Origen",
    lugar: "Pergamino Café",
    fecha: "2025-03-08",
    descripcion: "Catación de cafés especiales de diferentes regiones de Colombia."
  },
  {
    id: "evt-011",
    titulo: "Noche de Stand-up Comedy",
    lugar: "La Octava Bar",
    fecha: "2025-03-15",
    descripcion: "Show de comedia con los mejores comediantes locales."
  },
  {
    id: "evt-012",
    titulo: "Maratón de Yoga",
    lugar: "Jardín Botánico de Medellín",
    fecha: "2025-03-22",
    descripcion: "Sesiones de yoga al aire libre durante todo el día. Para todos los niveles."
  },

  // ABRIL 2025
  {
    id: "evt-013",
    titulo: "Feria de Artesanías",
    lugar: "Parque de El Poblado",
    fecha: "2025-04-05",
    descripcion: "Exposición y venta de artesanías tradicionales antioqueñas."
  },
  {
    id: "evt-014",
    titulo: "Clase de Cocina Italiana",
    lugar: "Mozzafiato Art Pizzería",
    fecha: "2025-04-12",
    descripcion: "Aprende a hacer pizza artesanal y pasta fresca con chef italiano."
  },
  {
    id: "evt-015",
    titulo: "Concierto de Música Clásica",
    lugar: "Teatro Metropolitano",
    fecha: "2025-04-19",
    descripcion: "Presentación de la Orquesta Filarmónica de Medellín."
  },

  // MAYO 2025
  {
    id: "evt-016",
    titulo: "Festival de Cerveza Artesanal",
    lugar: "37 Park",
    fecha: "2025-05-03",
    descripcion: "Degustación de más de 50 cervezas artesanales nacionales."
  },
  {
    id: "evt-017",
    titulo: "Noche de Cine al Aire Libre",
    lugar: "Parque Arví",
    fecha: "2025-05-10",
    descripcion: "Proyección de película clásica colombiana bajo las estrellas."
  },
  {
    id: "evt-018",
    titulo: "Taller de Grafiti",
    lugar: "Comuna 13",
    fecha: "2025-05-17",
    descripcion: "Aprende técnicas de arte urbano con grafiteros locales."
  },

  // JUNIO 2025
  {
    id: "evt-019",
    titulo: "Feria del Libro Independiente",
    lugar: "Parque Biblioteca España",
    fecha: "2025-06-07",
    descripcion: "Exposición y venta de libros de editoriales independientes."
  },
  {
    id: "evt-020",
    titulo: "Noche de Vinos del Mundo",
    lugar: "Café Velvet",
    fecha: "2025-06-14",
    descripcion: "Catación de vinos de Francia, Italia, Chile y Argentina."
  },
  {
    id: "evt-021",
    titulo: "Concierto de Rock Alternativo",
    lugar: "Vintrash Bar",
    fecha: "2025-06-21",
    descripcion: "Presentación de bandas emergentes del rock colombiano."
  },

  // JULIO 2025
  {
    id: "evt-022",
    titulo: "Festival de la Arepa",
    lugar: "Mondongo's El Poblado",
    fecha: "2025-07-05",
    descripcion: "Variedad de arepas tradicionales y creativas de todo el país."
  },
  {
    id: "evt-023",
    titulo: "Observación Astronómica",
    lugar: "Planetario Medellín",
    fecha: "2025-07-12",
    descripcion: "Noche de observación de estrellas con telescopios profesionales."
  },
  {
    id: "evt-024",
    titulo: "Carrera Nocturna 5K",
    lugar: "Parque de los Pies Descalzos",
    fecha: "2025-07-19",
    descripcion: "Carrera nocturna iluminada. Para corredores de todos los niveles."
  },

  // AGOSTO 2025
  {
    id: "evt-025",
    titulo: "Fiesta de la Antioqueñidad",
    lugar: "Salon Malaga",
    fecha: "2025-08-02",
    descripcion: "Celebración de la cultura paisa con música, comida y baile tradicional."
  },
  {
    id: "evt-026",
    titulo: "Mercado Orgánico",
    lugar: "Jardín Botánico de Medellín",
    fecha: "2025-08-09",
    descripcion: "Productos orgánicos, talleres de huertas urbanas y comida saludable."
  },
  {
    id: "evt-027",
    titulo: "Noche de Karaoke",
    lugar: "La Jaus Pub Rock",
    fecha: "2025-08-16",
    descripcion: "Competencia de karaoke con premios para los mejores intérpretes."
  },

  // SEPTIEMBRE 2025
  {
    id: "evt-028",
    titulo: "Festival de Flores Nocturno",
    lugar: "Jardín Botánico de Medellín",
    fecha: "2025-09-06",
    descripcion: "Exposición de flores iluminadas, música y gastronomía."
  },
  {
    id: "evt-029",
    titulo: "Clase de Mixología",
    lugar: "Trilogía Bar",
    fecha: "2025-09-13",
    descripcion: "Aprende a preparar cócteles de autor con bartenders expertos."
  },
  {
    id: "evt-030",
    titulo: "Concierto de Música Andina",
    lugar: "Teatro Lido",
    fecha: "2025-09-20",
    descripcion: "Presentación de grupos de música andina colombiana."
  }
]