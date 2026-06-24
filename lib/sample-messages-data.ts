export type MessageTemplate = {
  id: string
  name: string
  type: string
  content: string
  status: string
}

export type Campaign = {
  id: string
  name: string
  type: string
  recipients: string
  status: string
  date: string
  template: string
  message: string
}

export const sampleTemplates: MessageTemplate[] = [
  {
    id: "1",
    name: "Recordatorio de Pago",
    type: "Pago",
    content:
      "Hola [nombre], te recordamos que tu pago de $[monto] vence el [fecha]. Puedes pagar desde nuestro portal o en nuestras oficinas. ¡Gracias!",
    status: "Activo",
  },
  {
    id: "2",
    name: "Confirmación de Pago",
    type: "Pago",
    content:
      "Hola [nombre], hemos recibido tu pago por $[monto]. Tu servicio está activo hasta el [fecha]. ¡Gracias por tu preferencia!",
    status: "Activo",
  },
  {
    id: "3",
    name: "Aviso de Corte",
    type: "Pago",
    content:
      "Hola [nombre], tu servicio será suspendido por falta de pago a partir del [fecha]. Regulariza tu situación para evitar interrupciones.",
    status: "Activo",
  },
  {
    id: "4",
    name: "Bienvenida",
    type: "Onboarding",
    content:
      "¡Bienvenido a [empresa], [nombre]! Gracias por confiar en nosotros. Tu instalación está programada para el [fecha].",
    status: "Activo",
  },
  {
    id: "5",
    name: "Soporte Técnico",
    type: "Soporte",
    content:
      "Hola [nombre], lamentamos los inconvenientes con tu servicio. Un técnico se pondrá en contacto contigo a la brevedad.",
    status: "Activo",
  },
]

export const sampleCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Recordatorio Mensual",
    type: "Pago",
    recipients: "245",
    status: "Programada",
    date: "01/04/2025",
    template: "Recordatorio de Pago",
    message:
      "Hola [nombre], te recordamos que tu pago mensual vence pronto. Realiza tu pago a tiempo para evitar interrupciones.",
  },
  {
    id: "2",
    name: "Promoción Upgrade",
    type: "Marketing",
    recipients: "120",
    status: "Completada",
    date: "15/03/2025",
    template: "",
    message: "¡Mejora tu plan y obtén el doble de velocidad por el mismo precio durante 3 meses!",
  },
  {
    id: "3",
    name: "Mantenimiento Programado",
    type: "Informativa",
    recipients: "245",
    status: "Completada",
    date: "10/03/2025",
    template: "",
    message:
      "Estimado cliente, realizaremos mantenimiento programado el [fecha] de 2:00 a 4:00 AM. El servicio podría verse afectado.",
  },
  {
    id: "4",
    name: "Encuesta de Satisfacción",
    type: "Feedback",
    recipients: "200",
    status: "Borrador",
    date: "-",
    template: "",
    message: "Tu opinión es importante. Por favor responde nuestra breve encuesta de satisfacción: [enlace]",
  },
  {
    id: "5",
    name: "Nuevos Planes",
    type: "Marketing",
    recipients: "245",
    status: "Programada",
    date: "10/04/2025",
    template: "",
    message: "¡Conoce nuestros nuevos planes de internet con mayor velocidad y mejores precios! Más info: [enlace]",
  },
]

export function getTemplateById(id: string): MessageTemplate | undefined {
  return sampleTemplates.find((t) => t.id === id)
}

export function getCampaignById(id: string): Campaign | undefined {
  return sampleCampaigns.find((c) => c.id === id)
}
