import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// Datos de ejemplo para planes
const plansData = [
  {
    name: "Fibra 20Mbps",
    speed: "20Mbps",
    price: 300.0,
    description: "Plan básico de internet por fibra óptica",
    is_active: true,
  },
  {
    name: "Fibra 50Mbps",
    speed: "50Mbps",
    price: 500.0,
    description: "Plan estándar de internet por fibra óptica",
    is_active: true,
  },
  {
    name: "Fibra 100Mbps",
    speed: "100Mbps",
    price: 750.0,
    description: "Plan plus de internet por fibra óptica",
    is_active: true,
  },
  {
    name: "Fibra 200Mbps",
    speed: "200Mbps",
    price: 1000.0,
    description: "Plan premium de internet por fibra óptica",
    is_active: true,
  },
  {
    name: "Fibra 500Mbps",
    speed: "500Mbps",
    price: 1500.0,
    description: "Plan ultra de internet por fibra óptica",
    is_active: false,
  },
]

// Datos de ejemplo para clientes
const generateClients = (planIds: string[]) => {
  const statuses = ["active", "pending", "overdue"]
  const clients = []

  const names = [
    "Juan Pérez",
    "María López",
    "Carlos Rodríguez",
    "Ana Martínez",
    "Roberto Sánchez",
    "Laura Gómez",
    "Pedro Hernández",
    "Sofía Torres",
    "Miguel Ramírez",
    "Carmen Flores",
    "José Díaz",
    "Patricia Ruiz",
    "Fernando Vargas",
    "Gabriela Castro",
    "Ricardo Morales",
  ]

  for (let i = 0; i < names.length; i++) {
    const randomPlanIndex = Math.floor(Math.random() * planIds.length)
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const paymentDay = Math.floor(Math.random() * 28) + 1

    clients.push({
      name: names[i],
      email: names[i].toLowerCase().replace(" ", ".") + "@example.com",
      phone: `+123456789${i}`,
      address: `Calle Principal ${i + 100}, Colonia Centro`,
      city: "Ciudad de México",
      state: "CDMX",
      postal_code: "12345",
      id_number: `ABC${100000 + i}`,
      plan_id: planIds[randomPlanIndex],
      installation_date: new Date(2024, 0, i + 1).toISOString().split("T")[0],
      payment_day: paymentDay,
      payment_method: ["Tarjeta", "Transferencia", "Efectivo"][i % 3],
      status: randomStatus,
      notes: `Cliente desde enero 2024. ${randomStatus === "active" ? "Al día con sus pagos." : randomStatus === "pending" ? "Próximo a vencer." : "Pago vencido."}`,
    })
  }

  return clients
}

// Datos de ejemplo para pagos
const generatePayments = (clientIds: string[]) => {
  const payments = []
  const methods = ["Tarjeta", "Transferencia", "Efectivo"]
  const statuses = ["completed", "pending", "failed"]

  for (let i = 0; i < 30; i++) {
    const randomClientIndex = Math.floor(Math.random() * clientIds.length)
    const randomMethod = methods[Math.floor(Math.random() * methods.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const paymentDate = new Date(2025, 2, i + 1).toISOString().split("T")[0]
    const dueDate = new Date(2025, 3, i + 15).toISOString().split("T")[0]

    payments.push({
      client_id: clientIds[randomClientIndex],
      amount: [300, 500, 750, 1000][Math.floor(Math.random() * 4)],
      payment_date: paymentDate,
      due_date: dueDate,
      method: randomMethod,
      reference: `REF${100000 + i}`,
      status: randomStatus,
      period_start: new Date(2025, 2, 1).toISOString().split("T")[0],
      period_end: new Date(2025, 2, 31).toISOString().split("T")[0],
      notes: `Pago ${randomStatus === "completed" ? "completado" : randomStatus === "pending" ? "pendiente" : "fallido"} para el mes de marzo.`,
    })
  }

  return payments
}

// Datos de ejemplo para tickets de soporte
const generateSupportTickets = (clientIds: string[]) => {
  const tickets = []
  const types = ["Conexión", "Hardware", "Velocidad", "Configuración"]
  const statuses = ["pending", "in_progress", "resolved"]
  const priorities = ["low", "medium", "high"]

  for (let i = 0; i < 20; i++) {
    const randomClientIndex = Math.floor(Math.random() * clientIds.length)
    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)]

    tickets.push({
      client_id: clientIds[randomClientIndex],
      type: randomType,
      description: `Problema de ${randomType.toLowerCase()} reportado por el cliente.`,
      status: randomStatus,
      priority: randomPriority,
      resolution: randomStatus === "resolved" ? "Problema resuelto satisfactoriamente." : null,
      resolved_at: randomStatus === "resolved" ? new Date().toISOString() : null,
    })
  }

  return tickets
}

// Datos de ejemplo para mensajes
const generateMessages = (clientIds: string[]) => {
  const messages = []
  const types = ["Recordatorio", "Confirmación", "Soporte", "Información"]
  const statuses = ["sent", "delivered", "read"]

  for (let i = 0; i < 25; i++) {
    const randomClientIndex = Math.floor(Math.random() * clientIds.length)
    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    messages.push({
      client_id: clientIds[randomClientIndex],
      type: randomType,
      content: `Mensaje de ${randomType.toLowerCase()} para el cliente.`,
      status: randomStatus,
      sent_at: new Date(2025, 2, i + 1).toISOString(),
      delivered_at: randomStatus !== "sent" ? new Date(2025, 2, i + 1, 0, 5).toISOString() : null,
      read_at: randomStatus === "read" ? new Date(2025, 2, i + 1, 0, 10).toISOString() : null,
    })
  }

  return messages
}

