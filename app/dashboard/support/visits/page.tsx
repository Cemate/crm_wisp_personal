import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import Link from "next/link"
import { LucideArrowLeft, LucideCalendarPlus } from "lucide-react"
import { VisitsTable } from "@/components/visits-table"

export default function VisitsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Visitas Técnicas" text="Gestiona las visitas técnicas programadas">
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/support">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/support/schedule">
              <LucideCalendarPlus className="mr-2 h-4 w-4" />
              Programar Visita
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <Suspense fallback={<div>Cargando visitas...</div>}>
        <VisitsTable />
      </Suspense>
    </DashboardShell>
  )
}

