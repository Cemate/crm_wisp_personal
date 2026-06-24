import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CampaignForm } from "@/components/messages/campaign-form"
import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"

export default function NewCampaignPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Nueva Campaña" text="Crea una campaña de comunicación masiva">
        <Button variant="outline" asChild>
          <Link href="/dashboard/messages?tab=campaigns">
            <LucideArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </DashboardHeader>
      <CampaignForm />
    </DashboardShell>
  )
}
