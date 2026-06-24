import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/types/supabase"

export type Client = Database["public"]["Tables"]["clients"]["Row"]
export type ClientInsert = Database["public"]["Tables"]["clients"]["Insert"]
export type ClientUpdate = Database["public"]["Tables"]["clients"]["Update"]

export async function getClients() {
  const { data, error } = await supabase.from("clients").select("*, plans(*)").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching clients:", error)
    throw error
  }

  return data
}

export async function getClientById(id: string) {
  const { data, error } = await supabase.from("clients").select("*, plans(*)").eq("id", id).single()

  if (error) {
    console.error(`Error fetching client with id ${id}:`, error)
    throw error
  }

  return data
}

export async function getClientsByStatus(status: string) {
  const { data, error } = await supabase
    .from("clients")
    .select("*, plans(*)")
    .eq("status", status)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching clients with status ${status}:`, error)
    throw error
  }

  return data
}

export async function createClient(client: ClientInsert) {
  const { data, error } = await supabase.from("clients").insert(client).select().single()

  if (error) {
    console.error("Error creating client:", error)
    throw error
  }

  return data
}

export async function updateClient(id: string, client: ClientUpdate) {
  const { data, error } = await supabase
    .from("clients")
    .update({ ...client, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating client with id ${id}:`, error)
    throw error
  }

  return data
}

export async function deleteClient(id: string) {
  const { error } = await supabase.from("clients").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting client with id ${id}:`, error)
    throw error
  }

  return true
}
