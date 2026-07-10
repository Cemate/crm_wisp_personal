import type { Database } from "@/types/supabase"
import { mockTickets, findClient, genId, type MockTicket } from "@/lib/mock-data"

export type SupportTicket = Database["public"]["Tables"]["support_tickets"]["Row"]
export type SupportTicketInsert = Database["public"]["Tables"]["support_tickets"]["Insert"]
export type SupportTicketUpdate = Database["public"]["Tables"]["support_tickets"]["Update"]

function withClient(ticket: MockTicket): MockTicket {
  return { ...ticket, clients: findClient(ticket.client_id) }
}

export async function getTickets() {
  return mockTickets
    .map(withClient)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export async function getTicketsByClientId(clientId: string) {
  return mockTickets
    .filter((t) => t.client_id === clientId)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export async function getTicketsByStatus(status: string) {
  return mockTickets
    .filter((t) => t.status === status)
    .map(withClient)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export async function getTicketById(id: string) {
  const ticket = mockTickets.find((t) => t.id === id)
  return ticket ? withClient(ticket) : null
}

export async function createTicket(ticket: SupportTicketInsert) {
  const nowIso = new Date().toISOString()
  const newTicket: MockTicket = {
    id: genId("ticket"),
    client_id: ticket.client_id,
    type: ticket.type,
    description: ticket.description,
    status: ticket.status ?? "open",
    priority: ticket.priority ?? "medium",
    assigned_to: ticket.assigned_to ?? null,
    resolution: ticket.resolution ?? null,
    created_at: nowIso,
    updated_at: nowIso,
    resolved_at: ticket.resolved_at ?? null,
  }
  mockTickets.unshift(newTicket)
  return newTicket
}

export async function updateTicket(id: string, ticket: SupportTicketUpdate) {
  const index = mockTickets.findIndex((t) => t.id === id)
  if (index === -1) throw new Error(`Ticket with id ${id} not found`)
  mockTickets[index] = {
    ...mockTickets[index],
    ...ticket,
    updated_at: new Date().toISOString(),
  } as MockTicket
  return mockTickets[index]
}

export async function deleteTicket(id: string) {
  const index = mockTickets.findIndex((t) => t.id === id)
  if (index !== -1) mockTickets.splice(index, 1)
  return true
}
