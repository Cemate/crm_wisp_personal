// Datos mock de la cuenta del usuario autenticado (sin base de datos)

export type AccountUser = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  position: string
  timezone: string
  language: string
  memberSince: string
  lastLogin: string
  twoFactorEnabled: boolean
}

export const currentUser: AccountUser = {
  id: "user-1",
  name: "Carlos Ramírez",
  email: "carlos.ramirez@miproveedor.com",
  phone: "+52 555 123 4567",
  role: "Administrador",
  position: "Gerente de Operaciones",
  timezone: "America/Mexico_City",
  language: "Español",
  memberSince: "2023-08-14",
  lastLogin: "2026-07-30T09:42:00.000Z",
  twoFactorEnabled: true,
}

export type AccountSession = {
  id: string
  device: string
  browser: string
  location: string
  ip: string
  lastActive: string
  current: boolean
}

export const activeSessions: AccountSession[] = [
  {
    id: "sess-1",
    device: "MacBook Pro",
    browser: "Chrome 128",
    location: "Ciudad de México, MX",
    ip: "189.203.45.12",
    lastActive: "Ahora",
    current: true,
  },
  {
    id: "sess-2",
    device: "iPhone 15",
    browser: "Safari Mobile",
    location: "Ciudad de México, MX",
    ip: "189.203.45.88",
    lastActive: "Hace 3 horas",
    current: false,
  },
  {
    id: "sess-3",
    device: "Windows PC",
    browser: "Edge 127",
    location: "Guadalajara, MX",
    ip: "201.144.90.5",
    lastActive: "Hace 2 días",
    current: false,
  },
]

export type ActivityEntry = {
  id: string
  action: string
  detail: string
  date: string
}

export const recentActivity: ActivityEntry[] = [
  {
    id: "act-1",
    action: "Registró un pago",
    detail: "Pago de $1,200.00 de Juan Pérez",
    date: "Hoy, 09:15",
  },
  {
    id: "act-2",
    action: "Creó un cliente",
    detail: "Alta de María López con plan Premium",
    date: "Ayer, 17:40",
  },
  {
    id: "act-3",
    action: "Cerró un ticket",
    detail: "Ticket #TK-2043 — Falla de conexión",
    date: "28 jul, 11:20",
  },
  {
    id: "act-4",
    action: "Actualizó configuración",
    detail: "Modificó plantillas de WhatsApp",
    date: "26 jul, 08:05",
  },
]

export function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
