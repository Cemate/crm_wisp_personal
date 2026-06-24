import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TemplateForm } from "@/components/messages/template-form"
import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"

export default function NewTemplatePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Nueva Plantilla" text="Crea una plantilla para comunicaciones automáticas">
        <Button variant="outline" asChild>
          <Link href="/dashboard/messages?tab=templates">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <TemplateForm />
    </DashboardShell>
  )
}
