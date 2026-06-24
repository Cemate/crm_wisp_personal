import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/types/supabase"

export type TechnicalVisit = Database["public"]["Tables"]["technical_visits"]["Row"]
export type TechnicalVisitInsert = Database["public"]["Tables"]["technical_visits"]["Insert"]
export type TechnicalVisitUpdate = Database["public"]["Tables"]["technical_visits"]["Update"]

export async function getVisits() {
  const { data, error } = await supabase
    .from("technical_visits")
    .select("*, clients(*), support_tickets(*)")
    .order("scheduled_date", { ascending: true })

  if (error) {
    console.error("Error fetching visits:", error)
    throw error
  }

  return data
}

export async function getVisitsByClientId(clientId: string) {
  const { data, error } = await supabase
    .from("technical_visits")
    .select("*, support_tickets(*)")
    .eq("client_id", clientId)
    .order("scheduled_date", { ascending: true })

  if (error) {
    console.error(`Error fetching visits for client ${clientId}:`, error)
    throw error
  }

  return data
}

export async function getVisitsByStatus(status: string) {
  const { data, error } = await supabase
    .from("technical_visits")
    .select("*, clients(*), support_tickets(*)")
    .eq("status", status)
    .order("scheduled_date", { ascending: true })

  if (error) {
    console.error(`Error fetching visits with status ${status}:`, error)
    throw error
  }

  return data
}

export async function getVisitById(id: string) {
  const { data, error } = await supabase
    .from("technical_visits")
    .select("*, clients(*), support_tickets(*)")
    .eq("id", id)
    .single()

  if (error) {
    console.error(`Error fetching visit with id ${id}:`, error)
    throw error
  }

  return data
}

export async function createVisit(visit: TechnicalVisitInsert) {
  const { data, error } = await supabase.from("technical_visits").insert(visit).select().single()

  if (error) {
    console.error("Error creating visit:", error)
    throw error
  }

  return data
}

export async function updateVisit(id: string, visit: TechnicalVisitUpdate) {
  const { data, error } = await supabase
    .from("technical_visits")
    .update({ ...visit, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating visit with id ${id}:`, error)
    throw error
  }

  return data
}

export async function deleteVisit(id: string) {
  const { error } = await supabase.from("technical_visits").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting visit with id ${id}:`, error)
    throw error
  }

  return true
}