// Datos de ejemplo para plantillas de mensajes
const messageTemplatesData = [
  {
    name: "Recordatorio de Pago",
    type: "Pago",
    content:
      "Hola [nombre], te recordamos que tu pago vence el [fecha]. Puedes realizarlo a través de nuestra plataforma o responder a este mensaje para más opciones.",
    is_active: true,
  },
  {
    name: "Confirmación de Pago",
    type: "Pago",
    content: "Hola [nombre], hemos recibido tu pago por $[monto]. Gracias por tu preferencia.",
    is_active: true,
  },
  {
    name: "Aviso de Corte",
    type: "Pago",
    content:
      "Hola [nombre], tu servicio será suspendido por falta de pago. Para evitar la suspensión, realiza tu pago lo antes posible.",
    is_active: true,
  },
  {
    name: "Bienvenida",
    type: "Onboarding",
    content:
      "¡Bienvenido a [empresa]! Gracias por confiar en nosotros. Estamos aquí para ayudarte con cualquier consulta.",
    is_active: true,
  },
  {
    name: "Soporte Técnico",
    type: "Soporte",
    content:
      "Hola [nombre], lamentamos los inconvenientes con tu servicio. Nuestro equipo técnico está trabajando para solucionarlo lo antes posible.",
    is_active: true,
  },
]

// Datos de ejemplo para configuración de la empresa
const companySettingsData = {
  company_name: "Mi Proveedor ISP",
  tax_id: "ABC123456789",
  email: "contacto@miproveedor.com",
  phone: "+1234567890",
  address: "Calle Principal 123, Ciudad",
  logo_url: null,
  currency: "MXN",
  timezone: "America/Mexico_City",
  date_format: "DD/MM/YYYY",
  language: "es",
}

// Datos de ejemplo para usuarios del sistema
const staffUsersData = [
  {
    name: "Administrador",
    email: "admin@miproveedor.com",
    role: "admin",
    is_active: true,
  },
  {
    name: "Soporte Técnico",
    email: "soporte@miproveedor.com",
    role: "tech",
    is_active: true,
  },
  {
    name: "Ventas",
    email: "ventas@miproveedor.com",
    role: "sales",
    is_active: true,
  },
  {
    name: "Contabilidad",
    email: "contabilidad@miproveedor.com",
    role: "accounting",
    is_active: true,
  },
  {
    name: "Operador",
    email: "operador@miproveedor.com",
    role: "operator",
    is_active: false,
  },
]

export async function GET() {
  try {
    const supabase = createServerClient()

    // Limpiar tablas existentes (en orden inverso para respetar las restricciones de clave foránea)
    await supabase.from("messages").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("technical_visits").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("support_tickets").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("payments").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("clients").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("message_templates").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("plans").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("company_settings").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    await supabase.from("staff_users").delete().neq("id", "00000000-0000-0000-0000-000000000000")

    // Insertar planes
    const { data: plansInserted, error: plansError } = await supabase.from("plans").insert(plansData).select()

    if (plansError) throw plansError

    // Obtener IDs de planes insertados
    const planIds = plansInserted.map((plan) => plan.id)

    // Insertar clientes
    const clientsData = generateClients(planIds)
    const { data: clientsInserted, error: clientsError } = await supabase.from("clients").insert(clientsData).select()

    if (clientsError) throw clientsError

    // Obtener IDs de clientes insertados
    const clientIds = clientsInserted.map((client) => client.id)

    // Insertar pagos
    const paymentsData = generatePayments(clientIds)
    const { error: paymentsError } = await supabase.from("payments").insert(paymentsData)

    if (paymentsError) throw paymentsError

    // Insertar tickets de soporte
    const supportTicketsData = generateSupportTickets(clientIds)
    const { error: supportTicketsError } = await supabase.from("support_tickets").insert(supportTicketsData)

    if (supportTicketsError) throw supportTicketsError

    // Insertar mensajes
    const messagesData = generateMessages(clientIds)
    const { error: messagesError } = await supabase.from("messages").insert(messagesData)

    if (messagesError) throw messagesError

    // Insertar plantillas de mensajes
    const { error: messageTemplatesError } = await supabase.from("message_templates").insert(messageTemplatesData)

    if (messageTemplatesError) throw messageTemplatesError

    // Insertar configuración de la empresa
    const { error: companySettingsError } = await supabase.from("company_settings").insert(companySettingsData)

    if (companySettingsError) throw companySettingsError

    // Insertar usuarios del sistema
    const { error: staffUsersError } = await supabase.from("staff_users").insert(staffUsersData)

    if (staffUsersError) throw staffUsersError

    return NextResponse.json({
      success: true,
      message: "Datos de ejemplo insertados correctamente",
      data: {
        plans: plansInserted.length,
        clients: clientsInserted.length,
        payments: paymentsData.length,
        supportTickets: supportTicketsData.length,
        messages: messagesData.length,
        messageTemplates: messageTemplatesData.length,
        companySettings: 1,
        staffUsers: staffUsersData.length,
      },
    })
  } catch (error) {
    console.error("Error al insertar datos de ejemplo:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
