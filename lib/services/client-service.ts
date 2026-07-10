import type { Database } from "@/types/supabase"
import { mockClients, withPlan, findClient, genId, type MockClient } from "@/lib/mock-data"

export type Client = Database["public"]["Tables"]["clients"]["Row"]
export type ClientInsert = Database["public"]["Tables"]["clients"]["Insert"]
export type ClientUpdate = Database["public"]["Tables"]["clients"]["Update"]

export async function getClients() {
  return mockClients
    .map(withPlan)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export async function getClientById(id: string) {
  return findClient(id)
}

export async function getClientsByStatus(status: string) {
  return mockClients
    .filter((c) => c.status === status)
    .map(withPlan)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export async function createClient(client: ClientInsert) {
  const nowIso = new Date().toISOString()
  const newClient: MockClient = {
    id: genId("client"),
    name: client.name,
    email: client.email ?? null,
    phone: client.phone,
    address: client.address ?? null,
    city: client.city ?? null,
    state: client.state ?? null,
    postal_code: client.postal_code ?? null,
    id_number: client.id_number ?? null,
    plan_id: client.plan_id ?? null,
    installation_date: client.installation_date ?? null,
    payment_day: client.payment_day ?? null,
    payment_method: client.payment_method ?? null,
    status: client.status ?? "active",
    notes: client.notes ?? null,
    coordinates: client.coordinates ?? null,
    additional_services: (client as any).additional_services ?? [],
    created_at: nowIso,
    updated_at: nowIso,
  }
  mockClients.unshift(newClient)
  return withPlan(newClient)
}

export async function updateClient(id: string, client: ClientUpdate) {
  const index = mockClients.findIndex((c) => c.id === id)
  if (index === -1) throw new Error(`Client with id ${id} not found`)
  mockClients[index] = {
    ...mockClients[index],
    ...client,
    updated_at: new Date().toISOString(),
  } as MockClient
  return withPlan(mockClients[index])
}

export async function deleteClient(id: string) {
  const index = mockClients.findIndex((c) => c.id === id)
  if (index !== -1) mockClients.splice(index, 1)
  return true
}
