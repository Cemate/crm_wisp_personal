import type { Database } from "@/types/supabase"
import { mockVisits, findClient, findTicket, genId, type MockVisit } from "@/lib/mock-data"

export type TechnicalVisit = Database["public"]["Tables"]["technical_visits"]["Row"]
export type TechnicalVisitInsert = Database["public"]["Tables"]["technical_visits"]["Insert"]
export type TechnicalVisitUpdate = Database["public"]["Tables"]["technical_visits"]["Update"]

function withRelations(visit: MockVisit): MockVisit {
  return {
    ...visit,
    clients: findClient(visit.client_id),
    support_tickets: visit.ticket_id ? findTicket(visit.ticket_id) : null,
  }
}

export async function getVisits() {
  return mockVisits
    .map(withRelations)
    .sort((a, b) => (a.scheduled_date > b.scheduled_date ? 1 : -1))
}

export async function getVisitsByClientId(clientId: string) {
  return mockVisits
    .filter((v) => v.client_id === clientId)
    .map(withRelations)
    .sort((a, b) => (a.scheduled_date > b.scheduled_date ? 1 : -1))
}

export async function getVisitsByStatus(status: string) {
  return mockVisits
    .filter((v) => v.status === status)
    .map(withRelations)
    .sort((a, b) => (a.scheduled_date > b.scheduled_date ? 1 : -1))
}

export async function getVisitById(id: string) {
  const visit = mockVisits.find((v) => v.id === id)
  return visit ? withRelations(visit) : null
}

export async function createVisit(visit: TechnicalVisitInsert) {
  const nowIso = new Date().toISOString()
  const newVisit: MockVisit = {
    id: genId("visit"),
    client_id: visit.client_id,
    ticket_id: visit.ticket_id ?? null,
    scheduled_date: visit.scheduled_date,
    scheduled_time: visit.scheduled_time,
    type: visit.type,
    status: visit.status ?? "scheduled",
    technician_name: visit.technician_name ?? null,
    notes: visit.notes ?? null,
    created_at: nowIso,
    updated_at: nowIso,
    completed_at: visit.completed_at ?? null,
  }
  mockVisits.unshift(newVisit)
  return newVisit
}

export async function updateVisit(id: string, visit: TechnicalVisitUpdate) {
  const index = mockVisits.findIndex((v) => v.id === id)
  if (index === -1) throw new Error(`Visit with id ${id} not found`)
  mockVisits[index] = {
    ...mockVisits[index],
    ...visit,
    updated_at: new Date().toISOString(),
  } as MockVisit
  return mockVisits[index]
}

export async function deleteVisit(id: string) {
  const index = mockVisits.findIndex((v) => v.id === id)
  if (index !== -1) mockVisits.splice(index, 1)
  return true
}
