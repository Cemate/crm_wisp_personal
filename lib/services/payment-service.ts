import type { Database } from "@/types/supabase"
import { mockPayments, findClient, genId, type MockPayment } from "@/lib/mock-data"

export type Payment = Database["public"]["Tables"]["payments"]["Row"]
export type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"]
export type PaymentUpdate = Database["public"]["Tables"]["payments"]["Update"]

function withClient(payment: MockPayment): MockPayment {
  return { ...payment, clients: findClient(payment.client_id) }
}

export async function getPayments() {
  return mockPayments
    .map(withClient)
    .sort((a, b) => (a.payment_date < b.payment_date ? 1 : -1))
}

export async function getPaymentsByClientId(clientId: string) {
  return mockPayments
    .filter((p) => p.client_id === clientId)
    .sort((a, b) => (a.payment_date < b.payment_date ? 1 : -1))
}

export async function getPaymentsByStatus(status: string) {
  return mockPayments
    .filter((p) => p.status === status)
    .map(withClient)
    .sort((a, b) => (a.payment_date < b.payment_date ? 1 : -1))
}

export async function getPaymentById(id: string) {
  const payment = mockPayments.find((p) => p.id === id)
  return payment ? withClient(payment) : null
}

export async function createPayment(payment: PaymentInsert) {
  const nowIso = new Date().toISOString()
  const newPayment: MockPayment = {
    id: genId("payment"),
    client_id: payment.client_id,
    amount: payment.amount,
    payment_date: payment.payment_date,
    due_date: payment.due_date,
    method: payment.method,
    reference: payment.reference ?? null,
    status: payment.status ?? "paid",
    period_start: payment.period_start ?? null,
    period_end: payment.period_end ?? null,
    notes: payment.notes ?? null,
    created_at: nowIso,
    updated_at: nowIso,
  }
  mockPayments.unshift(newPayment)
  return newPayment
}

export async function updatePayment(id: string, payment: PaymentUpdate) {
  const index = mockPayments.findIndex((p) => p.id === id)
  if (index === -1) throw new Error(`Payment with id ${id} not found`)
  mockPayments[index] = {
    ...mockPayments[index],
    ...payment,
    updated_at: new Date().toISOString(),
  } as MockPayment
  return mockPayments[index]
}

export async function deletePayment(id: string) {
  const index = mockPayments.findIndex((p) => p.id === id)
  if (index !== -1) mockPayments.splice(index, 1)
  return true
}
