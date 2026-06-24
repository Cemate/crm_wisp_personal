import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  LucideUsers,
  LucideWallet,
  LucideMessageSquare,
  LucideSearch,
  LucidePlus,
  LucideAlertCircle,
  LucideCheck,
  LucideX,
} from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ClientsTable } from "@/components/clients-table"
import { PaymentsTable } from "@/components/payments-table"
import { Overview } from "@/components/overview"
import { RecentPayments } from "@/components/recent-payments"

export default function DashboardPage() {
  return (
    <>
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Gestiona tus clientes ISP y sus pagos">
          <Button asChild>
            <Link href="/dashboard/clients/new">
              <LucidePlus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Link>
          </Button>
        </DashboardHeader>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <LucideUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+12 desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
              <LucideWallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">+2.5% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
              <LucideAlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-4 desde la semana pasada</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensajes Enviados</CardTitle>
              <LucideMessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">+573 desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="payments">Pagos</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Pagos Recientes</CardTitle>
                  <CardDescription>Has recibido 12 pagos este mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentPayments />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Clientes por Vencer</CardTitle>
                  <CardDescription>Clientes con pagos próximos a vencer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <LucideUsers className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Cliente {i}</p>
                            <p className="text-xs text-muted-foreground">Plan Fibra {20 * i}Mbps</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium">${300 + i * 50}</p>
                          <p className="text-xs text-yellow-500">Vence en {i} días</p>
                          <Button variant="outline" size="sm">
                            <LucideMessageSquare className="h-3 w-3 mr-1" />
                            Recordar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Estado de Clientes</CardTitle>
                  <CardDescription>Distribución de clientes por estado de pago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <p className="text-sm">Al día</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">187</p>
                        <p className="text-xs text-muted-foreground">76%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <p className="text-sm">Por vencer</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">35</p>
                        <p className="text-xs text-muted-foreground">14%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <p className="text-sm">Vencidos</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">23</p>
                        <p className="text-xs text-muted-foreground">10%</p>
                      </div>
                    </div>
                    <div className="mt-4 h-4 w-full rounded-full bg-gray-100">
                      <div className="flex h-full rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "76%" }}></div>
                        <div className="h-full bg-yellow-500" style={{ width: "14%" }}></div>
                        <div className="h-full bg-red-500" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="clients" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input placeholder="Buscar cliente..." />
                <Button type="submit" size="sm" className="shrink-0">
                  <LucideSearch className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Exportar
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard/clients/new">
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Nuevo Cliente
                  </Link>
                </Button>
              </div>
            </div>
            <ClientsTable />
          </TabsContent>
          <TabsContent value="payments" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input placeholder="Buscar pago..." />
                <Button type="submit" size="sm" className="shrink-0">
                  <LucideSearch className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Exportar
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard/payments/new">
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Registrar Pago
                  </Link>
                </Button>
              </div>
            </div>
            <PaymentsTable />
          </TabsContent>
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Asistente IA para WhatsApp</CardTitle>
                <CardDescription>
                  Configura y gestiona tu asistente de IA para comunicaciones automáticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="templates">
                  <TabsList className="mb-4">
                    <TabsTrigger value="templates">Plantillas</TabsTrigger>
                    <TabsTrigger value="automation">Automatización</TabsTrigger>
                    <TabsTrigger value="history">Historial</TabsTrigger>
                    <TabsTrigger value="settings">Configuración</TabsTrigger>
                  </TabsList>
                  <TabsContent value="templates">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Plantillas de Mensajes</h3>
                        <Button size="sm">
                          <LucidePlus className="mr-2 h-4 w-4" />
                          Nueva Plantilla
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {[
                          { name: "Recordatorio de Pago", status: "Activo" },
                          { name: "Confirmación de Pago", status: "Activo" },
                          { name: "Aviso de Corte", status: "Activo" },
                          { name: "Bienvenida", status: "Inactivo" },
                          { name: "Soporte Técnico", status: "Activo" },
                        ].map((template, i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {template.status === "Activo" ? (
                                  <span className="flex items-center text-green-500">
                                    <LucideCheck className="mr-1 h-3 w-3" />
                                    Activo
                                  </span>
                                ) : (
                                  <span className="flex items-center text-gray-500">
                                    <LucideX className="mr-1 h-3 w-3" />
                                    Inactivo
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="outline" size="sm">
                                Ver
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="automation">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Reglas de Automatización</h3>
                        <Button size="sm">
                          <LucidePlus className="mr-2 h-4 w-4" />
                          Nueva Regla
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Recordatorio 3 días antes",
                            trigger: "Fecha de vencimiento",
                            action: "Enviar mensaje",
                          },
                          {
                            name: "Recordatorio día de vencimiento",
                            trigger: "Fecha de vencimiento",
                            action: "Enviar mensaje",
                          },
                          { name: "Aviso de pago recibido", trigger: "Pago registrado", action: "Enviar confirmación" },
                          { name: "Aviso de corte inminente", trigger: "7 días de atraso", action: "Enviar mensaje" },
                        ].map((rule, i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                              <h4 className="font-medium">{rule.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Cuando: {rule.trigger} → {rule.action}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="outline" size="sm">
                                Desactivar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="history">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Historial de Mensajes</h3>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Exportar
                          </Button>
                          <Button variant="outline" size="sm">
                            Filtrar
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <LucideUsers className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <h4 className="font-medium">Cliente {i}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {i % 2 === 0 ? "Recordatorio de pago" : "Confirmación de pago"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="text-sm text-muted-foreground">
                                Hace {i} hora{i !== 1 ? "s" : ""}
                              </p>
                              <Button variant="outline" size="sm">
                                Ver
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Configuración del Asistente</h3>
                        <Button variant="outline" size="sm">
                          Guardar Cambios
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Nombre del Asistente</label>
                            <Input defaultValue="Asistente ISP" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Número de WhatsApp</label>
                            <Input defaultValue="+1234567890" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Mensaje de Bienvenida</label>
                          <textarea
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            defaultValue="¡Hola! Soy el asistente virtual de tu proveedor de internet. Estoy aquí para ayudarte con consultas, pagos y soporte técnico. ¿En qué puedo ayudarte hoy?"
                          ></textarea>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Horario de Funcionamiento</label>
                          <div className="grid gap-4 md:grid-cols-2">
                            <Input type="time" defaultValue="08:00" />
                            <Input type="time" defaultValue="20:00" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="active"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                          <label htmlFor="active" className="text-sm font-medium">
                            Asistente activo
                          </label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  )
}
