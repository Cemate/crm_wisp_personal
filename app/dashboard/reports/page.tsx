import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LucideDownload, LucideFilter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Reportes" text="Visualiza y analiza los datos de tu negocio">
        <div className="flex space-x-2">
          <Button variant="outline">
            <LucideFilter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline">
            <LucideDownload className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$34,500</div>
            <p className="text-xs text-muted-foreground">+12.5% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+5 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Morosidad</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.2%</div>
            <p className="text-xs text-muted-foreground">-1.5% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets de Soporte</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">-4 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ingresos Mensuales</CardTitle>
                <CardDescription>Ingresos totales por mes durante el último año</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select defaultValue="year">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">Último año</SelectItem>
                    <SelectItem value="quarter">Último trimestre</SelectItem>
                    <SelectItem value="month">Último mes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de ingresos mensuales</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Distribución de Planes</CardTitle>
            <CardDescription>Distribución de clientes por plan contratado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de distribución de planes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">Financieros</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="support">Soporte</TabsTrigger>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Reporte Financiero</CardTitle>
                  <CardDescription>Análisis detallado de ingresos y pagos</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="from-date" className="text-xs">
                        Desde
                      </Label>
                      <Input id="from-date" type="date" className="h-8" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="to-date" className="text-xs">
                        Hasta
                      </Label>
                      <Input id="to-date" type="date" className="h-8" />
                    </div>
                  </div>
                  <Button size="sm">
                    <LucideFilter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Ingresos Totales</h4>
                    <div className="text-2xl font-bold">$34,500</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Pagos Recibidos</h4>
                    <div className="text-2xl font-bold">245</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Pagos Pendientes</h4>
                    <div className="text-2xl font-bold">23</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Valor Promedio</h4>
                    <div className="text-2xl font-bold">$140.82</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ingresos por Método de Pago</h3>
                  <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Gráfico de ingresos por método de pago</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Historial de Pagos</h3>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left text-sm font-medium">Fecha</th>
                          <th className="p-2 text-left text-sm font-medium">Cliente</th>
                          <th className="p-2 text-left text-sm font-medium">Monto</th>
                          <th className="p-2 text-left text-sm font-medium">Método</th>
                          <th className="p-2 text-left text-sm font-medium">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            date: "2025-03-15",
                            client: "Juan Pérez",
                            amount: "$500.00",
                            method: "Tarjeta",
                            status: "Completado",
                          },
                          {
                            date: "2025-03-14",
                            client: "María López",
                            amount: "$750.00",
                            method: "Transferencia",
                            status: "Completado",
                          },
                          {
                            date: "2025-03-14",
                            client: "Carlos Rodríguez",
                            amount: "$300.00",
                            method: "Efectivo",
                            status: "Completado",
                          },
                          {
                            date: "2025-03-13",
                            client: "Ana Martínez",
                            amount: "$1,000.00",
                            method: "Tarjeta",
                            status: "Completado",
                          },
                          {
                            date: "2025-03-12",
                            client: "Roberto Sánchez",
                            amount: "$500.00",
                            method: "Transferencia",
                            status: "Completado",
                          },
                        ].map((payment, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 text-sm">{payment.date}</td>
                            <td className="p-2 text-sm">{payment.client}</td>
                            <td className="p-2 text-sm">{payment.amount}</td>
                            <td className="p-2 text-sm">{payment.method}</td>
                            <td className="p-2 text-sm">{payment.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Reporte de Clientes</CardTitle>
                  <CardDescription>Análisis detallado de la cartera de clientes</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los clientes</SelectItem>
                      <SelectItem value="active">Clientes al día</SelectItem>
                      <SelectItem value="pending">Clientes por vencer</SelectItem>
                      <SelectItem value="overdue">Clientes vencidos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm">
                    <LucideFilter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Total Clientes</h4>
                    <div className="text-2xl font-bold">245</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Clientes Nuevos</h4>
                    <div className="text-2xl font-bold">12</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Clientes Inactivos</h4>
                    <div className="text-2xl font-bold">8</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tasa de Retención</h4>
                    <div className="text-2xl font-bold">96.7%</div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Distribución por Plan</h3>
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de distribución por plan</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Distribución por Estado</h3>
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de distribución por estado</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Clientes por Vencer</h3>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left text-sm font-medium">Cliente</th>
                          <th className="p-2 text-left text-sm font-medium">Plan</th>
                          <th className="p-2 text-left text-sm font-medium">Monto</th>
                          <th className="p-2 text-left text-sm font-medium">Vencimiento</th>
                          <th className="p-2 text-left text-sm font-medium">Días Restantes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            client: "Juan Pérez",
                            plan: "Fibra 50Mbps",
                            amount: "$500.00",
                            dueDate: "2025-04-15",
                            daysLeft: 5,
                          },
                          {
                            client: "María López",
                            plan: "Fibra 100Mbps",
                            amount: "$750.00",
                            dueDate: "2025-04-10",
                            daysLeft: 3,
                          },
                          {
                            client: "Carlos Rodríguez",
                            plan: "Fibra 20Mbps",
                            amount: "$300.00",
                            dueDate: "2025-04-05",
                            daysLeft: 2,
                          },
                          {
                            client: "Ana Martínez",
                            plan: "Fibra 200Mbps",
                            amount: "$1,000.00",
                            dueDate: "2025-04-20",
                            daysLeft: 10,
                          },
                          {
                            client: "Roberto Sánchez",
                            plan: "Fibra 50Mbps",
                            amount: "$500.00",
                            dueDate: "2025-04-18",
                            daysLeft: 8,
                          },
                        ].map((client, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 text-sm">{client.client}</td>
                            <td className="p-2 text-sm">{client.plan}</td>
                            <td className="p-2 text-sm">{client.amount}</td>
                            <td className="p-2 text-sm">{client.dueDate}</td>
                            <td className="p-2 text-sm">{client.daysLeft}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Reporte de Soporte</CardTitle>
                  <CardDescription>Análisis de incidencias y soporte técnico</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="support-from-date" className="text-xs">
                        Desde
                      </Label>
                      <Input id="support-from-date" type="date" className="h-8" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="support-to-date" className="text-xs">
                        Hasta
                      </Label>
                      <Input id="support-to-date" type="date" className="h-8" />
                    </div>
                  </div>
                  <Button size="sm">
                    <LucideFilter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Total Incidencias</h4>
                    <div className="text-2xl font-bold">87</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Resueltas</h4>
                    <div className="text-2xl font-bold">75</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Pendientes</h4>
                    <div className="text-2xl font-bold">12</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tiempo Promedio</h4>
                    <div className="text-2xl font-bold">4.2h</div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Incidencias por Tipo</h3>
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de incidencias por tipo</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tiempo de Resolución</h3>
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de tiempo de resolución</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Incidencias Recientes</h3>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left text-sm font-medium">Fecha</th>
                          <th className="p-2 text-left text-sm font-medium">Cliente</th>
                          <th className="p-2 text-left text-sm font-medium">Tipo</th>
                          <th className="p-2 text-left text-sm font-medium">Descripción</th>
                          <th className="p-2 text-left text-sm font-medium">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            date: "2025-03-15",
                            client: "Juan Pérez",
                            type: "Conexión",
                            description: "Intermitencia en la señal",
                            status: "Resuelto",
                          },
                          {
                            date: "2025-03-14",
                            client: "María López",
                            type: "Hardware",
                            description: "Router defectuoso",
                            status: "Pendiente",
                          },
                          {
                            date: "2025-03-13",
                            client: "Carlos Rodríguez",
                            type: "Velocidad",
                            description: "Velocidad por debajo de lo contratado",
                            status: "Resuelto",
                          },
                          {
                            date: "2025-03-12",
                            client: "Ana Martínez",
                            type: "Configuración",
                            description: "Problema con la red WiFi",
                            status: "Resuelto",
                          },
                          {
                            date: "2025-03-11",
                            client: "Roberto Sánchez",
                            type: "Conexión",
                            description: "Sin servicio",
                            status: "Pendiente",
                          },
                        ].map((incident, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 text-sm">{incident.date}</td>
                            <td className="p-2 text-sm">{incident.client}</td>
                            <td className="p-2 text-sm">{incident.type}</td>
                            <td className="p-2 text-sm">{incident.description}</td>
                            <td className="p-2 text-sm">{incident.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Reporte de Mensajes</CardTitle>
                  <CardDescription>Análisis de comunicaciones con clientes</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los mensajes</SelectItem>
                      <SelectItem value="payment">Recordatorios de pago</SelectItem>
                      <SelectItem value="support">Soporte técnico</SelectItem>
                      <SelectItem value="info">Información</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm">
                    <LucideFilter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Total Mensajes</h4>
                    <div className="text-2xl font-bold">1,245</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tasa de Respuesta</h4>
                    <div className="text-2xl font-bold">92.3%</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tiempo Promedio</h4>
                    <div className="text-2xl font-bold">2.5min</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Satisfacción</h4>
                    <div className="text-2xl font-bold">4.8/5</div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Mensajes por Tipo</h3>
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de mensajes por tipo</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Actividad por Hora</h3>
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Gráfico de actividad por hora</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Mensajes Recientes</h3>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left text-sm font-medium">Fecha</th>
                          <th className="p-2 text-left text-sm font-medium">Cliente</th>
                          <th className="p-2 text-left text-sm font-medium">Tipo</th>
                          <th className="p-2 text-left text-sm font-medium">Contenido</th>
                          <th className="p-2 text-left text-sm font-medium">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            date: "2025-03-15",
                            client: "Juan Pérez",
                            type: "Recordatorio",
                            content: "Recordatorio de pago próximo",
                            status: "Enviado",
                          },
                          {
                            date: "2025-03-14",
                            client: "María López",
                            type: "Confirmación",
                            content: "Confirmación de pago recibido",
                            status: "Enviado",
                          },
                          {
                            date: "2025-03-13",
                            client: "Carlos Rodríguez",
                            type: "Soporte",
                            content: "Respuesta a consulta técnica",
                            status: "Enviado",
                          },
                          {
                            date: "2025-03-12",
                            client: "Ana Martínez",
                            type: "Información",
                            content: "Información sobre nuevo plan",
                            status: "Enviado",
                          },
                          {
                            date: "2025-03-11",
                            client: "Roberto Sánchez",
                            type: "Recordatorio",
                            content: "Recordatorio de pago vencido",
                            status: "Enviado",
                          },
                        ].map((message, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 text-sm">{message.date}</td>
                            <td className="p-2 text-sm">{message.client}</td>
                            <td className="p-2 text-sm">{message.type}</td>
                            <td className="p-2 text-sm">{message.content}</td>
                            <td className="p-2 text-sm">{message.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

