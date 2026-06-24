import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CampaignForm } from "@/components/messages/campaign-form"
import { getCampaignById } from "@/lib/sample-messages-data"
import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const campaign = getCampaignById(id)

  if (!campaign) {
    notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Editar Campaña" text={`Modifica la campaña "${campaign.name}"`}>
        <Button variant="outline" asChild>
          <Link href="/dashboard/messages?tab=campaigns">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <CampaignForm campaign={campaign} />
    </DashboardShell>
  )
}
