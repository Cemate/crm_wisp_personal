import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCampaignById } from "@/lib/sample-messages-data"
import Link from "next/link"
import { LucideArrowLeft, LucidePencil, LucideUsers, LucideCalendar } from "lucide-react"
import { notFound } from "next/navigation"

export default async function ViewCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const campaign = getCampaignById(id)

  if (!campaign) {
    notFound()
  }

  const statusVariant =
    campaign.status === "Completada" ? "default" : campaign.status === "Programada" ? "outline" : "secondary"

  return (
    <DashboardShell>
      <DashboardHeader heading={campaign.name} text="Detalle de la campaña de mensajes">
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/messages?tab=campaigns">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/messages/campaigns/${campaign.id}/edit`}>
              <LucidePencil className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="rounded-full bg-muted p-2">
              <LucideUsers className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Destinatarios</p>
              <p className="text-xl font-bold">{campaign.recipients}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="rounded-full bg-muted p-2">
              <LucideCalendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fecha de Envío</p>
              <p className="text-xl font-bold">{campaign.date}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <Badge variant={statusVariant} className="mt-1">
                {campaign.status}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Tipo</p>
              <p className="font-medium">{campaign.type}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mensaje de la Campaña</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {campaign.template && (
            <div>
              <p className="text-sm text-muted-foreground">Plantilla Base</p>
              <p className="font-medium">{campaign.template}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Contenido</p>
            <div className="rounded-md border bg-muted/50 p-4 text-sm whitespace-pre-wrap">{campaign.message}</div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
