import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentsTable } from "@/components/payments-table"
import {
  LucideSearch,
  LucideFilter,
  LucidePlus,
  LucideDownload,
  LucideWallet,
  LucideCalendar,
  LucideArrowUpRight,
  LucideArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createServerClient } from "@/lib/supabase/server"
import { getPayments, getPaymentsByStatus } from "@/lib/services/payment-service"

export const revalidate = 0

export default async function PaymentsPage() {
  const supabase = createServerClient()

  // Obtener estadísticas de pagos
  const { data: paymentsStats } = await supabase.from("payments").select("status, amount", { count: "exact" })

  const totalPayments = paymentsStats?.length || 0
  const totalAmount = paymentsStats?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0
  const averageAmount = totalPayments > 0 ? totalAmount / totalPayments : 0

  const { data: pendingPayments } = await supabase
    .from("payments")
    .select("*", { count: "exact" })
    .eq("status", "pending")

  const pendingCount = pendingPayments?.length || 0

  // Obtener todos los pagos
  const allPayments = await getPayments()

  // Obtener pagos por estado
  const completedPayments = await getPaymentsByStatus("completed")
  const pendingPaymentsList = await getPaymentsByStatus("pending")
  const failedPayments = await getPaymentsByStatus("failed")

  return (
    <DashboardShell>
      <DashboardHeader heading="Pagos" text="Gestiona los pagos de tus clientes">
        <Button asChild>
          <Link href="/dashboard/payments/new">
            <LucidePlus className="mr-2 h-4 w-4" />
            Registrar Pago
          </Link>
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <LucideWallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total de ingresos registrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Recibidos</CardTitle>
            <LucideArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPayments}</div>
            <p className="text-xs text-muted-foreground">Total de pagos registrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
            <LucideCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Pagos por confirmar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monto Promedio</CardTitle>
            <LucideArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Por pago</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="failed">Fallidos</TabsTrigger>
          </TabsList>

          <div className="flex w-full sm:w-auto items-center space-x-2">
            <Input placeholder="Buscar pago..." className="w-full sm:w-[300px]" />
            <Button type="submit" size="sm" className="shrink-0">
              <LucideSearch className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap w-full sm:w-auto gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los métodos</SelectItem>
                <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                <SelectItem value="Transferencia">Transferencia</SelectItem>
                <SelectItem value="Efectivo">Efectivo</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por fecha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las fechas</SelectItem>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <LucideFilter className="mr-2 h-4 w-4" />
              Más Filtros
            </Button>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm">
              <LucideDownload className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <PaymentsTable payments={allPayments} />
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Completados</CardTitle>
              <CardDescription>Pagos procesados correctamente</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentsTable payments={completedPayments} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Pendientes</CardTitle>
              <CardDescription>Pagos en proceso o por confirmar</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentsTable payments={pendingPaymentsList} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Fallidos</CardTitle>
              <CardDescription>Pagos que no pudieron ser procesados</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentsTable payments={failedPayments} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

