import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TemplateForm } from "@/components/messages/template-form"
import { getTemplateById } from "@/lib/sample-messages-data"
import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = getTemplateById(id)

  if (!template) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Editar Plantilla" text={`Modifica la plantilla "${template.name}"`}>
        <Button variant="outline" asChild>
          <Link href="/dashboard/messages?tab=templates">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <TemplateForm template={template} />
    </DashboardShell>
  )
}
