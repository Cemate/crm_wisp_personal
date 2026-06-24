import { NextResponse } from "next/server"

// Simulated database of payments
const payments = [
  {
    id: "1",
    clientId: "1",
    amount: 500,
    date: "2025-03-15",
    method: "Tarjeta",
    status: "completed",
    reference: "REF123456",
  },
  {
    id: "2",
    clientId: "2",
    amount: 750,
    date: "2025-03-10",
    method: "Transferencia",
    status: "completed",
    reference: "REF123457",
  },
  // More payments would be here
]

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get("clientId")

  // Filter payments if clientId is provided
  const filteredPayments = clientId ? payments.filter((payment) => payment.clientId === clientId) : payments

  return NextResponse.json(filteredPayments)
}

export async function POST(request: Request) {
  try {
    const paymentData = await request.json()

    // Validate required fields
    if (!paymentData.clientId || !paymentData.amount || !paymentData.method) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new payment
    const newPayment = {
      id: `${payments.length + 1}`,
      ...paymentData,
      date: paymentData.date || new Date().toISOString().split("T")[0],
      status: "completed",
      reference: `REF${Math.floor(Math.random() * 1000000)}`,
    }

    // In a real app, we would save to database here
    payments.push(newPayment)

    // Send notification if requested
    if (paymentData.sendNotification) {
      // This would call the WhatsApp API to send a notification
      console.log(`Notification sent to client ${paymentData.clientId}`)
    }

    return NextResponse.json(newPayment)
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Error processing payment" }, { status: 500 })
  }
}

