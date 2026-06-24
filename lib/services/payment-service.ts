import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/types/supabase"

export type Payment = Database["public"]["Tables"]["payments"]["Row"]
export type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"]
export type PaymentUpdate = Database["public"]["Tables"]["payments"]["Update"]

export async function getPayments() {
  const { data, error } = await supabase
    .from("payments")
    .select("*, clients(*)")
    .order("payment_date", { ascending: false })

  if (error) {
    console.error("Error fetching payments:", error)
    throw error
  }

  return data
}

export async function getPaymentsByClientId(clientId: string) {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("client_id", clientId)
    .order("payment_date", { ascending: false })

  if (error) {
    console.error(`Error fetching payments for client ${clientId}:`, error)
    throw error
  }

  return data
}

export async function getPaymentsByStatus(status: string) {
  const { data, error } = await supabase
    .from("payments")
    .select("*, clients(*)")
    .eq("status", status)
    .order("payment_date", { ascending: false })

  if (error) {
    console.error(`Error fetching payments with status ${status}:`, error)
    throw error
  }

  return data
}

export async function getPaymentById(id: string) {
  const { data, error } = await supabase.from("payments").select("*, clients(*)").eq("id", id).single()

  if (error) {
    console.error(`Error fetching payment with id ${id}:`, error)
    throw error
  }

  return data
}

export async function createPayment(payment: PaymentInsert) {
  const { data, error } = await supabase.from("payments").insert(payment).select().single()

  if (error) {
    console.error("Error creating payment:", error)
    throw error
  }

  return data
}

export async function updatePayment(id: string, payment: PaymentUpdate) {
  const { data, error } = await supabase
    .from("payments")
    .update({ ...payment, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating payment with id ${id}:`, error)
    throw error
  }

  return data
}

export async function deletePayment(id: string) {
  const { error } = await supabase.from("payments").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting payment with id ${id}:`, error)
    throw error
  }

  return true
}

