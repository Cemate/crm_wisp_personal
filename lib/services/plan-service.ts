import type { Database } from "@/types/supabase"
import { mockPlans, genId, type MockPlan } from "@/lib/mock-data"

export type Plan = Database["public"]["Tables"]["plans"]["Row"]
export type PlanInsert = Database["public"]["Tables"]["plans"]["Insert"]
export type PlanUpdate = Database["public"]["Tables"]["plans"]["Update"]

export async function getPlans() {
  return [...mockPlans].sort((a, b) => a.price - b.price)
}

export async function getActivePlans() {
  return mockPlans.filter((p) => p.is_active).sort((a, b) => a.price - b.price)
}

export async function getPlanById(id: string) {
  return mockPlans.find((p) => p.id === id) ?? null
}

export async function createPlan(plan: PlanInsert) {
  const nowIso = new Date().toISOString()
  const newPlan: MockPlan = {
    id: genId("plan"),
    name: plan.name,
    speed: plan.speed,
    price: plan.price,
    description: plan.description ?? null,
    is_active: plan.is_active ?? true,
    created_at: nowIso,
    updated_at: nowIso,
  }
  mockPlans.push(newPlan)
  return newPlan
}

export async function updatePlan(id: string, plan: PlanUpdate) {
  const index = mockPlans.findIndex((p) => p.id === id)
  if (index === -1) throw new Error(`Plan with id ${id} not found`)
  mockPlans[index] = {
    ...mockPlans[index],
    ...plan,
    updated_at: new Date().toISOString(),
  } as MockPlan
  return mockPlans[index]
}

export async function deletePlan(id: string) {
  const index = mockPlans.findIndex((p) => p.id === id)
  if (index !== -1) mockPlans.splice(index, 1)
  return true
}
