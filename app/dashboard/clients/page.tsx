import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ClientsTable } from "@/components/clients-table"
import Link from "next/link"
import { LucidePlus } from "lucide-react"

export default function ClientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Clientes" text="Gestiona la información de tus clientes">
        <Button asChild>
          <Link href="/dashboard/clients/new">
            <LucidePlus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Link>
        </Button>
      </DashboardHeader>
      <Suspense fallback={<div>Cargando clientes...</div>}>
        <ClientsTable />
      </Suspense>
    </DashboardShell>
  )
}

