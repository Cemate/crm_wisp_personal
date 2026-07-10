// Almacén de datos mock en memoria para toda la aplicación (sin base de datos).
// Nota: los datos se reinician cuando el servidor se reinicia.

export type MockPlan = {
  id: string
  name: string
  speed: string
  price: number
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type MockClient = {
  id: string
  name: string
  email: string | null
  phone: string
  address: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  id_number: string | null
  plan_id: string | null
  installation_date: string | null
  payment_day: number | null
  payment_method: string | null
  status: string
  notes: string | null
  coordinates: any | null
  additional_services: string[]
  created_at: string
  updated_at: string
  plans?: MockPlan | null
}

export type MockPayment = {
  id: string
  client_id: string
  amount: number
  payment_date: string
  due_date: string
  method: string
  reference: string | null
  status: string
  period_start: string | null
  period_end: string | null
  notes: string | null
  created_at: string
  updated_at: string
  clients?: MockClient | null
}

export type MockTicket = {
  id: string
  client_id: string
  type: string
  description: string
  status: string
  priority: string
  assigned_to: string | null
  resolution: string | null
  created_at: string
  updated_at: string
  resolved_at: string | null
  clients?: MockClient | null
}

export type MockVisit = {
  id: string
  client_id: string
  ticket_id: string | null
  scheduled_date: string
  scheduled_time: string
  type: string
  status: string
  technician_name: string | null
  notes: string | null
  created_at: string
  updated_at: string
  completed_at: string | null
  clients?: MockClient | null
  support_tickets?: MockTicket | null
}

const now = new Date().toISOString()

export const mockPlans: MockPlan[] = [
  {
    id: "plan-1",
    name: "Básico",
    speed: "10 Mbps",
    price: 300,
    description: "Ideal para navegación y redes sociales",
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "plan-2",
    name: "Estándar",
    speed: "30 Mbps",
    price: 500,
    description: "Perfecto para streaming y trabajo en casa",
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "plan-3",
    name: "Premium",
    speed: "100 Mbps",
    price: 800,
    description: "Máxima velocidad para gaming y múltiples dispositivos",
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "plan-4",
    name: "Empresarial",
    speed: "200 Mbps",
    price: 1500,
    description: "Conexión dedicada para negocios",
    is_active: false,
    created_at: now,
    updated_at: now,
  },
]

export const mockClients: MockClient[] = [
  {
    id: "client-1",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "555-123-4567",
    address: "Av. Reforma 123",
    city: "Ciudad de México",
    state: "CDMX",
    postal_code: "06600",
    id_number: "ABC123456",
    plan_id: "plan-2",
    installation_date: "2024-01-15",
    payment_day: 5,
    payment_method: "Transferencia",
    status: "active",
    notes: "Cliente desde enero 2024. Instalación sin problemas.",
    coordinates: { lat: 19.432608, lng: -99.133209 },
    additional_services: ["router-premium", "soporte-prioritario"],
    created_at: "2024-01-15T10:00:00.000Z",
    updated_at: now,
  },
  {
    id: "client-2",
    name: "María López",
    email: "maria.lopez@example.com",
    phone: "555-234-5678",
    address: "Calle Juárez 456",
    city: "Guadalajara",
    state: "Jalisco",
    postal_code: "44100",
    id_number: "DEF789012",
    plan_id: "plan-3",
    installation_date: "2024-02-20",
    payment_day: 10,
    payment_method: "Efectivo",
    status: "active",
    notes: "Cliente premium.",
    coordinates: { lat: 20.659699, lng: -103.349609 },
    additional_services: ["ip-fija"],
    created_at: "2024-02-20T10:00:00.000Z",
    updated_at: now,
  },
  {
    id: "client-3",
    name: "Carlos Ramírez",
    email: "carlos.ramirez@example.com",
    phone: "555-345-6789",
    address: "Blvd. Díaz Ordaz 789",
    city: "Monterrey",
    state: "Nuevo León",
    postal_code: "64000",
    id_number: "GHI345678",
    plan_id: "plan-1",
    installation_date: "2024-03-10",
    payment_day: 15,
    payment_method: "Tarjeta",
    status: "suspended",
    notes: "Pago pendiente del mes actual.",
    coordinates: { lat: 25.686613, lng: -100.316116 },
    additional_services: [],
    created_at: "2024-03-10T10:00:00.000Z",
    updated_at: now,
  },
  {
    id: "client-4",
    name: "Ana Torres",
    email: "ana.torres@example.com",
    phone: "555-456-7890",
    address: "Av. Universidad 321",
    city: "Puebla",
    state: "Puebla",
    postal_code: "72000",
    id_number: "JKL901234",
    plan_id: "plan-2",
    installation_date: "2024-04-05",
    payment_day: 1,
    payment_method: "Transferencia",
    status: "active",
    notes: "",
    coordinates: { lat: 19.041297, lng: -98.206199 },
    additional_services: ["router-premium"],
    created_at: "2024-04-05T10:00:00.000Z",
    updated_at: now,
  },
]

// Adjuntar el plan relacionado a cada cliente
function attachPlan(client: MockClient): MockClient {
  return { ...client, plans: mockPlans.find((p) => p.id === client.plan_id) ?? null }
}

export const mockPayments: MockPayment[] = [
  {
    id: "payment-1",
    client_id: "client-1",
    amount: 500,
    payment_date: "2024-06-05",
    due_date: "2024-06-05",
    method: "Transferencia",
    reference: "TR-001",
    status: "paid",
    period_start: "2024-06-01",
    period_end: "2024-06-30",
    notes: null,
    created_at: "2024-06-05T10:00:00.000Z",
    updated_at: now,
  },
  {
    id: "payment-2",
    client_id: "client-2",
    amount: 800,
    payment_date: "2024-06-10",
    due_date: "2024-06-10",
    method: "Efectivo",
    reference: "EF-002",
    status: "paid",
    period_start: "2024-06-01",
    period_end: "2024-06-30",
    notes: null,
    created_at: "2024-06-10T10:00:00.000Z",
    updated_at: now,
  },
  {
    id: "payment-3",
    client_id: "client-3",
    amount: 300,
    payment_date: "2024-06-15",
    due_date: "2024-06-15",
    method: "Tarjeta",
    reference: null,
    status: "pending",
    period_start: "2024-06-01",
    period_end: "2024-06-30",
    notes: "Pago atrasado",
    created_at: "2024-06-15T10:00:00.000Z",
    updated_at: now,
  },
  {
    id: "payment-4",
    client_id: "client-4",
    amount: 500,
    payment_date: "2024-06-01",
    due_date: "2024-06-01",
    method: "Transferencia",
    reference: "TR-004",
    status: "paid",
    period_start: "2024-06-01",
    period_end: "2024-06-30",
    notes: null,
    created_at: "2024-06-01T10:00:00.000Z",
    updated_at: now,
  },
]

export const mockTickets: MockTicket[] = [
  {
    id: "ticket-1",
    client_id: "client-1",
    type: "Falla de conexión",
    description: "El cliente reporta intermitencia en el servicio.",
    status: "open",
    priority: "high",
    assigned_to: "Técnico Roberto",
    resolution: null,
    created_at: "2024-06-18T09:00:00.000Z",
    updated_at: now,
    resolved_at: null,
  },
  {
    id: "ticket-2",
    client_id: "client-2",
    type: "Cambio de plan",
    description: "Solicita aumentar velocidad.",
    status: "in_progress",
    priority: "medium",
    assigned_to: "Técnico Laura",
    resolution: null,
    created_at: "2024-06-19T11:00:00.000Z",
    updated_at: now,
    resolved_at: null,
  },
  {
    id: "ticket-3",
    client_id: "client-4",
    type: "Instalación",
    description: "Reubicación de router.",
    status: "resolved",
    priority: "low",
    assigned_to: "Técnico Roberto",
    resolution: "Router reubicado correctamente.",
    created_at: "2024-06-12T08:00:00.000Z",
    updated_at: now,
    resolved_at: "2024-06-13T14:00:00.000Z",
  },
]

export const mockVisits: MockVisit[] = [
  {
    id: "visit-1",
    client_id: "client-1",
    ticket_id: "ticket-1",
    scheduled_date: "2024-06-25",
    scheduled_time: "10:00",
    type: "Reparación",
    status: "scheduled",
    technician_name: "Técnico Roberto",
    notes: "Revisar intermitencia de señal.",
    created_at: "2024-06-18T09:30:00.000Z",
    updated_at: now,
    completed_at: null,
  },
  {
    id: "visit-2",
    client_id: "client-4",
    ticket_id: "ticket-3",
    scheduled_date: "2024-06-13",
    scheduled_time: "12:00",
    type: "Instalación",
    status: "completed",
    technician_name: "Técnico Roberto",
    notes: "Reubicación de router completada.",
    created_at: "2024-06-12T08:30:00.000Z",
    updated_at: now,
    completed_at: "2024-06-13T14:00:00.000Z",
  },
]

// Helpers para resolver relaciones al vuelo
export function withPlan(client: MockClient): MockClient {
  return attachPlan(client)
}

export function findClient(id: string): MockClient | null {
  const client = mockClients.find((c) => c.id === id)
  return client ? attachPlan(client) : null
}

export function findTicket(id: string): MockTicket | null {
  return mockTickets.find((t) => t.id === id) ?? null
}

export function genId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}
