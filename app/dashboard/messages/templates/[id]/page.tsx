import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTemplateById } from "@/lib/sample-messages-data"
import Link from "next/link"
import { LucideArrowLeft, LucidePencil } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ViewTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = getTemplateById(id)

  if (!template) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={template.name} text="Detalle de la plantilla de mensaje">
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/messages?tab=templates">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/messages/templates/${template.id}/edit`}>
              <LucidePencil className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Información</CardTitle>
            <Badge variant={template.status === "Activo" ? "default" : "outline"}>{template.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Nombre</p>
              <p className="font-medium">{template.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo</p>
              <p className="font-medium">{template.type}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Contenido del Mensaje</p>
            <div className="rounded-md border bg-muted/50 p-4 text-sm whitespace-pre-wrap">{template.content}</div>
          </div>
          <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
            Las variables entre corchetes como [nombre], [monto] o [fecha] se reemplazan automáticamente al enviar el
            mensaje.
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
