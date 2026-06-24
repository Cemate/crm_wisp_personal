import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MessageForm } from "@/components/messages/message-form"
import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"

export default function NewMessagePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Nuevo Mensaje" text="Envía un mensaje directo a un cliente">
        <Button variant="outline" asChild>
          <Link href="/dashboard/messages">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <MessageForm />
    </DashboardShell>
  )
}
