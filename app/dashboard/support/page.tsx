import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LucidePlus, LucideCalendarPlus } from "lucide-react"
import { SupportTicketsTable } from "@/components/support-tickets-table"
import { VisitsTable } from "@/components/visits-table"
import { getTickets } from "@/lib/services/support-service"
import { getVisits } from "@/lib/services/visit-service"

export default async function SupportPage() {
  const tickets = await getTickets()
  const visits = await getVisits()

  const ticketStats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  }

  const visitStats = {
    total: visits.length,
    scheduled: visits.filter((v) => v.status === "scheduled").length,
    inProgress: visits.filter((v) => v.status === "in_progress").length,
    completed: visits.filter((v) => v.status === "completed").length,
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Soporte Técnico" text="Gestiona incidencias y visitas técnicas">
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/support/new">
              <LucidePlus className="mr-2 h-4 w-4" />
              Reportar Incidencia
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

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Incidencias</TabsTrigger>
          <TabsTrigger value="visits">Visitas Programadas</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Incidencias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.open}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.inProgress}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resueltas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ticketStats.resolved}</div>
              </CardContent>
            </Card>
          </div>

          <Suspense fallback={<div>Cargando incidencias...</div>}>
            <SupportTicketsTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="visits" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{visitStats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Programadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{visitStats.scheduled}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{visitStats.inProgress}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{visitStats.completed}</div>
              </CardContent>
            </Card>
          </div>

          <Suspense fallback={<div>Cargando visitas...</div>}>
            <VisitsTable />
          </Suspense>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
