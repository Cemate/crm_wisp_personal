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
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export default async function SupportPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

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
                <div className="text-2xl font-bold">
                  <Suspense fallback={<div>Cargando...</div>}>
                    <TicketCount supabase={supabase} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Suspense fallback={<div>Cargando...</div>}>
                    <TicketCountByStatus supabase={supabase} status="pending" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Suspense fallback={<div>Cargando...</div>}>
                    <TicketCountByStatus supabase={supabase} status="in_progress" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resueltas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Suspense fallback={<div>Cargando...</div>}>
                    <TicketCountByStatus supabase={supabase} status="resolved" />
                  </Suspense>
                </div>
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
                <div className="text-2xl font-bold">
                  <Suspense fallback={<div>Cargando...</div>}>
                    <VisitCount supabase={supabase} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Programadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Suspense fallback={<div>Cargando...</div>}>
                    <VisitCountByStatus supabase={supabase} status="scheduled" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Suspense fallback={<div>Cargando...</div>}>
                    <VisitCountByStatus supabase={supabase} status="in_progress" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Suspense fallback={<div>Cargando...</div>}>
                    <VisitCountByStatus supabase={supabase} status="completed" />
                  </Suspense>
                </div>
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

async function TicketCount({ supabase }: { supabase: any }) {
  const { count } = await supabase.from("support_tickets").select("*", { count: "exact", head: true })

  return count || 0
}

async function TicketCountByStatus({ supabase, status }: { supabase: any; status: string }) {
  const { count } = await supabase
    .from("support_tickets")
    .select("*", { count: "exact", head: true })
    .eq("status", status)

  return count || 0
}

async function VisitCount({ supabase }: { supabase: any }) {
  const { count } = await supabase.from("technical_visits").select("*", { count: "exact", head: true })

  return count || 0
}

async function VisitCountByStatus({ supabase, status }: { supabase: any; status: string }) {
  const { count } = await supabase
    .from("technical_visits")
    .select("*", { count: "exact", head: true })
    .eq("status", status)

  return count || 0
}
