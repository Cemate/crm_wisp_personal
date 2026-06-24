import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/types/supabase"

export type Plan = Database["public"]["Tables"]["plans"]["Row"]
export type PlanInsert = Database["public"]["Tables"]["plans"]["Insert"]
export type PlanUpdate = Database["public"]["Tables"]["plans"]["Update"]

export async function getPlans() {
  const { data, error } = await supabase.from("plans").select("*").order("price", { ascending: true })

  if (error) {
    console.error("Error fetching plans:", error)
    throw error
  }

  return data
}

export async function getActivePlans() {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .eq("is_active", true)
    .order("price", { ascending: true })

  if (error) {
    console.error("Error fetching active plans:", error)
    throw error
  }

  return data
}

export async function getPlanById(id: string) {
  const { data, error } = await supabase.from("plans").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching plan with id ${id}:`, error)
    throw error
  }

  return data
}

export async function createPlan(plan: PlanInsert) {
  const { data, error } = await supabase.from("plans").insert(plan).select().single()

  if (error) {
    console.error("Error creating plan:", error)
    throw error
  }

  return data
}

export async function updatePlan(id: string, plan: PlanUpdate) {
  const { data, error } = await supabase
    .from("plans")
    .update({ ...plan, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating plan with id ${id}:`, error)
    throw error
  }

  return data
}

export async function deletePlan(id: string) {
  const { error } = await supabase.from("plans").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting plan with id ${id}:`, error)
    throw error
  }

  return true
}

