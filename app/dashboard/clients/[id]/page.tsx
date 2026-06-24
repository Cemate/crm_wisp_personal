import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  LucideArrowLeft,
  LucideEdit,
  LucideMessageSquare,
  LucideWallet,
  LucideWifi,
  LucideCalendar,
  LucideMapPin,
  LucidePhone,
  LucideMail,
  LucideDownload,
  LucideAlertCircle,
} from "lucide-react"

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  // En una aplicación real, obtendríamos los datos del cliente desde una API o base de datos
  const client = {
    id: params.id,
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "+1234567890",
    address: "Calle Principal 123, Colonia Centro",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "12345",
    plan: "Fibra 50Mbps",
    status: "active",
    amount: "$500.00",
    nextPayment: "2025-04-15",
    installationDate: "2024-01-10",
    paymentDay: "15",
    paymentMethod: "Tarjeta",
    notes: "Cliente desde enero 2024. Instalación sin problemas.",
    coordinates: { lat: 19.432608, lng: -99.133209 },
  }

  // Historial de pagos simulado
  const paymentHistory = [
    { id: "1", date: "2025-03-15", amount: "$500.00", status: "completed", method: "Tarjeta" },
    { id: "2", date: "2025-02-15", amount: "$500.00", status: "completed", method: "Tarjeta" },
    { id: "3", date: "2025-01-15", amount: "$500.00", status: "completed", method: "Transferencia" },
    { id: "4", date: "2024-12-15", amount: "$450.00", status: "completed", method: "Efectivo" },
    { id: "5", date: "2024-11-15", amount: "$450.00", status: "completed", method: "Tarjeta" },
  ]

  // Historial de soporte simulado
  const supportHistory = [
    {
      id: "1",
      date: "2025-02-20",
      type: "Incidencia",
      status: "Resuelto",
      description: "Intermitencia en la conexión",
    },
    { id: "2", date: "2025-01-05", type: "Visita Técnica", status: "Completado", description: "Cambio de router" },
    {
      id: "3",
      date: "2024-11-10",
      type: "Consulta",
      status: "Resuelto",
      description: "Información sobre cambio de plan",
    },
  ]

  // Historial de mensajes simulado
  const messageHistory = [
    { id: "1", date: "2025-03-10", type: "Recordatorio", status: "Enviado", content: "Recordatorio de pago próximo" },
    { id: "2", date: "2025-02-15", type: "Confirmación", status: "Enviado", content: "Confirmación de pago recibido" },
    { id: "3", date: "2025-01-20", type: "Soporte", status: "Recibido", content: "Consulta sobre intermitencia" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading={client.name} text={`Cliente #${client.id}`}>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/clients">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <LucideMessageSquare className="mr-2 h-4 w-4" />
            Enviar Mensaje
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href={`/dashboard/clients/${client.id}/edit`}>
              <LucideEdit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
            <CardDescription>Detalles completos del cliente y su servicio</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="payments">Pagos</TabsTrigger>
                <TabsTrigger value="support">Soporte</TabsTrigger>
                <TabsTrigger value="messages">Mensajes</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Información Personal</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <LucidePhone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Teléfono:</span>
                        <span className="text-sm">{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LucideMail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Email:</span>
                        <span className="text-sm">{client.email}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <LucideMapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm font-medium">Dirección:</span>
                        <span className="text-sm">
                          {client.address}, {client.city}, {client.state}, CP {client.postalCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detalles del Servicio</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <LucideWifi className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Plan:</span>
                        <span className="text-sm">{client.plan}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LucideWallet className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Monto Mensual:</span>
                        <span className="text-sm">{client.amount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LucideCalendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Instalación:</span>
                        <span className="text-sm">{client.installationDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LucideCalendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Día de Pago:</span>
                        <span className="text-sm">{client.paymentDay} de cada mes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LucideWallet className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Método de Pago:</span>
                        <span className="text-sm">{client.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notas</h3>
                  <p className="text-sm">{client.notes}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ubicación</h3>
                  <div className="h-[200px] rounded-md bg-gray-100 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Mapa de ubicación</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Historial de Pagos</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <LucideDownload className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/payments/new?clientId=${client.id}`}>Registrar Pago</Link>
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left text-sm font-medium">Fecha</th>
                        <th className="p-2 text-left text-sm font-medium">Monto</th>
                        <th className="p-2 text-left text-sm font-medium">Método</th>
                        <th className="p-2 text-left text-sm font-medium">Estado</th>
                        <th className="p-2 text-right text-sm font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="p-2 text-sm">{payment.date}</td>
                          <td className="p-2 text-sm">{payment.amount}</td>
                          <td className="p-2 text-sm">{payment.method}</td>
                          <td className="p-2 text-sm">
                            <Badge variant="default">
                              {payment.status === "completed" ? "Completado" : "Pendiente"}
                            </Badge>
                          </td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">
                              <LucideDownload className="h-4 w-4" />
                              <span className="sr-only">Descargar</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Próximo Pago</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Fecha de vencimiento</p>
                        <p className="text-lg font-bold">{client.nextPayment}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Monto</p>
                        <p className="text-lg font-bold">{client.amount}</p>
                      </div>
                      <div>
                        <Button>Registrar Pago</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="support" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Historial de Soporte</h3>
                  <Button size="sm">Nueva Incidencia</Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left text-sm font-medium">Fecha</th>
                        <th className="p-2 text-left text-sm font-medium">Tipo</th>
                        <th className="p-2 text-left text-sm font-medium">Descripción</th>
                        <th className="p-2 text-left text-sm font-medium">Estado</th>
                        <th className="p-2 text-right text-sm font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportHistory.map((ticket) => (
                        <tr key={ticket.id} className="border-b">
                          <td className="p-2 text-sm">{ticket.date}</td>
                          <td className="p-2 text-sm">{ticket.type}</td>
                          <td className="p-2 text-sm">{ticket.description}</td>
                          <td className="p-2 text-sm">
                            <Badge variant={ticket.status === "Resuelto" ? "default" : "outline"}>
                              {ticket.status}
                            </Badge>
                          </td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">
                              Ver Detalles
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Programar Visita Técnica</h3>
                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Fecha</label>
                          <input type="date" className="w-full rounded-md border p-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Hora</label>
                          <input type="time" className="w-full rounded-md border p-2 text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Motivo</label>
                        <select className="w-full rounded-md border p-2 text-sm">
                          <option>Instalación de equipo</option>
                          <option>Reparación</option>
                          <option>Mantenimiento</option>
                          <option>Cambio de plan</option>
                          <option>Otro</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notas</label>
                        <textarea className="w-full min-h-[100px] rounded-md border p-2 text-sm"></textarea>
                      </div>
                      <Button>Programar Visita</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Historial de Mensajes</h3>
                  <Button size="sm">Enviar Mensaje</Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left text-sm font-medium">Fecha</th>
                        <th className="p-2 text-left text-sm font-medium">Tipo</th>
                        <th className="p-2 text-left text-sm font-medium">Contenido</th>
                        <th className="p-2 text-left text-sm font-medium">Estado</th>
                        <th className="p-2 text-right text-sm font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messageHistory.map((message) => (
                        <tr key={message.id} className="border-b">
                          <td className="p-2 text-sm">{message.date}</td>
                          <td className="p-2 text-sm">{message.type}</td>
                          <td className="p-2 text-sm">{message.content}</td>
                          <td className="p-2 text-sm">
                            <Badge variant="outline">{message.status}</Badge>
                          </td>
                          <td className="p-2 text-right">
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Enviar Mensaje Personalizado</h3>
                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tipo de Mensaje</label>
                        <select className="w-full rounded-md border p-2 text-sm">
                          <option>Recordatorio de Pago</option>
                          <option>Información de Servicio</option>
                          <option>Promoción</option>
                          <option>Soporte</option>
                          <option>Personalizado</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Mensaje</label>
                        <textarea className="w-full min-h-[100px] rounded-md border p-2 text-sm"></textarea>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="use-ai" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="use-ai" className="text-sm font-medium">
                          Usar IA para mejorar el mensaje
                        </label>
                      </div>
                      <Button>Enviar Mensaje</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estado</span>
                  <Badge variant={client.status === "active" ? "default" : "destructive"}>
                    {client.status === "active" ? "Al día" : "Pendiente"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Próximo Pago</span>
                  <span className="text-sm">{client.nextPayment}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Monto</span>
                  <span className="text-sm font-bold">{client.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Método de Pago</span>
                  <span className="text-sm">{client.paymentMethod}</span>
                </div>
                <div className="pt-2">
                  <Button className="w-full">Registrar Pago</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <LucideMessageSquare className="mr-2 h-4 w-4" />
                  Enviar Recordatorio
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <LucideWifi className="mr-2 h-4 w-4" />
                  Cambiar Plan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <LucideAlertCircle className="mr-2 h-4 w-4" />
                  Reportar Incidencia
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <LucideCalendar className="mr-2 h-4 w-4" />
                  Programar Visita
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2025-03-15", action: "Pago registrado", amount: "$500.00" },
                  { date: "2025-03-10", action: "Mensaje enviado", type: "Recordatorio" },
                  { date: "2025-02-20", action: "Incidencia reportada", type: "Soporte" },
                  { date: "2025-02-15", action: "Pago registrado", amount: "$500.00" },
                  { date: "2025-01-20", action: "Visita técnica", type: "Mantenimiento" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-muted-foreground">{activity.date}</p>
                    </div>
                    <div>
                      {activity.amount && <span className="font-medium">{activity.amount}</span>}
                      {activity.type && <Badge variant="outline">{activity.type}</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

