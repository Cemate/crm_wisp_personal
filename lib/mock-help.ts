// Datos mock del Centro de Ayuda (soporte de la plataforma para el operador del CRM)

export type HelpFaq = {
  id: string
  category: string
  question: string
  answer: string
}

export type HelpGuide = {
  id: string
  title: string
  description: string
  category: string
  minutes: number
}

export type HelpTicket = {
  id: string
  subject: string
  category: string
  status: "open" | "in_progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
  lastUpdate: string
  agent: string | null
}

export const helpChannels = [
  {
    id: "chat",
    name: "Chat en vivo",
    description: "Respuesta inmediata con un agente",
    detail: "Tiempo de espera aprox. 2 min",
    availability: "Disponible",
    online: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Escríbenos desde tu teléfono",
    detail: "+52 55 1234 5678",
    availability: "Disponible",
    online: true,
  },
  {
    id: "email",
    name: "Correo electrónico",
    description: "Ideal para consultas detalladas",
    detail: "soporte@ispcrm.mx",
    availability: "Respuesta en 24 h",
    online: false,
  },
  {
    id: "phone",
    name: "Teléfono",
    description: "Soporte telefónico directo",
    detail: "800 123 4567",
    availability: "Lun a Vie, 9:00 - 19:00",
    online: false,
  },
]

export const helpFaqs: HelpFaq[] = [
  {
    id: "faq-1",
    category: "Clientes",
    question: "¿Cómo doy de alta un cliente con servicios adicionales?",
    answer:
      "Ve a Clientes y presiona 'Nuevo Cliente'. Completa los datos, elige el plan y en la sección 'Servicios Adicionales' marca los servicios que contrató. Al guardar, el sistema genera automáticamente el primer pago pendiente incluyendo los cargos únicos como la instalación.",
  },
  {
    id: "faq-2",
    category: "Facturación",
    question: "¿Por qué el primer pago es más alto que la mensualidad?",
    answer:
      "El primer pago incluye los cargos únicos (instalación, materiales o IP fija) más el primer mes de servicio. A partir del segundo pago solo se cobra el plan y los servicios recurrentes.",
  },
  {
    id: "faq-3",
    category: "Facturación",
    question: "¿Puedo registrar un pago parcial?",
    answer:
      "Sí. En Pagos, presiona 'Registrar Pago', selecciona el cliente y ajusta el monto manualmente. El pago quedará registrado y podrás dar seguimiento al saldo pendiente desde el estado de cuenta del cliente.",
  },
  {
    id: "faq-4",
    category: "WhatsApp IA",
    question: "¿Cómo conecto el asistente de WhatsApp?",
    answer:
      "Entra a Configuración, pestaña Integraciones y presiona 'Configurar' en WhatsApp Business API. Ahí podrás vincular tu número, activar el asistente y administrar las plantillas de mensajes automáticos.",
  },
  {
    id: "faq-5",
    category: "WhatsApp IA",
    question: "¿El asistente puede responder sobre adeudos?",
    answer:
      "Sí. El asistente identifica al cliente por su número de teléfono y puede informar su saldo, fecha de corte y métodos de pago disponibles. Si detecta una intención fuera de su alcance, escala la conversación a un agente humano.",
  },
  {
    id: "faq-6",
    category: "Soporte técnico",
    question: "¿Cuál es la diferencia entre incidencia y visita técnica?",
    answer:
      "Una incidencia es el reporte del cliente (por ejemplo, falla de conexión). Una visita técnica es la programación de un técnico en sitio para resolverla. Desde una incidencia puedes programar la visita relacionada.",
  },
  {
    id: "faq-7",
    category: "Cuenta",
    question: "¿Cómo activo la verificación en dos pasos?",
    answer:
      "Abre el menú Mi Cuenta, entra a la pestaña Seguridad y activa el interruptor de verificación en dos pasos. Te recomendamos usar una app de autenticación como respaldo.",
  },
  {
    id: "faq-8",
    category: "Cuenta",
    question: "¿Puedo cerrar sesión en otros dispositivos?",
    answer:
      "Sí. En Mi Cuenta, pestaña Sesiones, verás todos los dispositivos activos. Puedes cerrar sesiones individuales o usar 'Cerrar todas las demás' para revocar el acceso en el resto de los equipos.",
  },
]

export const helpGuides: HelpGuide[] = [
  {
    id: "guide-1",
    title: "Primeros pasos con el CRM",
    description: "Configura tu empresa, planes y da de alta a tus primeros clientes.",
    category: "Inicio",
    minutes: 8,
  },
  {
    id: "guide-2",
    title: "Cobranza automatizada",
    description: "Configura recordatorios de pago y evita la morosidad en tu red.",
    category: "Facturación",
    minutes: 6,
  },
  {
    id: "guide-3",
    title: "Asistente de WhatsApp con IA",
    description: "Conecta tu número, crea plantillas y entrena las respuestas del asistente.",
    category: "WhatsApp IA",
    minutes: 12,
  },
  {
    id: "guide-4",
    title: "Gestión de incidencias y visitas",
    description: "Organiza a tus técnicos y da seguimiento a cada reporte hasta su cierre.",
    category: "Soporte",
    minutes: 7,
  },
  {
    id: "guide-5",
    title: "Reportes e indicadores clave",
    description: "Interpreta ingresos, morosidad y crecimiento de suscriptores.",
    category: "Reportes",
    minutes: 10,
  },
  {
    id: "guide-6",
    title: "Servicios adicionales y cargos únicos",
    description: "Define instalación, equipos y extras que puedes facturar a tus clientes.",
    category: "Facturación",
    minutes: 5,
  },
]

export const helpTickets: HelpTicket[] = [
  {
    id: "SOP-1042",
    subject: "El asistente de WhatsApp no responde plantillas",
    category: "WhatsApp IA",
    status: "in_progress",
    priority: "high",
    createdAt: "2026-07-27",
    lastUpdate: "hace 3 horas",
    agent: "Laura Méndez",
  },
  {
    id: "SOP-1037",
    subject: "Duda sobre desglose de cargos únicos en facturas",
    category: "Facturación",
    status: "open",
    priority: "medium",
    createdAt: "2026-07-25",
    lastUpdate: "hace 1 día",
    agent: null,
  },
  {
    id: "SOP-1021",
    subject: "Solicitud de exportación masiva de clientes",
    category: "Clientes",
    status: "resolved",
    priority: "low",
    createdAt: "2026-07-18",
    lastUpdate: "hace 6 días",
    agent: "Carlos Ruiz",
  },
]

export const helpTicketStatusLabels: Record<HelpTicket["status"], string> = {
  open: "Abierto",
  in_progress: "En proceso",
  resolved: "Resuelto",
}

export const helpTicketPriorityLabels: Record<HelpTicket["priority"], string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
}

export const platformStatus = {
  overall: "Operativo",
  services: [
    { name: "Plataforma CRM", status: "Operativo" },
    { name: "API de WhatsApp", status: "Operativo" },
    { name: "Procesamiento de pagos", status: "Degradado" },
    { name: "Envío de correos", status: "Operativo" },
  ],
}
