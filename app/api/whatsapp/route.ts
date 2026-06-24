import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Simulated database of clients
const clients = [
  {
    id: "1",
    name: "Juan Pérez",
    phone: "+1234567890",
    email: "juan@example.com",
    plan: "Fibra 50Mbps",
    amount: 500,
    nextPayment: "2025-04-15",
    status: "active",
  },
  {
    id: "2",
    name: "María López",
    phone: "+1234567891",
    email: "maria@example.com",
    plan: "Fibra 100Mbps",
    amount: 750,
    nextPayment: "2025-04-10",
    status: "active",
  },
  // More clients would be here
]

export async function POST(request: Request) {
  try {
    const { message, phone } = await request.json()

    // Find client by phone number
    const client = clients.find((c) => c.phone === phone)

    // Context for the AI
    let context = "Eres un asistente virtual para un proveedor de servicios de internet (ISP)."

    if (client) {
      context += `
        Información del cliente:
        - Nombre: ${client.name}
        - Plan: ${client.plan}
        - Monto mensual: $${client.amount}
        - Próximo pago: ${client.nextPayment}
        - Estado: ${client.status === "active" ? "Al día" : "Con pagos pendientes"}
      `
    } else {
      context += " El usuario no está identificado en nuestro sistema."
    }

    // Generate AI response
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: context,
      prompt: message,
    })

    // Process the response to identify actions
    const response = {
      message: text,
      actions: processActionsFromResponse(text, client),
      clientInfo: client || null,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error processing WhatsApp message:", error)
    return NextResponse.json({ error: "Error processing message" }, { status: 500 })
  }
}

// Helper function to identify actions in the AI response
function processActionsFromResponse(text: string, client: any) {
  const actions = []

  // Check for payment intent
  if (text.toLowerCase().includes("pagar") || text.toLowerCase().includes("payment")) {
    actions.push({
      type: "payment",
      data: {
        amount: client?.amount || 0,
        clientId: client?.id,
      },
    })
  }

  // Check for support request
  if (
    text.toLowerCase().includes("soporte") ||
    text.toLowerCase().includes("ayuda") ||
    text.toLowerCase().includes("problema") ||
    text.toLowerCase().includes("support")
  ) {
    actions.push({
      type: "support",
      data: {
        clientId: client?.id,
      },
    })
  }

  return actions
}
