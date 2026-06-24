import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/types/supabase"

export type SupportTicket = Database["public"]["Tables"]["support_tickets"]["Row"]
export type SupportTicketInsert = Database["public"]["Tables"]["support_tickets"]["Insert"]
export type SupportTicketUpdate = Database["public"]["Tables"]["support_tickets"]["Update"]

export async function getTickets() {
  const { data, error } = await supabase
    .from("support_tickets")
    .select("*, clients(*)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tickets:", error)
    throw error
  }

  return data
}

export async function getTicketsByClientId(clientId: string) {
  const { data, error } = await supabase
    .from("support_tickets")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching tickets for client ${clientId}:`, error)
    throw error
  }

  return data
}

export async function getTicketsByStatus(status: string) {
  const { data, error } = await supabase
    .from("support_tickets")
    .select("*, clients(*)")
    .eq("status", status)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching tickets with status ${status}:`, error)
    throw error
  }

  return data
}

export async function getTicketById(id: string) {
  const { data, error } = await supabase.from("support_tickets").select("*, clients(*)").eq("id", id).single()

  if (error) {
    console.error(`Error fetching ticket with id ${id}:`, error)
    throw error
  }

  return data
}

export async function createTicket(ticket: SupportTicketInsert) {
  const { data, error } = await supabase.from("support_tickets").insert(ticket).select().single()

  if (error) {
    console.error("Error creating ticket:", error)
    throw error
  }

  return data
}

export async function updateTicket(id: string, ticket: SupportTicketUpdate) {
  const { data, error } = await supabase
    .from("support_tickets")
    .update({ ...ticket, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating ticket with id ${id}:`, error)
    throw error
  }

  return data
}

export async function deleteTicket(id: string) {
  const { error } = await supabase.from("support_tickets").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting ticket with id ${id}:`, error)
    throw error
  }

  return true
}
